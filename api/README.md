# AI sandbox

## Introduction

This is a simple application with basic setup of [Doctrine](https://www.doctrine-project.org/) and [Nette](https://nette.org/).

## Installation

You will need `PHP 8.4+` and [Composer](https://getcomposer.org/) and [Git](https://git-scm.com/) installed.

```bash
git clone git@github.com:nowdoc/2025-ai-sandbox.git
```

Now you have application clonned. It's time to install dependencies.

```bash
composer install
```

## Configuration

Nette application is configured in [`config/config.neon`](config/config.neon).

You can override parameters in [`config/local.neon`](config/local.neon).

## Development

### DevServer

The easiest way is to use php built-in web server.

```bash
## Docker development
make docker-up
# docker compose up

## Local development
# make dev
# php -S 0.0.0.0:8080 -t www
```

Then visit [http://0.0.0.0:8080](http://localhost:8080) in your browser.

### Quality Assurance

- `make phpstan` - static analysis
- `make cs` - code style check
- `make tests` - run tests
