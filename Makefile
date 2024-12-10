PROJECT_NAME := client-frontend

up:
	docker compose up -d

rebuild:
	docker compose -p $(PROJECT_NAME) up --build --force-recreate -d

stop: ## stop container
	docker stop $(PROJECT_NAME)

exec-cli: ## allocate a pseudo TTY
	docker exec -it $(PROJECT_NAME) /bin/bash

build-staging:
	docker exec -it $(PROJECT_NAME) npm run build-staging

build-production:
	docker exec -it $(PROJECT_NAME) npm run build-production

