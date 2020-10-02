# My Assets App Server

My Assets App is an application to manage your assets. This app has :

- RESTful endpoint for asset's CRUD operation
- JSON formatted response

&nbsp;

## RESTful endpoints

### GET /calender

> Get all holiday list

_Request Header_

```
{
  "token": "<your access token>"
}
```

_Request Body_

```
not needed
```

_Response (200)_

```
{
    "meta": {
        "code": 200
    },
    "response": {
        "holidays": [
            {
                "name": "Name of holiday goes here",
                "description": "Description of holiday goes here",
                "date": {
                    "iso": "2018-12-31",
                    "datetime": {
                        "year": 2018,
                        "month": 12,
                        "day": 31
                    }
                },
                "type": [
                    "Type of Observance goes here"
                ]
            }
        ]
    }
}
```

_Response (401 - Unauthorized)_

```
{
    "errors": [
        "failed to authenticate"
    ]
}
```
_Response (500 - Internal Server Error)_
```
{
    "errors": [
        "internal server error"
    ]
}
```