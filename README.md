# Microservices : Example Monorepo

Microservices Application built with TypeScript, Express, Nats and Mongo

This monorepo contains 2 projects, [auth](./auth/README.md) & [sample-service](./sample-service/README.md).

Before you can skaffold the cluster, these projects need to be setup with `npm i`.

## Related Repositories

 * [Microservices : Example Monorepo](https://github.com/mbates/bates-solutions-example)
 * [Microservices : Example Common Components](https://github.com/mbates/bates-solutions-example-common)
 * [Microservices : Global Common Components](https://github.com/mbates/bates-solutions-common)

## Hosts File

For local development add a local loopback to your computers hosts file

    127.0.0.1 example.local

If you want to use an alternative domain, also update the `host` in `infrastructure/k8s-local/ingress-srv.yaml`

## Skaffold

This project uses skaffold to manage the kubernetes cluster locally.

See https://skaffold.dev for installation instructions.

`skaffold dev` from project root to bring up the project.

## Kubernetes

This project is setup to run inside a Kubernetes Cluster.

https://kubernetes.io/docs/home/

If you have Docker Desktop installed you can use that to run a local cluster. All you need to do is enable it in Settings.

https://www.docker.com/get-started/

https://docs.docker.com/desktop/features/kubernetes/

Once Docker Desktop is setup, the cluster can be stared with `skaffold dev` (see above)

### Terminal Setup

Install `kubectl` to manage things from your terminal

https://kubernetes.io/docs/tasks/tools/

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

### Namespaces

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

## Nats Error

If you get a Nats error like this when you run `skaffold dev`

```
[sample-service] NatsError: Could not connect to server: Error: getaddrinfo EAI_AGAIN nats-srv
[sample-service]     at Socket.<anonymous> (/app/node_modules/nats/lib/nats.js:833:26)
[sample-service]     at Socket.emit (node:events:507:28)
[sample-service]     at emitErrorNT (node:internal/streams/destroy:170:8)
[sample-service]     at emitErrorCloseNT (node:internal/streams/destroy:129:3)
[sample-service]     at processTicksAndRejections (node:internal/process/task_queues:90:21) {
[sample-service]   code: 'CONN_ERR',
[sample-service]   chainedError: Error: getaddrinfo EAI_AGAIN nats-srv
[sample-service]       at GetAddrInfoReqWrap.onlookupall [as oncomplete] (node:dns:122:26) {
[sample-service]     errno: -3001,
[sample-service]     code: 'EAI_AGAIN',
[sample-service]     syscall: 'getaddrinfo',
[sample-service]     hostname: 'nats-srv'
[sample-service]   }
[sample-service] }
```

It is caused by sample service starting before Nats. Use docker desktop to delete the `k8s_sample-service_sample-service-depl-xxxx` container. It will restart and should connect to Nats successfully.

## Forking

If you want to use this to start your own project, you'll also need to fork the accompanying repos https://github.com/mbates/bates-solutions-common & https://github.com/mbates/bates-solutions-example-common

Once forked, update the npm and docker hub account names throughout the codebases, replacing:

- `@bates-solutions` with your own npm account. Replace in all `package.json` dependencies and all `import` lines in typescript files.
- `batessolutions` with your own docker hub account. Replace in `package.json` scripts, `infrastructure/k8s/*.depl` files and main `skaffold.yaml` file

### Docker authentication

You will need an account on https://hub.docker.com/

Once your account is setup run `docker login` at the terminal to allow `docker push`

### Github Actions

These are needed for your repo's Actions https://github.com/[ACCOUNT]/[REPO]/settings/secrets/actions

- Add `DOCKER_USERNAME` as a repository action variable
- Add `DOCKER_PASSWORD` as a repository action secret

## Acknowledgement

The patterns I used here, and a lot of my understanding of these topics were learned in this excellent course https://www.udemy.com/course/microservices-with-node-js-and-react

