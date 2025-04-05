# Example Service

Simple service that responds to various example end points

## Npm Scripts

```
"start": "ts-node-dev src/index.ts",
"docker:build": "docker build -t batessolutions/example .",
"docker:push": "docker push batessolutions/example",
"docker:pub": "npm run docker:build && npm run docker:push",
"test": "jest --watchAll --no-cache --verbose",
"upgrade:common": "npm i @bates-solutions/common@latest && npm i @bates-solutions/common-example@latest"
```

## End points

### Example

**Url**

`https://example.local/api/example`

**Payload**

N/A

**Response**

```
200 OK

{}
```

### Example Protected

**Url**

`https://example.local/api/example/protected`

**Payload**

N/A

**Response when authenticated**

```
200 OK

{}
```

You should also see these messages logged in the `skaffold` terminal

```
[sample-service] MessageReceived example example-service
[sample-service] I should do some stuff with Status.Active and Status.Deleted active deleted
[sample-service] EventPublished example
```

**Response when not authenticated**

```
401 Unauthorized

{
    "errors": [
        {
            "message": "Not authorized"
        }
    ]
}
```
