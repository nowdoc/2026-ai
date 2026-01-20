# Agent Skills

Modular skills that provide specialized capabilities to Claude Code for domain-specific development tasks.

## Overview

Agent skills are reusable knowledge modules that enhance Claude Code with domain-specific patterns, best practices, and code generation templates.

## Project Structure

```
agent-skills/
└── .claude/
    └── skills/
        └── nette-api/
            └── SKILL.md       # Nette framework API development patterns
```

## Available Skills

| Skill | Description |
|-------|-------------|
| `nette-api` | Nette framework API development patterns and helpers |

## What Skills Provide

- **Domain-specific knowledge:** Framework conventions and patterns
- **Best practices:** Recommended approaches and anti-patterns to avoid
- **Code generation templates:** Reusable code snippets and boilerplate
- **Framework-specific helpers:** Utilities tailored to specific technologies

## Usage

Skills are automatically available when working in the repository. Claude Code will use them contextually based on your requests.

Example interactions:
- "Create a new Nette presenter"
- "Add a Doctrine entity for User"
- "Setup API endpoint for authentication"

## Creating Custom Skills

Add new skill directories to `.claude/skills/`:

```
.claude/skills/my-skill/
├── SKILL.md           # Skill definition and instructions
└── examples/          # Optional example files
```

### SKILL.md Format

```markdown
# Skill Name

## Overview

Brief description of what this skill provides.

## Capabilities

- Capability 1
- Capability 2

## Patterns

### Pattern Name

Description and code examples...

## Examples

### Example Use Case

Step-by-step example...
```

### Best Practices

- Focus on a single domain or technology
- Provide concrete code examples
- Document both patterns and anti-patterns
- Include troubleshooting guidance
- Keep skills modular and composable

## How It Works

1. Claude Code scans `.claude/skills/` for skill directories
2. Skills are loaded based on context and user requests
3. Skill knowledge augments Claude Code's responses
4. Patterns and templates are applied as appropriate

## Resources

- [Claude Code Documentation](https://claude.ai/docs/claude-code)
- [Model Context Protocol](https://modelcontextprotocol.io)
