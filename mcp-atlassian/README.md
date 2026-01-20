# MCP Atlassian

MCP server for integrating Jira and Confluence with AI assistants.

## Prerequisites

- Docker and Docker Compose
- Atlassian account with API access
- Jira URL and API token

## Installation

```bash
# Copy environment template
cp .env.example .env

# Edit .env with your credentials
```

## Configuration

Setup `.env` file with your Atlassian credentials:

```env
JIRA_USERNAME=your-email@example.com
JIRA_URL=https://your-domain.atlassian.net
JIRA_TOKEN=your-api-token
```

### Generating API Token

1. Go to https://id.atlassian.com/manage-profile/security/api-tokens
2. Click "Create API token"
3. Copy the token and add to `.env`

## MCP Client Configuration

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

MCP servers are configured at `.cursor/mcp.json`.

## Project Structure

```
mcp-atlassian/
├── prompts/                   # Example prompts
├── .cursor/mcp.json           # MCP server configuration
└── .env.example               # Environment template
```

## Usage

1. Configure credentials in `.env`
2. Enable MCP servers in Cursor or other MCP clients
3. Pick a prompt from `prompts` folder

## Features

- Query Jira issues and projects
- Create and update Jira tickets
- Search Confluence pages
- AI-powered project management workflows

## Troubleshooting

**Authentication failed:**

1. Verify your API token is correct
2. Check that the username matches your Atlassian email
3. Ensure the Jira URL includes `https://`

**Connection timeout:**

1. Check your network connection
2. Verify the Jira URL is accessible
3. Check if VPN is required for your Atlassian instance

## Resources

- [Atlassian API Documentation](https://developer.atlassian.com/cloud/jira/platform/rest/v3/intro/)
- [Atlassian API Tokens](https://id.atlassian.com/manage-profile/security/api-tokens)
- [Model Context Protocol](https://modelcontextprotocol.io)
