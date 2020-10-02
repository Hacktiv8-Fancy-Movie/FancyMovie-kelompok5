### POST /users/register

> Create new users

_Request Body_

```
{
  "email": "<email to register>",
  "password": "<password to register will be hashed by bcrypt>"
}
```

_Response (201 - Created)_

```
{
    "msg": "sign up success",
    "user": {
        "id": <given id by system>,,
        "email": "<registered email>"
    }
}
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "email is required",
        "password is required",
        "email must be unique",
        "input is not valid email"
    ]
}
```

### POST /users/login

> Login user to the system

_Request Body_

```
{
  "email": "<email that has been registered>",
  "password": "<password that has been registered>"
}
```

_Response (201 - Created)_

```
{
    "msg": "sign in success",
    "token": "<token auth that given by the system>"
}
```

_Response (400 - Bad Request)_

```
{
    "errors": [
        "invalid email or password"
    ]
}
```
