# Livestream Directors API

## Description

An API for logging directors and their favorite things! Directors must have a Livestream account to be registered on this API. Made as a coding challenge for Livestream.

## Table of Contents

- [Dependencies](#dependencies)
- [Running](#running)
- [Endpoints](#endpoints)
- [Usage](#usage)
- [Authorization](#authorization)
- [Testing](#testing)
- [Files](#files)


## Dependencies
```
## Production Dependencies
  stream-api-wrapper: wrapper for Livestream's API - audibleblink/stream-api-wrapper
  MD5: for hashing authorization headers
  body-parser: middleware for parsing incoming HTTP bodies
  express: routing/web framework
  nohm: a redis ORM
  redis: a redis database adapter

## Development Dependencies
  mocha: testing framework
  chai: assertion library
  supertest: http assertions

  ```

## Running

Clone this repository:
```sh
git clone https://github.com/audibleblink/ls-app.git
cd ls-app
```

Install the dependencies:
```sh
npm install
```

Start the redis and app servers

```sh
redis-server &
npm start

#> Listening on  5000
#> Nohm Connected to Redis Client
```


## Endpoints

| HTTP verb    | Route              | Description                                                                   |
| ------------ | -----------------  | ----------------------------------------------------------------------------- |
| GET          | /directors         | Gets a list of all directors                                              |
| GET          | /directors/:id   | Gets a single director object |
| POST         | /directors         | Creates a director based on the `livestream_id` passed in request body |
| PUT          | /directors/:id   | Updates `favorite_camera`/`favorites_movies` based on request body. This endpoint must be accessed with a token. `Authorization: Bearer $TOKEN`  |



## Usage

### Index
```
GET /directors
```
returns:
```json
[
  {
    "livestream_id": "6488818",
    "full_name": "Steven Spielberg",
    "dob": "2012‐06‐26T06:07:15.000Z",
    "favorite_camera": "...",
    "favorite_movies": ["...", ...]
  },
  ...
]
```
### Show
```
GET /directors/6488818
```
returns:
```json
{
  "livestream_id": "6488818",
  "full_name": "Steven Spielberg",
  "dob": "2012‐06‐26T06:07:15.000Z",
  "favorite_camera": "...",
  "favorite_movies": ["...", ...]
}
```
### Create
This route registers a user to our API. It fetches the details from the Livestream API using the `livestream_id` property. Directors can only be registered once. Subsequent attempts result in a 400 response.
```
POST /directors

{
  "livestream_id": "6488818"
}
```
If this user has not yet been registered, this returns:
```json
{
  "livestream_id": "6488818",
  "full_name": "Steven Spielberg",
  "dob": "2012‐06‐26T06:07:15.000Z",
  "favorite_camera": "...",
  "favorite_movies": ["...", ...]
}
```
### Update
Requires [authorization](#authorization) header. Only the `favorite_camera` and `favorite_movies` properties are mutable.
```
PUT /directors/6488818

{"favorite_camera": "Canon 5D MK III"}
```

returns
```json
{
  "livestream_id": "6488818",
  "full_name": "Steven Spielberg",
  "dob": "2012‐06‐26T06:07:15.000Z",
  "favorite_camera": "Canon 5D MK III",
  "favorite_movies": ["...", ...]
}
```

## Authorization

All endpoints are open except `PUT /directors/:id`. In order to update the mutable properties at this endpoint, one must send through an `Authorization` token. The token is generated by creating an md5 hash of the account holders `full_name` property.

```
PUT /directors/6488824

Authorization: Bearer md5('James Cameron')

{
  favorites_movies: ["ET"],
  favorite_camera: "Canon 5D MK3"
}
```

## Testing

Tests are written with `mocha`, `chai`, and `supertest`.  

To run the test suite once

```js
npm test
```

To run them continuously while watching for file changes while developing
```js
mocha -w
```

## Files
| File    | Description            |
| ------------ | ---------------- |
| `app.js`         | Configures the application, the database connection and its middleware       |
| `server.js`          | Configures the web server. Run `node server.js` or `npm start` to start it   |
| `routes/director-routes.js`         | Contains the endpoint defenition       |
| `controllers/director-controller.js`          | Contains the routing logic   |
| `lib/authorization.js`          | Used as middleware for handling requests to the PUT route  |
| `models/director.js`          | Define our `Director` resource   |
| `lib/error-handler.js`          | Contains error-handling logic used throughout the application   |
