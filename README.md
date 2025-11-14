# agent_test

A test repository for agent functionality with monorepo tooling and comprehensive documentation.

## 📚 Documentation

- [Macro Roadmap](./docs/ROADMAP_MACRO.md) - High-level strategic goals and milestones
- [Granular Roadmap](./docs/ROADMAP_GRANULAR.md) - Detailed task breakdown and progress tracking
- [ADR-0001](./docs/ADR-0001.md) - Architecture Decision Record for Authentication (coming soon)
- [Setup Guide](./docs/SETUP.md) - Getting started with development (coming soon)

## 🚀 Quick Start

### Prerequisites

- Node.js >= 18.0.0
- pnpm (recommended) or npm

### Installation

```bash
# Install dependencies
pnpm install
# or
npm install
```

## 🔐 Secret Generation

This repository includes a utility script to generate strong, cryptographically secure secrets for use in authentication systems (e.g., NEXTAUTH_SECRET, JWT_SECRET).

### Usage

```bash
# Using pnpm (recommended)
pnpm gen:secret

# Using npm
npm run gen:secret
```

### Output

The script generates two formats:
- **HEX_64**: A 64-character hexadecimal string
- **BASE64**: A base64-encoded variant

Example output:
```
HEX_64=a1b2c3d4e5f6...
BASE64=obLD1OX2...

# Usage:
# Copy one of the above values to your .env file:
# NEXTAUTH_SECRET=<HEX_64 or BASE64 value>
# JWT_SECRET=<HEX_64 or BASE64 value>
```

### Features

- ✅ Cross-platform compatible (Node.js only, no external dependencies)
- ✅ Cryptographically secure using Node's built-in `crypto.randomBytes()`
- ✅ No external dependencies required
- ✅ Generates 32 bytes of entropy (256-bit security)

## 🛠️ Available Scripts

- `pnpm gen:secret` - Generate strong secrets for authentication

## 📝 Project Structure

```
agent_test/
├── docs/              # Documentation files
│   ├── ROADMAP_MACRO.md
│   └── ROADMAP_GRANULAR.md
├── scripts/           # Utility scripts
│   └── gen-secret.ts  # Secret generation script
├── package.json       # Project dependencies and scripts
├── tsconfig.json      # TypeScript configuration
└── README.md          # This file
```

## 🤝 Contributing

Contributions are welcome! Please check our [roadmap documentation](./docs/ROADMAP_GRANULAR.md) to see what we're working on.

## 📄 License

See [LICENSE](./LICENSE) file for details.