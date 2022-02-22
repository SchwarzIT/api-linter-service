# API Linting Service

[![SIT](https://img.shields.io/badge/SIT-awesome-blueviolet.svg)](https://jobs.schwarz)

## Prerequisites / general idea

General idea behind this API implementation is to provide an API as a service based on the awesome [spectral schema linter](https://github.com/stoplightio/spectral) and it´s nodeJS based SDK.

## Main Technologies

* [Docker](https://www.docker.com/)
* [nodeJS](https://nodejs.dev/)
* [nestJS](https://nestjs.com/)
* [Spectral schema linter](https://github.com/stoplightio/spectral)

## Spectral API Validation

The API is build on top of the [@stoplight/spectral-core](https://www.npmjs.com/package/@stoplight/spectral-core) SDK for nodeJS to execute API validations that follow the "Open API Specification" pattern. Spectral itself is Open Source and able to validate any json or yaml defined schemas with dedicated rulesets, while playing it´s strengths definitely in validation of OpenAPI Specs.

## Build / Setup the local dev env

First make sure to have installed the following OS dependencies for development:
* [Docker Desktop](https://www.docker.com/products/docker-desktop)
* [node LTS](https://nodejs.org/en/)
* IDE of your choice like [Visual Studio Code](https://code.visualstudio.com/)

Download all local development dependencies via (just for code completion, code will be executed in docker):

```bash
$ npm install
```

Build the Docker-Compose based local dev environment

```bash
$ docker-compose build --no-cache
```

## Running the API in "debug" mode

Per default the API runs in "debug" mode during local development.

You should always start the API using Docker-Compose.

```bash
$ docker-compose build
$ docker-compose up (-d)
```

## Running the API in "prod" mode

```bash
$ docker-compose -f docker-compose-prod-sim.yml build
$ docker-compose -f docker-compose-prod-sim.yml up (-d)
```

### JS rules migration at application start up

The API downloads a dedicated spectral ruleset behind a configurable url as a base for further migration of this files into JavaScript. No need to redeploy the application after changing your spectral ruleset, restart is enough and you get served with your recently updated and published ruleset.

Without changing the download url the API uses [SchwarzIT API Rules](https://github.com/SchwarzIT/api-linter-rules) as default for API linting.

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
