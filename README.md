# Bates Solutions : Microservices Example

Microservices Application built with TypeScript, Express, Nats and Mongo

Should be used in conjuction with https://github.com/mbates/bates-solutions-example-common which publishes an npm library `@bates-solutions/common-example`

If you want to use this project yourself, fork both repositories and replace:

`@bates-solutions` with your own npm account. Replace in all package.json files and all `import`s in typescript files.

`batessolutions` with your own docker hub account.Replease in `package.json` scripts, `infrastructure/k8s/*.depl` files and main `skaffold.yam`l file

## Monorepo

This monorepo contains 2 projects `auth` & `sample-service`.

Before you can skaffold the cluster, these projects need to be built and published.

If you fork and use this on your own project, you will be publishing to you own docker hub. Make sure you are not using `batessolutions/example-xxxx` for you container names

```
npm i
npm run publish
```

## Hosts files

For local development add a local loopback to your computers hosts file

    127.0.0.1 example.local

## Skaffold

This project uses skaffold to manage the kubernetes cluster locally.

See https://skaffold.dev for installation instructions.

`skaffold dev` from project root to bring up the project, this assumes npm packages (common-example) and docker hub images have been published `npm run publish`

## Docker authentication

You will need an account on https://hub.docker.com/

Once your account is setup run `docker login` at the terminal to allow `docker push`

### Github / Docker authentication

Add authentication to https://github.com/[ACCOUNT]/[REPO]/settings/secrets/actions

- Add `DOCKER_USERNAME` as a repository action variable
- Add `DOCKER_PASSWORD` as a repository action secret

## Kubernetes

This project is setup to run inside a Kubernetes Cluster.

https://kubernetes.io/docs/home/

If you have Docker Desktop installed you can use that to run a local cluster.

https://www.docker.com/get-started/

Once setup the cluster can be stared with `skaffold dev` (see above)

### Pods

`kubectl get pods`

```
NAME                               READY   STATUS    RESTARTS   AGE
auth-depl-65bb4949bd-lgcrk         1/1     Running   0          6m48s
auth-mongo-depl-5b8857b4fc-j7kc5   1/1     Running   0          6m48s
client-depl-5485c68cfd-8wzrg       1/1     Running   0          3s
nats-depl-6754898fbd-sgr4j         1/1     Running   0          2m3s
```

**Debug pods**

`kubectl describe pod auth-depl-65bb4949bd-lgcrk`

**Get logs for a pod**

`kubectl logs auth-depl-65bb4949bd-lgcrk`

**Reset a pod**

`kubectl delete pod client-depl-5485c68cfd-8wzrg`

**Shell access to a pod**

`kubectl exec -it auth-depl-65bb4949bd-lgcrk -- sh`

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

## Ingress-Nginx

Kubernets uses the Ingress-Nginx controller to provide external access to the clusters services.

This needs to be deployed into your local Docker Desktop https://kubernetes.github.io/ingress-nginx/deploy/

To get info on the ingress service, use `kubectl`

`kubectl get services -n ingress-nginx`

```
NAME                                 TYPE           CLUSTER-IP       EXTERNAL-IP   PORT(S)                      AGE
ingress-nginx-controller             LoadBalancer   10.101.175.179   localhost     80:31240/TCP,443:32562/TCP   46h
ingress-nginx-controller-admission   ClusterIP      10.105.35.60     <none>        443/TCP                      46h
```

The url to get to ingress-nginx from another pod is built like this

http://[SERVICE].[NAMESPACE].svc.cluster.local

For example:

http://ingress-nginx.ingress.nginx.svc.cluster.local
