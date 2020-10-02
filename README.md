# Fancy Movie App

Show movie recommendation, sountrack, and recommendation date to watch.

- Fitur disini

&nbsp;

## RESTful endpoints

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

### GET /movies

> Get all movies sorting by popularity

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

_Response (200_Succses)_

```
[
  {
        "popularity": 2015.892,
        "vote_count": 53,
        "video": false,
        "poster_path": "/6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg",
        "id": 694919,
        "adult": false,
        "backdrop_path": "/pq0JSpwyT2URytdFG0euztQPAyR.jpg",
        "original_language": "en",
        "original_title": "Money Plane",
        "genre_ids": [
            28
        ],
        "title": "Money Plane",
        "vote_average": 5.8,
        "overview": "A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.",
        "release_date": "2020-09-29"
    },
    .....another response
]
```

_Response (401 - Authentication)_

```
{
  "status_message": "Invalid API key: You must be granted a valid key.",
  "success": false,
  "status_code": 7
}
```

_Response (404 - Not Found)_

```
{
  "status_message": "The resource you requested could not be found.",
  "status_code": 34
}
```

### GET /musics/chart

> Get all mucics sorting by popularity

_Request Header_

```
{
  "token": "<your token>"
}
```

_Request Body_

```
not needed
```

_Response (200_Succses)_

```
[
  {
        "id": 928948352,
        "title": "Bersyukur (Alhamdulillah)",
        "title_short": "Bersyukur (Alhamdulillah)",
        "title_version": "",
        "link": "https://www.deezer.com/track/928948352",
        "duration": 261,
        "rank": 10162,
        "explicit_lyrics": false,
        "explicit_content_lyrics": 0,
        "explicit_content_cover": 0,
        "preview": "https://cdns-preview-1.dzcdn.net/stream/c-124d805df3354d1782dfd002a670863c-3.mp3",
        "md5_image": "3fba31ff76b8b4775fbbf007befeacfe",
        "position": 1,
        "artist": {
          "id": 91145332,
          "name": "Eka Maya Sari",
          "link": "https://www.deezer.com/artist/91145332",
          "picture": "https://api.deezer.com/artist/91145332/image",
          "picture_small": "https://e-cdns-images.dzcdn.net/images/artist/3fba31ff76b8b4775fbbf007befeacfe/56x56-000000-80-0-0.jpg",
          "picture_medium": "https://e-cdns-images.dzcdn.net/images/artist/3fba31ff76b8b4775fbbf007befeacfe/250x250-000000-80-0-0.jpg",
          "picture_big": "https://e-cdns-images.dzcdn.net/images/artist/3fba31ff76b8b4775fbbf007befeacfe/500x500-000000-80-0-0.jpg",
          "picture_xl": "https://e-cdns-images.dzcdn.net/images/artist/3fba31ff76b8b4775fbbf007befeacfe/1000x1000-000000-80-0-0.jpg",
          "radio": false,
          "tracklist": "https://api.deezer.com/artist/91145332/top?limit=50",
          "type": "artist"
        },
        "album": {
          "id": 141577772,
          "title": "Bersyukur (Alhamdulillah)",
          "cover": "https://api.deezer.com/album/141577772/image",
          "cover_small": "https://e-cdns-images.dzcdn.net/images/cover/3fba31ff76b8b4775fbbf007befeacfe/56x56-000000-80-0-0.jpg",
          "cover_medium": "https://e-cdns-images.dzcdn.net/images/cover/3fba31ff76b8b4775fbbf007befeacfe/250x250-000000-80-0-0.jpg",
          "cover_big": "https://e-cdns-images.dzcdn.net/images/cover/3fba31ff76b8b4775fbbf007befeacfe/500x500-000000-80-0-0.jpg",
          "cover_xl": "https://e-cdns-images.dzcdn.net/images/cover/3fba31ff76b8b4775fbbf007befeacfe/1000x1000-000000-80-0-0.jpg",
          "md5_image": "3fba31ff76b8b4775fbbf007befeacfe",
          "tracklist": "https://api.deezer.com/album/141577772/tracks",
          "type": "album"
        },
        "type": "track"
      },
    .....another response
]
```

---

### GET /calender

> Get all holiday list
> _Request Header_

```
{
  "token": "<your token>"
}
```

_Request Body_

```
not needed
```

_Response (200_Succses)_

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
