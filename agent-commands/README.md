# Agent Commands

Reusable slash commands for Claude Code to enhance your AI-assisted workflow.

## Overview

Agent commands are markdown-based instructions that Claude Code automatically discovers and executes. They provide reusable automation for common development tasks.

## Project Structure

```
agent-commands/
└── .claude/
    └── commands/
        └── git-commit.md      # Intelligent git commit helper
```

## Available Commands

| Command | Description |
|---------|-------------|
| `/git-commit` | Intelligent git commit helper that analyzes changes and suggests commit messages |

## Usage

1. Commands are automatically discovered by Claude Code when in the repository
2. Use commands with the slash syntax: `/git-commit`
3. Claude Code will execute the command with appropriate context

## Creating Custom Commands

Add new `.md` files to `.claude/commands/`:

```markdown
---
name: my-command
description: Description of what this command does
---

# Command Implementation

Instructions for Claude Code to execute this command...
```

### Command File Format

Commands are defined in markdown with optional frontmatter:

```markdown
---
name: command-name          # How users invoke it
description: Brief summary  # Shown in command list
---

# Instructions

Detailed instructions for what Claude Code should do...
```

### Best Practices

- Keep commands focused on a single task
- Provide clear, step-by-step instructions
- Include context about when to use the command
- Test commands thoroughly before sharing

## How It Works

1. Claude Code scans `.claude/commands/` for markdown files
2. Commands are registered and available via slash syntax
3. When invoked, Claude Code reads the command file
4. Instructions are executed in the current context

## Resources

- [Claude Code Documentation](https://claude.ai/docs/claude-code)
- [Model Context Protocol](https://modelcontextprotocol.io)
