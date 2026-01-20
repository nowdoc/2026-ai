# 2026 AI Development Toolkit

A comprehensive collection of modern development tools and AI integrations for building full-stack applications with browser automation and AI-assisted workflows.

## What's Inside

This repository contains six components that work independently or together:

- **Full-stack applications:** PHP backend (nette-app) + Vue frontend (nuxt-app)
- **Browser automation:** MCP server with Playwright and AI navigation (mcp-browser)
- **Atlassian integration:** MCP server for Jira/Confluence (mcp-atlassian)
- **AI building blocks:** Reusable commands and skills for Claude Code (agent-commands, agent-skills)

## Quick Start

Choose your path based on what you want to explore:

### Option A: Full Stack Development

Run both backend and frontend for a complete application:

```bash
# Terminal 1: Start backend
cd nette-app
make project
make dev

# Terminal 2: Start frontend
cd nuxt-app
npm install
npm run dev
```

Access at: http://localhost:3000 (frontend) and http://localhost:8080 (backend)

### Option B: Browser Automation

Launch the AI-powered browser automation environment:

```bash
cd mcp-browser
make docker-up
```

Access at: http://localhost:8080 (Neko browser UI) and configure MCP client to http://localhost:8931

### Option C: AI Skills Exploration

Explore reusable AI commands and skills:

```bash
# View available commands
ls agent-commands/.claude/commands/

# View available skills
ls agent-skills/.claude/skills/
```

## Repository Overview

| Component | Type | Technology Stack | Purpose |
|-----------|------|------------------|---------|
| **nette-app** | Backend | PHP 8.4+, Nette, Doctrine, SQLite | RESTful API with database |
| **nuxt-app** | Frontend | Node 24+, Nuxt 4, Vue 3, Nuxt UI Pro | Modern SPA interface |
| **mcp-browser** | MCP Server | Node 22+, Docker, Playwright, Stagehand | AI browser automation |
| **mcp-atlassian** | MCP Server | Docker-based | Jira/Confluence integration |
| **agent-commands** | AI Building Block | Markdown-based | Slash commands for Claude Code |
| **agent-skills** | AI Building Block | Markdown-based | Reusable skills for Claude Code |

### Component Relationships

- **nette-app** and **nuxt-app** integrate to form a full-stack application
- **mcp-browser** and **mcp-atlassian** are standalone MCP servers for AI assistants
- **agent-commands** and **agent-skills** enhance Claude Code with custom capabilities

## Component Documentation

### nette-app (PHP Backend)

Modern PHP backend using Nette framework with Doctrine ORM and SQLite database.

#### Prerequisites

- PHP 8.4 or higher
- Composer
- SQLite (included with PHP)

#### Setup

```bash
cd nette-app

# Copy configuration template
make init

# Install dependencies and setup directories
make project

# Start development server
make dev
```

The API will be available at http://localhost:8080

#### Project Structure

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

#### Common Tasks

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

#### Database Migrations

```bash
# Create new migration
vendor/bin/doctrine-migrations migrations:generate

# Run pending migrations
vendor/bin/doctrine-migrations migrations:migrate

# Check migration status
vendor/bin/doctrine-migrations migrations:status
```

#### Configuration

Edit `config/local.neon` for local settings:

```neon
parameters:
    # Add your parameters here

services:
    # Add your services here
```

#### Troubleshooting

**Permission errors on var/ directories:**
```bash
make setup
```

**Database not initialized:**
```bash
# Run migrations
vendor/bin/doctrine-migrations migrations:migrate
```

**Port 8080 already in use:**
```bash
# Use different port
php -S 0.0.0.0:8090 -t www
```

---

### nuxt-app (Vue Frontend)

Modern Vue 3 frontend built with Nuxt 4 and Nuxt UI Pro.

#### Prerequisites

- Node.js 24.0.0 or higher
- npm

#### Setup

```bash
cd nuxt-app

# Install dependencies
npm install

# Copy environment template
cp .env.example .env

# Start development server
npm run dev
```

