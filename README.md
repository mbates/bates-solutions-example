# Bates Solutions Portfolio

## Hosts files

For local development add a local loopback to your computers hosts file

    127.0.0.1 example.local

## Skaffold

When disabling push (see below), remeber to build the docker image `docker build -t mikebates/[see Dockerfile] .`

```yaml
build:
  local:
    push: false
```

## Docker authentication

`docker login` needs to be run in the WSL2 terminal

### Github / Docker authentication

Add authentication to https://github.com/[ACCOUNT]/[REPO]/settings/secrets/actions

- Add `DOCKER_USERNAME` as a repository action variable
- Add `DOCKER_PASSWORD` as a repository action secret

## Kubernetes

### Pods

`kubectl get pods`

```
NAME                               READY   STATUS    RESTARTS   AGE
auth-depl-65bb4949bd-lgcrk         1/1     Running   0          6m48s
auth-mongo-depl-5b8857b4fc-j7kc5   1/1     Running   0          6m48s
client-depl-5485c68cfd-8wzrg       1/1     Running   0          3s
nats-depl-6754898fbd-sgr4j         1/1     Running   0          2m3s
```

**Debug XxxXxxxError pods**

`kubectl describe pod auth-depl-65bb4949bd-lgcrk`

**Get logs for a pod**

`kubectl logs auth-depl-65bb4949bd-lgcrk`

**Reset a pod**

`kubectl delete pod client-depl-5485c68cfd-8wzrg`

**Shell access to a pod**

`kubectl exec -it auth-depl-65bb4949bd-lgcrk -- sh`

**Forward port to a pod**

_---only do this for local development---_

`kubectl port-forward nats-depl-7449bd8fc4-wtvct 4222:4222`

## Namespaces

`kubectl get namespace`

```
NAME              STATUS   AGE
default           Active   2d
ingress-nginx     Active   46h
kube-node-lease   Active   2d
kube-public       Active   2d
kube-system       Active   2d
```

`kubectl get services -n ingress-nginx`

```
NAME                                 TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
ingress-nginx-controller             LoadBalancer   10.101.175.179   localhost     80:31240/TCP,443:32562/TCP   46h
ingress-nginx-controller-admission   ClusterIP      10.105.35.60     <none>        443/TCP                      46h
```

url to get to ingress-nginx from another pod

http://SERVICE.NAMESPACE.svc.cluster.local

http://ingress-nginx.ingress.nginx.svc.cluster.local

ingress-nginx-controller

## NATS

to get more info on a channel:

- open `https://localhost:8222/streaming`
- click on channels
- add `?subs=1` to the end of the url
