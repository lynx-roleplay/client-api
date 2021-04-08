.PHONY: default
default: start

.PHONY: install
install:
	npm i

.PHONY: start
start: install
	npm start

.PHONY: dockerinstall
dockerinstall:
	docker build -t lynx-roleplay/client-api .

.PHONY: dockerstart
dockerstart: dockerinstall
	docker run -d lynx-roleplay/client-api

.PHONY: dockerstop
dockerstop:
	docker rm $(docker stop $(docker ps -a -q --filter ancestor=lynx-roleplay/client-api --format="{{.ID}}"))

.PHONY: dockerrestart
dockerrestart:
	docker restart $(docker ps -a -q --filter ancestor=lynx-roleplay/client-api --format="{{.ID}}")