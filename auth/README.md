# Example Auth Service

Simple authentication service that saves an email and password to a mongo database.

## End points

### Signup

**Url**

`https://example.local/api/users/signup`

**Payload**

```
{
    "email": "mike@email.com",
    "password": "password"
}
```

**Response**

```
201 Created

{
    "email": "mike@email.com",
    "id": "67f061d96c7841d0da05adec"
}
```

### Signin

**Url**

`https://example.local/api/users/signin`

**Payload**

```
{
    "email": "mike@email.com",
    "password": "password"
}
```

**Response**

```
200 OK

{
    "email": "mike@email.com",
    "id": "67f061d96c7841d0da05adec"
}
```

### Signout

**Url**

`https://example.local/api/users/signout`

**Payload**

N/A

**Response**

```
200 OK

{}
```

### Current User

**Url**

`https://example.local/api/users/currentuser`

**Payload**

N/A

**Response**

```
200 OK

{
    "currentUser": {
        "id": "67f061d96c7841d0da05adec",
        "email": "mike@email.com",
        "iat": 1743806942
    }
}
```
