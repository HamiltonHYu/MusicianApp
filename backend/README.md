# backend-music-app

## Overview

This is the backend for the music app prototype. The local server runs on port `3000`.

## Sample API requests and responses

```
GET http://localhost:3000/api/v1/users/?${query}

query string: http://localhost:3000/api/v1/users/?genres=rock,jazz&skillLevel=professional

returns array of users
```

```json
// POST http://localhost:3000/api/v1/users

// JSON body:
{
    "description": "Sample description.",
    "influences": "The Beatles, De La Soul, Buddy Holly.",
    "location": "New York, NY",
    "name": "Eric Swaney",
    "password": "testPassword123",
    "email": "testEmail@gmail.com",
    "skillLevel": "professional",
    "genres": "rock,jazz,pop,hip-hop,rnb,electronic,metal,country,blues,classical,folk,reggae,other",
    "instruments": "guitar,bass,drums,singing,rapping,other,piano,banjo,violin,viola,cello,mandolin,dj,producer,saxophone,oboe,trumpet,trombone,tuba,percussian",
    "seeking": "jam,teach,learn,local,paying,professional"
}

// response:
{
    "id": "4654c48c-45f2-477a-9321-ea60ad03ac7b",
    "name": "Eric Swaney",
    "location": "New York, NY",
    "description": "Sample description.",
    "genres": [
        "rock",
        "jazz",
        "pop",
        "hip-hop",
        "rnb",
        "electronic",
        "metal",
        "country",
        "blues",
        "classical",
        "folk",
        "reggae",
        "other"
    ],
    "instruments": [
        "guitar",
        "bass",
        "drums",
        "singing",
        "rapping",
        "other",
        "piano",
        "banjo",
        "violin",
        "viola",
        "cello",
        "mandolin",
        "dj",
        "producer",
        "saxophone",
        "oboe",
        "trumpet",
        "trombone",
        "tuba",
        "percussian"
    ],
    "seeking": [
        "jam",
        "teach",
        "learn",
        "local",
        "paying",
        "professional"
    ],
    "imageSrcs": [],
    "skillLevel": "professional",
    "influences": "The Beatles, De La Soul, Buddy Holly."
}
```

```json
// GET http://localhost:3000/api/v1/users/:id
// use UUID id for wildcard

// sample response
{
  "description": "Sample description.",
  "influences": "The Beatles, De La Soul, Buddy Holly.",
  "location": "New York, NY",
  "name": "Eric Swaney",
  "id": "768f3adf-62ec-47a9-bdd2-06312521f010",
  "imageSrcs": [],
  "skillLevel": "professional",
  "genres": [
    "rock",
    "jazz",
    "pop",
    "hip-hop",
    "rnb",
    "electronic",
    "metal",
    "country",
    "blues",
    "classical",
    "folk",
    "reggae",
    "other"
  ],
  "instruments": [
    "guitar",
    "bass",
    "drums",
    "singing",
    "rapping",
    "other",
    "piano",
    "banjo",
    "violin",
    "viola",
    "cello",
    "mandolin",
    "dj",
    "producer",
    "saxophone",
    "oboe",
    "trumpet",
    "trombone",
    "tuba",
    "percussian"
  ],
  "seeking": ["jam", "teach", "learn", "local", "paying", "professional"]
}
```

```json
// PATCH http://localhost:3000/api/v1/users/:id

// JSON body
{
    "description": "Sample description 2.",
    "influences": "Cymbals Eat Guitars.",
    "skillLevel": "beginner",
    "genres": "rock,jazz,country,other",
    "instruments": "guitar,bass,tuba,percussian",
    "seeking": "paying"
}

// sample response
{
    "description": "Sample description 2.",
    "influences": "Cymbals Eat Guitars.",
    "location": "New York, NY",
    "name": "Eric Swaney",
    "id": "09dcc6b7-2363-468f-9dd2-6e88c68c9a07",
    "imageSrcs": [],
    "skillLevel": "beginner",
    "genres": [
        "rock",
        "jazz",
        "country",
        "other"
    ],
    "instruments": [
        "guitar",
        "bass",
        "tuba",
        "percussian"
    ],
    "seeking": [
        "paying"
    ]
}
```

```
// DELETE http://localhost:3000/api/v1/users/:id

// no response
```

## Backend TODOs

TK

TEST
