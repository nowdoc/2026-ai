# Include variables
include .env.dist
-include .env
export

# Variables
DOCKER_DEFAULT_PLATFORM = ${DOCKER_PLATFORM}

############################################################
# HELP #####################################################
############################################################
all:
	@awk 'BEGIN {FS = ":.*##"; printf "Usage:\n  make \033[36m<target>\033[0m\n\nTargets:\n"}'
	@grep -h -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'

############################################################
# DEVELOPMENT ##############################################
############################################################
.PHONY: install
install:
	npm install
	npx playwright install

.PHONY: test-playwright
test-playwright:
	npx playwright test

.PHONY: test-stagehand
test-stagehand:
	node stagehand/index.ts

.PHONY: docker-up
docker-up:
	docker compose up
