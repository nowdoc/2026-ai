# Include variables
include .env.dist
-include .env
export

# Variables
DOCKER_DEFAULT_PLATFORM = ${DOCKER_PLATFORM}
DATE_VERSION = $(shell date -u +"%Y%m%d%H%M%S")

############################################################
# HELP #####################################################
############################################################
all:
	@awk 'BEGIN {FS = ":.*##"; printf "Usage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"}'
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

# ################################################
# Development ####################################
# ################################################
.PHONY: init
init: ## Initialize project
	cp -n .env.example .env

.PHONY: install
install: ## Install all dependencies
	npm ci

.PHONY: dev
dev: ## Start Nuxt for local development
	HOST=0 PORT=3000 npm run dev

.PHONY: generate
generate: ## Build static site
	npm run generate

.PHONY: start
start: ## Serve static files
	HOST=0 PORT=3030 npm run start

.PHONY: lint
lint: ## Lint files
	npm run lint

.PHONY: tsc
tsc: ### Typescript compiler
	npx tsc
