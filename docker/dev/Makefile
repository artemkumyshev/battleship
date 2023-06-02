#!/usr/bin/make
# Makefile readme (ru): <http://linux.yaroslavl.ru/docs/prog/gnu_make_3-79_russian_manual.html>
# Makefile readme (en): <https://www.gnu.org/software/make/manual/html_node/index.html#SEC_Contents>

SHELL = /bin/sh

IMAGES_PREFIX := $(shell basename $(shell dirname $(realpath $(lastword $(MAKEFILE_LIST)))))

# Important: Local images naming should be in docker-compose naming style
CONTAINER_NAME_FRONTEND := frontend
CONTAINER_NAME_BACKEND := backend

docker_bin := $(shell command -v docker 2> /dev/null)
docker_compose_bin := $(shell command -v docker-compose 2> /dev/null)

.PHONY : help up down \
		shell install build \
		start dev inspect
.DEFAULT_GOAL := help

# This will output the help for each task. thanks to https://marmelab.com/blog/2016/02/29/auto-documented-makefile.html
help: ## Show this help
	@awk 'BEGIN {FS = ":.*?## "} /^[a-zA-Z_-]+:.*?## / {printf "  \033[36m%-15s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

# --- [ Development tasks ] -------------------------------------------------------------------------------------------

up:
	$(docker_compose_bin) up -d

down: ## Stop all started for development containers
	$(docker_compose_bin) down

shell-frontend: ## Start shell into application container
	$(docker_compose_bin) exec "$(CONTAINER_NAME_FRONTEND)" /bin/sh

shell-backend: ## Start shell into application container
	$(docker_compose_bin) exec "$(CONTAINER_NAME_BACKEND)" /bin/sh

install: up ## Install dependency
	$(docker_compose_bin) exec "$(CONTAINER_NAME_FRONTEND)" yarn install --global-folder /tmp/ --cache-folder /tmp/ --non-interactive --ignore-optional --frozen-lockfile
	$(docker_compose_bin) exec "$(CONTAINER_NAME_BACKEND)" yarn install --global-folder /tmp/ --cache-folder /tmp/ --non-interactive --ignore-optional --frozen-lockfile

build-frontend: install ## Build
	$(docker_compose_bin) exec "$(CONTAINER_NAME_FRONTEND)" yarn build

build-backend: install ## Build
	$(docker_compose_bin) exec "$(CONTAINER_NAME_BACKEND)" yarn build

prod-frontend: ## Start production server
	$(docker_compose_bin) exec "$(CONTAINER_NAME_FRONTEND)" yarn start

prod-backend: ## Start production server
	$(docker_compose_bin) exec "$(CONTAINER_NAME_BACKEND)" yarn start

dev-frontend: up ## Node dev frontend
	$(docker_compose_bin) exec "$(CONTAINER_NAME_FRONTEND)" yarn run dev --host --port 5173

dev-backend: up ## Node dev frontend
	$(docker_compose_bin) exec "$(CONTAINER_NAME_BACKEND)" yarn start:dev

# inspect: up ## Starting application with flag --inspect for debugging SSR
# 	$(docker_compose_bin) exec "$(CONTAINER_NAME_APP)" yarn inspect

# test: up ## Starting all tests
# 	$(docker_compose_bin) exec "$(CONTAINER_NAME_APP)" yarn test