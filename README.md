# Postquake

A new awesome dev game

## Run Locally

In order to speed up the development we have choosen to run the development environment into a docker container.

### Requirements

* Docker
* Docker Compose >= 3.5

### Steps

Clone the project

```bash
git@github.com:capitanfuturo/postquake.git
```

Go to the project directory

```bash
cd postquake
make dev
```

### Makefile

We offer a Makefile with some help commands.

```bash
build-docker                   build local docker image
code                           Open VSCode
help                           Show all commands
logs                           logs docker-compose for local development
sh                             Open a shell into the dev docker
start                          start docker-compose for local development
stop                           stop docker-compose for local development
```
