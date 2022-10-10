.DEFAULT_GOAL := help

##help: @ Show all commands
help:
	@fgrep -h "##" $(MAKEFILE_LIST)| sort | fgrep -v fgrep | tr -d '##'  | awk 'BEGIN {FS = ":.*?@ "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

##build-docker: @ build local docker image
build-docker: 
	docker-compose build

##code: @ Open VSCode
code: 
	code .

##sh: @ Open a shell into the dev docker
sh: 
	docker exec -it postquake sh

##start: @ start docker-compose for local development
start:
	docker-compose up -d

##stop: @ stop docker-compose for local development
stop:
	docker-compose down

##logs: @ logs docker-compose for local development
logs:
	docker-compose logs --follow postquake
