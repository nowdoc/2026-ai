# Nette App

Modern PHP backend API using Nette framework with Doctrine ORM and SQLite database.

## Prerequisites

- PHP 8.4 or higher
- Composer
- SQLite (included with PHP)

## Installation

```bash
# Copy configuration template
make init

# Install dependencies and setup directories
make project

# Start development server
make dev
```

The API will be available at http://localhost:8080

## Project Structure

```
nette-app/
├── app/
│   ├── Bootstrap.php          # Application bootstrap
│   ├── Domain/                # Domain entities
│   ├── Model/                 # Business logic
│   └── UI/                    # Presenters and templates
├── config/
│   ├── config.neon            # Main configuration
│   ├── doctrine.neon          # Database configuration
│   └── local.neon.example     # Local config template
├── db/                        # Database migrations
├── tests/                     # Test suite
├── var/                       # Cache and logs
└── www/                       # Web root
```

## Configuration

Nette application is configured in `config/config.neon`.

You can override parameters in `config/local.neon`:

```neon
parameters:
    # Add your parameters here

services:
    # Add your services here
```

## Development

### DevServer

The easiest way is to use php built-in web server:

```bash
# Docker development
make docker-up

# Local development
make dev
```

Then visit http://localhost:8080 in your browser.

### Common Tasks

```bash
# Quality assurance (coding standards + static analysis)
make qa

# Run coding standards check
make cs

# Fix coding standards automatically
make csf

# Run static analysis with PHPStan
make phpstan

# Run test suite
make tests

# Run with coverage report
make coverage

# Start Docker environment
make docker-up

# Access Docker container
make docker-in

# Clean cache and logs
make clean
```

### Database Migrations

```bash
# Create new migration
vendor/bin/doctrine-migrations migrations:generate

# Run pending migrations
vendor/bin/doctrine-migrations migrations:migrate

# Check migration status
vendor/bin/doctrine-migrations migrations:status
```

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| PHP | 8.4+ | Runtime |
| Nette | contributte/nella ^0.3.0 | Framework |
| Doctrine ORM | Nettrine packages | Database ORM |
| SQLite | - | Database |
| PHPStan | - | Static analysis |
| Tester | - | Unit testing |

## Troubleshooting

**Permission errors on var/ directories:**
```bash
make setup
```

**Database not initialized:**
```bash
vendor/bin/doctrine-migrations migrations:migrate
```

**Port 8080 already in use:**
```bash
php -S 0.0.0.0:8090 -t www
```

**Class not found errors:**
```bash
composer dump-autoload
make clean
```

## Resources

- [Nette Framework](https://nette.org)
- [Doctrine ORM](https://www.doctrine-project.org)
- [Nette Documentation](https://doc.nette.org)