The application will be available at http://localhost:3000

#### Environment Configuration

Create `.env` file with:

```env
NUXT_PUBLIC_BACKEND_URL=http://localhost:8080
```

#### Project Structure

```
nuxt-app/
├── app/
│   ├── app.config.ts          # Application config
│   ├── app.vue                # Root component
│   ├── assets/                # CSS and static assets
│   ├── layouts/               # Page layouts
│   └── pages/                 # Route pages
├── public/                    # Static files
├── .env                       # Environment variables
└── nuxt.config.ts             # Nuxt configuration
```

#### Common Tasks

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Generate static site
npm run generate

# Preview production build
npm run preview
```

#### Customization Points

- **Styling:** Modify `app/assets/css/main.css` for global styles
- **Layout:** Edit `app/layouts/default.vue` for default layout
- **Routes:** Add pages in `app/pages/` (file-based routing)
- **Config:** Update `nuxt.config.ts` for Nuxt settings
- **Backend URL:** Change `NUXT_PUBLIC_BACKEND_URL` in `.env`

#### Troubleshooting

**Cannot connect to backend:**

Check that:
1. `NUXT_PUBLIC_BACKEND_URL` in `.env` points to your backend
2. Backend is running on the specified port
3. CORS is configured correctly in backend

**Module resolution errors:**

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**

```bash
# Clear Nuxt cache
rm -rf .nuxt .output
npm run dev
```

---

### mcp-browser (Browser Automation)

Docker-based MCP server providing AI-powered browser automation with Neko (browser UI), Chrome DevTools Protocol (CDP), Playwright, and Stagehand.

#### Prerequisites

- Node.js 22 or higher
- Docker and Docker Compose
- npm

#### Setup

```bash
cd mcp-browser

# Start Docker environment
make docker-up
```

#### Access Points

- **Browser UI (Neko):** http://localhost:8080
  - Username: `neko`
  - Password: `admin`
- **CDP Endpoint:** http://localhost:9222
- **MCP Server:** http://localhost:8931

#### What It Provides

- **Neko:** Web-based browser interface for visual monitoring
- **CDP (Chrome DevTools Protocol):** Direct browser control API
- **Playwright:** Automated browser testing framework
- **Stagehand:** AI-powered navigation and interaction

#### MCP Client Configuration

Add to your Claude Code, Cursor, or other MCP client configuration:

```json
{
  "mcpServers": {
    "playwright": {
      "url": "http://localhost:8931"
    }
  }
}
```

For Cursor, edit `.cursor/mcp.json` in your project.

#### Usage Examples

Browse prompts in the `prompts/` folder for example use cases.

#### Troubleshooting

**Port conflicts:**

Edit `docker-compose.yml` to use different ports:

```yaml
ports:
  - "8081:8080"  # Neko UI
  - "9223:9222"  # CDP
  - "8932:8931"  # MCP Server
```

**CDP connection refused:**

Check that Docker container is running:
```bash
docker ps
```

**Stagehand API key missing:**

Some features may require API keys. Check `.env` configuration.

---

### mcp-atlassian (Jira/Confluence Integration)

MCP server for integrating Jira and Confluence with AI assistants.

#### Prerequisites

- Docker and Docker Compose
- Atlassian account with API access
- Jira URL and API token

#### Setup

```bash
cd mcp-atlassian

# Copy environment template
cp .env.example .env

# Edit .env with your credentials
# JIRA_USERNAME=your-email@example.com
# JIRA_URL=https://your-domain.atlassian.net
# JIRA_TOKEN=your-api-token
```

#### Generating API Token

1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
2. Click "Create API token"
3. Copy the token and add to `.env`

#### MCP Client Configuration

Add to your MCP client configuration:

```json
{
  "mcpServers": {
    "atlassian": {
      "url": "http://localhost:8932"
    }
  }
}
```

#### Usage Examples

Browse prompts in the `prompts/` folder for example interactions with Jira and Confluence.

---

### agent-commands (Slash Commands)

Reusable slash commands for Claude Code to enhance your AI-assisted workflow.

#### Location

```
agent-commands/.claude/commands/
```

#### Available Commands

- **git-commit.md** - Intelligent git commit helper

#### Usage

1. Commands are automatically discovered by Claude Code when in the repository
2. Use commands with the slash syntax: `/git-commit`
3. Claude Code will execute the command with appropriate context

#### Creating Custom Commands

Add new `.md` files to `agent-commands/.claude/commands/`:

```markdown
---
name: my-command
description: Description of what this command does
---

