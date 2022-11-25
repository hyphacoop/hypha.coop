RUN = bundle exec

start: ## Run jekyll server
	$(RUN) jekyll serve --watch

check: ## Check with htmlproofer
	$(RUN) htmlproofer ./_site \
	  --allow-hash-href \
	  --disable_external \

build: ## Build for web
	$(RUN) jekyll build

build-web: build

relativize: ## Relativize links in _site
	(cd _site && npx github:patcon/all-relative#also-root)

build-dweb: build relativize ## Build for dweb


%:
	@true

.PHONY: help

help:
	@echo 'Usage: make <command>'
	@echo
	@echo 'where <command> is one of the following:'
	@echo
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

.DEFAULT_GOAL := help
