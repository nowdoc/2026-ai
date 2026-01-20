# 2026 AI Development Toolkit

A comprehensive collection of modern development tools and AI integrations for building full-stack applications with browser automation and AI-assisted workflows.

## Projects

| Project | Type | Stack | Description |
|---------|------|-------|-------------|
| [nette-app](./nette-app) | Backend API | PHP 8.4+, Nette, Doctrine, SQLite | RESTful API with database |
| [nuxt-app](./nuxt-app) | Frontend SPA | Node 24+, Nuxt 4, Vue 3, Nuxt UI Pro | Modern SPA interface |
| [mcp-browser](./mcp-browser) | MCP Server | Node 22+, Docker, Playwright, Stagehand | AI browser automation |
| [mcp-atlassian](./mcp-atlassian) | MCP Server | Docker | Jira/Confluence integration |
| [agent-commands](./agent-commands) | AI Building Block | Markdown | Slash commands for Claude Code |
| [agent-skills](./agent-skills) | AI Building Block | Markdown | Reusable skills for Claude Code |

## Quick Start

### Full Stack Development

```bash
# Terminal 1: Start backend
cd nette-app && make project && make dev

# Terminal 2: Start frontend
cd nuxt-app && npm install && npm run dev
```

### Browser Automation

```bash
cd mcp-browser && make docker-up
```

### AI Tools

```bash
# View available commands
ls agent-commands/.claude/commands/

# View available skills
ls agent-skills/.claude/skills/
```

## License

MIT License - see [LICENSE](LICENSE) for details.