# Command Implementation

Instructions for Claude Code to execute this command...
```

---

### agent-skills (Reusable Skills)

Modular skills that provide specialized capabilities to Claude Code.

#### Location

```
agent-skills/.claude/skills/
```

#### Available Skills

- **nette-api** - Nette framework API development patterns and helpers

#### What Skills Provide

- Domain-specific knowledge
- Best practices and patterns
- Code generation templates
- Framework-specific helpers

#### Usage

Skills are automatically available when working in the repository. Claude Code will use them contextually based on your requests.

#### Creating Custom Skills

Add new skill directories to `agent-skills/.claude/skills/`:

```
agent-skills/.claude/skills/my-skill/
├── SKILL.md           # Skill definition and instructions
└── examples/          # Optional example files
```

## Development Workflows

### Full-Stack Development

Build a complete application with backend and frontend:

```bash
# 1. Start backend API
cd nette-app
make project && make dev

# 2. Start frontend (separate terminal)
cd nuxt-app
npm install && npm run dev

# 3. Make changes
# - Backend: Edit app/ files
# - Frontend: Edit app/ files
# - Both auto-reload on save

# 4. Test integration
# - Frontend calls backend via NUXT_PUBLIC_BACKEND_URL
# - Check browser console for API requests
```

### AI-Assisted Browser Testing

Use AI to navigate and test web applications:

```bash
# 1. Start browser automation
cd mcp-browser
make docker-up

# 2. Open Neko UI
# http://localhost:8080 (neko/admin)

# 3. Configure Claude Code MCP
# Add playwright server to MCP config

# 4. Use prompts
# "Navigate to example.com and find the login button"
# "Fill the form with test data and submit"
```

### Git Workflow with Commands

Use agent commands for better git commits:

```bash
# 1. Make your changes
# Edit files in any component

# 2. Use git-commit command
# In Claude Code: /git-commit

# 3. Command analyzes changes and suggests commit message
# Review and confirm

# 4. Push changes
git push
```

## Architecture Decisions

### Why Separate nette-app and nuxt-app?

- **Flexibility:** Deploy independently (static frontend, API backend separately)
- **Technology Choice:** Best tool for each layer (PHP for API, Vue for UI)
- **Team Structure:** Different developers can work on different stacks
- **Scalability:** Scale API and frontend independently

### Why SQLite?

- **Zero Configuration:** Works out of the box, no server setup
- **Development Speed:** Perfect for prototyping and local development
- **Production Ready:** Suitable for small to medium applications
- **Easy Migration:** Can switch to PostgreSQL/MySQL later if needed

### Why Docker for MCP Servers?

- **Isolation:** Browser automation runs in contained environment
- **Consistency:** Same environment across all machines
- **Dependencies:** Complex browser setup handled automatically
- **Security:** Isolated from host system

### Why Minimal Dependencies?

- **Maintenance:** Fewer packages to update and monitor
- **Security:** Smaller attack surface
- **Performance:** Faster install and build times
- **Clarity:** Easier to understand what each component does

## Technology Reference

| Component | Runtime | Framework | Version | Key Dependencies |
|-----------|---------|-----------|---------|------------------|
| nette-app | PHP 8.4+ | Nette | contributte/nella ^0.3.0 | Doctrine ORM, Nettrine |
| nuxt-app | Node 24.0.0+ | Nuxt | ^4.0.1 | Vue 3, Nuxt UI Pro ^3.3.0 |
| mcp-browser | Node 22+ | MCP | Docker-based | Playwright ^1.50.0, Stagehand |
| mcp-atlassian | - | MCP | Docker-based | Atlassian API |

### Framework Documentation

- **Nette Framework:** https://nette.org
- **Doctrine ORM:** https://www.doctrine-project.org
- **Nuxt:** https://nuxt.com
- **Vue 3:** https://vuejs.org
- **Nuxt UI Pro:** https://ui.nuxt.com/pro
- **Playwright:** https://playwright.dev
- **Stagehand:** https://github.com/browserbase/stagehand

## Contributing & Extending

### Adding New Components

Follow the existing structure:

```bash
# Create new component directory
mkdir my-component

