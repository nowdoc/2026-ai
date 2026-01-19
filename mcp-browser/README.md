# Browser AI

This repository has a prepared configuration for controlling browser with prompts.

## Config

1. MCP servers at `.cursor/mcp.json`.

## Usage

1. Start the MCP server via `make docker-up`.
2. Open browser at `http://localhost:8080` with `neko/admin` credentials.
3. Use Cursor, Claude or other MCP clients.

    ```json
    {
        "mcpServers": {
            "playwright": {
                "url": "http://localhost:8931"
            }
        }
    }
    ```

4. Pick a prompt from `prompts` folder.
