# MCP Browser

Docker-based MCP server providing AI-powered browser automation with Neko (browser UI), Chrome DevTools Protocol (CDP), Playwright, and Stagehand.

## Prerequisites

- Node.js 22 or higher
- Docker and Docker Compose
- npm

## Installation

```bash
# Start Docker environment
make docker-up
```

## Access Points

| Service | URL | Credentials |
|---------|-----|-------------|
| Browser UI (Neko) | http://localhost:8080 | neko / admin |
| CDP Endpoint | http://localhost:9222 | - |
| MCP Server | http://localhost:8931 | - |

## What It Provides

- **Neko:** Web-based browser interface for visual monitoring
- **CDP (Chrome DevTools Protocol):** Direct browser control API
- **Playwright:** Automated browser testing framework
- **Stagehand:** AI-powered navigation and interaction

## MCP Client Configuration

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

## Project Structure

```
mcp-browser/
├── playwright/                # Playwright test framework
├── stagehand/                 # Stagehand AI navigation
├── prompts/                   # Example prompts
├── output/                    # Results/recordings
├── videos/                    # Screen recordings
├── .cursor/mcp.json           # MCP server configuration
├── docker-compose.yml         # Docker setup
└── playwright.config.ts       # Playwright configuration
```

## Usage

1. Start the MCP server via `make docker-up`
2. Open browser at http://localhost:8080 with `neko/admin` credentials
3. Use Cursor, Claude or other MCP clients
4. Pick a prompt from `prompts` folder

## Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 22+ | Runtime |
| Docker | - | Containerization |
| Playwright | ^1.50.0 | Browser automation |
| Stagehand | - | AI navigation |
| Neko | - | Browser UI |

## Troubleshooting

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

**Container won't start:**

```bash
docker compose down
docker compose up --build
```

**Stagehand API key missing:**

Some features may require API keys. Check `.env` configuration.

## Resources

- [Playwright Documentation](https://playwright.dev/docs/intro)
- [Stagehand GitHub](https://github.com/browserbase/stagehand)
- [Model Context Protocol](https://modelcontextprotocol.io)
