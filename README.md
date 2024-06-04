## Note Application

Your assistant for every day

## Description


[Swagger API](http://localhost:3000/api#/)

localhost:3000/api#/

## Installation

```bash
$ npm install
```

## Prepare app

```bash
# start container
$ docker compose up -d

# if docker compose v.1
$ docker-compose up -d

# run migrations
$ npm run migration:run

```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# start test database container
$ docker compose -f docker-compose.test.yml up -d

# if docker compose v.1
$ docker-compose -f docker-compose.test.yml up -d

# run migrations on test database

$ npm run migration:run

# e2e tests
$ npm run test:e2e
```

## Contacts

- Author: [Roman Akera](mailto:roman.akera@gmail.com)
- LinkedIn: [rakera](https://www.linkedin.com/in/rakera/)
- Telegram: @VikingUlf 
- Email: roman.akera@gmail.com
