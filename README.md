# Agent Monorepo

[![CI](https://github.com/diegorosah/agent_test/workflows/CI/badge.svg)](https://github.com/diegorosah/agent_test/actions)

Production-quality monorepo with AI-driven code generator for scaffolding full-stack web applications, built for long-term stability (~5 years).

## 🚀 Quick Start

### Prerequisites

- Node.js 20.x or higher
- PNPM 8.x or higher
- Docker (for local PostgreSQL)

### Installation

```bash
# Clone the repository
git clone https://github.com/diegorosah/agent_test.git
cd agent_test

# Install dependencies
pnpm install

# Start local database
docker-compose -f infra/docker-compose.yml up -d db

# Generate Prisma client and run migrations
cd apps/api
pnpm prisma:generate
pnpm prisma:migrate
cd ../..

# Start development servers
pnpm dev
```

### Environment Setup

Copy the `.env.example` files and configure your environment variables:

```bash
cp apps/web/.env.example apps/web/.env.local
cp apps/api/.env.example apps/api/.env
cp apps/bff/.env.example apps/bff/.env
```

**📖 For detailed setup instructions (in Portuguese), see [docs/SETUP_GUIA_INICIANTE.md](docs/SETUP_GUIA_INICIANTE.md)**

This comprehensive guide includes:
- Detailed prerequisites and installation steps
- Database setup (Neon or local PostgreSQL)
- Secret generation guide
- GitHub OAuth configuration (with localhost and production URIs)
- Google OAuth setup (optional)
- Clerk integration (optional)
- Environment variables reference
- Local development workflow
- Deploy examples (Vercel, Render, Fly.io)
- Troubleshooting and FAQ

## 🏗️ Architecture

This monorepo contains:

### Applications

- **apps/web** - Next.js 14 frontend with App Router, Tailwind CSS, shadcn/ui, TanStack Query
- **apps/api** - NestJS backend with Prisma, PostgreSQL, OpenAPI 3.1
- **apps/bff** - NestJS Backend-for-Frontend (aggregation layer)

### Packages

- **packages/shared-types** - Shared Zod schemas and TypeScript types
- **packages/config** - Shared ESLint, Prettier, and TypeScript configurations
- **packages/ui** - Shared UI components (shadcn/ui wrappers)

### Agent (Code Generator)

- **agent/** - AI-driven code generator that scaffolds features from YAML/JSON specs
- **specs/** - Example specification files

### Infrastructure

- **infra/** - Docker configurations and docker-compose files
- **.github/workflows/** - CI/CD pipelines

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **shadcn/ui** - Re-usable component library
- **TanStack Query** - Data fetching and caching
- **Auth.js (NextAuth)** - Authentication (GitHub OAuth by default)

### Backend
- **NestJS** - Progressive Node.js framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Relational database
- **OpenAPI 3.1** - API documentation via @nestjs/swagger
- **JWT** - Token-based authentication

### DevOps & Tools
- **Turborepo** - High-performance build system
- **PNPM** - Fast, disk space efficient package manager
- **Docker** - Containerization
- **GitHub Actions** - CI/CD
- **ESLint & Prettier** - Code quality
- **Jest & Playwright** - Testing

## 📝 Available Scripts

```bash
# Development
pnpm dev          # Start all apps in development mode
pnpm build        # Build all packages and apps
pnpm lint         # Lint all packages
pnpm typecheck    # Type check all packages
pnpm test         # Run all tests

# Agent (Code Generator)
pnpm agent:generate --spec specs/todo-app.yaml   # Generate code from spec

# Individual apps
cd apps/web && pnpm dev       # Start web app only
cd apps/api && pnpm dev       # Start API only
cd apps/bff && pnpm dev       # Start BFF only

# Database (API)
cd apps/api
pnpm prisma:generate          # Generate Prisma client
pnpm prisma:migrate           # Run migrations
pnpm prisma:studio            # Open Prisma Studio

# Clean
pnpm clean        # Clean all build artifacts
```

## 🔐 Authentication

This project supports multiple authentication providers:

### Default: Auth.js (NextAuth) with GitHub OAuth

1. Create a GitHub OAuth App: https://github.com/settings/developers
2. Set callback URL: `http://localhost:3000/api/auth/callback/github`
3. Add credentials to `apps/web/.env.local`:
   ```env
   GITHUB_ID="your-client-id"
   GITHUB_SECRET="your-client-secret"
   NEXTAUTH_SECRET="generate-with-openssl-rand-base64-32"
   ```

### Optional: Google OAuth

Add to `apps/web/.env.local`:
```env
GOOGLE_ID="your-google-client-id"
GOOGLE_SECRET="your-google-client-secret"
```

### Optional: Clerk

Enable Clerk by setting `CLERK_ENABLED=true` in environment variables. See [docs/SETUP_GUIA_INICIANTE.md](docs/SETUP_GUIA_INICIANTE.md) for details.

## 🤖 Code Generator (Agent)

Generate full-stack features from declarative YAML specifications:

```bash
pnpm agent:generate --spec specs/todo-app.yaml
```

### Example Spec

```yaml
name: Todo App
entities:
  - name: Todo
    fields:
      - name: title
        type: string
        required: true
      - name: completed
        type: boolean
        required: true
    timestamps: true

endpoints:
  - path: /todos
    method: GET
    entity: Todo
    type: list
    protected: true
```

The agent generates:
- Prisma models
- NestJS modules, controllers, services
- Next.js pages and components (planned)
- API client code (planned)
- Tests (planned)

## 🚀 Deployment

### Web (Vercel)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/diegorosah/agent_test)

### API (Render/Fly.io)

See [docs/SETUP_GUIA_INICIANTE.md](docs/SETUP_GUIA_INICIANTE.md) for detailed deployment instructions.

### Database (Neon)

Recommended serverless PostgreSQL: https://neon.tech

## 📖 Documentation

- **[Setup Guide (Portuguese)](docs/SETUP_GUIA_INICIANTE.md)** - Comprehensive beginner-friendly tutorial
- **[ADR-0001](docs/ADR-0001.md)** - Architecture decision record: 5-year stability rationale
- **API Documentation** - Available at `http://localhost:3001/api/docs` when running locally

## 🤝 Contributing

Contributions are welcome! Please read our contributing guidelines before submitting PRs.

## 📄 License

MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Roadmap

- [x] Monorepo setup with Turborepo + PNPM
- [x] Next.js frontend with Auth.js
- [x] NestJS backend with Prisma + PostgreSQL
- [x] Basic code generator (agent)
- [x] Docker setup
- [x] CI/CD pipeline
- [x] Comprehensive documentation
- [ ] Advanced agent templates (Next.js pages, tests)
- [ ] Wizard UI for spec creation
- [ ] OpenTelemetry integration
- [ ] Advanced BFF features (caching, policies)

## 🙏 Acknowledgments

Built with the following amazing technologies:
- [Next.js](https://nextjs.org/)
- [NestJS](https://nestjs.com/)
- [Prisma](https://www.prisma.io/)
- [Turborepo](https://turbo.build/)
- [Tailwind CSS](https://tailwindcss.com/)
- [shadcn/ui](https://ui.shadcn.com/)

---

Made with ❤️ for developers who want to build production-ready full-stack applications quickly.