# Add README.md with setup instructions
# Add to main README.md repository overview
```

### Adding Skills/Commands

```bash
# Commands
agent-commands/.claude/commands/my-command.md

# Skills
agent-skills/.claude/skills/my-skill/SKILL.md
```

### Suggesting Improvements

1. Test your changes thoroughly
2. Update documentation
3. Ensure code quality (run linters/tests)
4. Submit pull request with clear description

## FAQ & Troubleshooting

### General Questions

**Which components do I need to run?**

Depends on your goal:
- Full-stack app: nette-app + nuxt-app
- Browser automation only: mcp-browser
- Atlassian integration only: mcp-atlassian
- AI commands/skills: Available automatically in repository

**What are the minimum prerequisites?**

- For PHP backend: PHP 8.4+, Composer
- For Vue frontend: Node 24+, npm
- For MCP servers: Docker, Node 22+

**Can I use different versions?**

The specified versions are tested and recommended. Older versions may work but are not guaranteed.

### Component-Specific Issues

**nette-app: Class not found errors**

```bash
composer dump-autoload
make clean
```

**nuxt-app: Module not found**

```bash
rm -rf node_modules .nuxt
npm install
```

**mcp-browser: Container won't start**

```bash
docker compose down
docker compose up --build
```

**Permission denied errors**

```bash
# nette-app
make setup

# nuxt-app
sudo chown -R $USER:$USER node_modules
```

### Platform-Specific Notes

**macOS**

All components work out of the box with Homebrew:

```bash
brew install php@8.4 composer node@24 docker
```

**Linux**

Install from package manager:

```bash
# Debian/Ubuntu
apt install php8.4 composer nodejs docker.io

# Fedora
dnf install php composer nodejs docker
```

**Windows**

Recommended setup:
- Use WSL2 for best compatibility
- Install Docker Desktop
- Install PHP and Node via Chocolatey or official installers

## Resources & Links

### Official Documentation

- **Nette:** https://doc.nette.org
- **Doctrine:** https://www.doctrine-project.org/projects/doctrine-orm/en/current/index.html
- **Nuxt:** https://nuxt.com/docs
- **Playwright:** https://playwright.dev/docs/intro

### AI & MCP Resources

- **Model Context Protocol:** https://modelcontextprotocol.io
- **Claude Code:** https://claude.com/claude-code
- **Cursor IDE:** https://cursor.sh
- **Anthropic API:** https://www.anthropic.com/api

### Tool Documentation

- **Composer:** https://getcomposer.org/doc/
- **npm:** https://docs.npmjs.com
- **Docker:** https://docs.docker.com
- **PHPStan:** https://phpstan.org/user-guide/getting-started
- **Playwright:** https://playwright.dev

### Community

- **Nette Forum:** https://forum.nette.org
- **Nuxt Discord:** https://discord.com/invite/nuxt
- **MCP GitHub:** https://github.com/modelcontextprotocol

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) file for details.

Copyright (c) 2026 Nowdoc

---

**Quick Navigation:**
- [Quick Start](#quick-start) - Get running fast
- [Component Documentation](#component-documentation) - Detailed setup guides
- [Development Workflows](#development-workflows) - Real-world scenarios
- [Troubleshooting](#faq--troubleshooting) - Common issues solved
