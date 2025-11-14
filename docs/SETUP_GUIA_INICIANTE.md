# Guia de Configuração para Iniciantes

Bem-vindo ao Agent Monorepo! Este guia irá orientá-lo através de toda a configuração necessária para executar este projeto localmente.

## 📋 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

1. **Node.js LTS** (versão 20.x ou superior)
   - Download: https://nodejs.org/
   - Verifique a instalação: `node --version`

2. **PNPM** (gerenciador de pacotes)
   ```bash
   npm install -g pnpm@8.15.0
   ```
   - Verifique a instalação: `pnpm --version`

3. **Docker** (para banco de dados local)
   - Download: https://www.docker.com/get-started
   - Verifique a instalação: `docker --version`

4. **Git**
   - Download: https://git-scm.com/
   - Verifique a instalação: `git --version`

## 🗄️ Configuração do Banco de Dados

Você tem duas opções para o banco de dados PostgreSQL:

### Opção 1: Neon (Recomendado para Produção)

Neon é um banco de dados PostgreSQL serverless, ideal para deploy em produção.

1. Crie uma conta em https://neon.tech
2. Crie um novo projeto
3. Copie a connection string fornecida
4. Use esta string no seu arquivo `.env` (veja seção de variáveis de ambiente)

### Opção 2: PostgreSQL Local via Docker (Recomendado para Desenvolvimento)

Para desenvolvimento local, é mais fácil usar Docker:

```bash
# Navegue até o diretório do projeto
cd /caminho/para/agent_test

# Inicie o PostgreSQL
docker-compose -f infra/docker-compose.yml up -d db

# Verifique se está rodando
docker ps
```

A connection string será:
```
postgresql://postgres:postgres@localhost:5432/agent_db
```

## 🔐 Gerando Segredos

### NEXTAUTH_SECRET e JWT_SECRET

Estes segredos são usados para assinar tokens JWT. Devem ser strings aleatórias e seguras.

**Gerar com OpenSSL:**
```bash
openssl rand -base64 32
```

**Gerar com Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Salve o resultado - você usará o mesmo valor para `NEXTAUTH_SECRET` (no web) e `JWT_SECRET` (no api/bff).

## 🔑 Configuração do GitHub OAuth

O GitHub OAuth é o provedor de autenticação padrão.

### Passo 1: Criar OAuth App no GitHub

1. Acesse https://github.com/settings/developers
2. Clique em "New OAuth App"
3. Preencha os campos:
   - **Application name**: Agent Monorepo (ou nome de sua escolha)
   - **Homepage URL**: `http://localhost:3000` (para dev local)
   - **Authorization callback URL**: `http://localhost:3000/api/auth/callback/github`
4. Clique em "Register application"
5. Anote o **Client ID**
6. Clique em "Generate a new client secret" e anote o **Client Secret**

### Passo 2: URLs de Callback

**Para desenvolvimento local:**
- Authorization callback URL: `http://localhost:3000/api/auth/callback/github`

**Para produção (exemplo com Vercel):**
- Authorization callback URL: `https://seu-dominio.vercel.app/api/auth/callback/github`

💡 **Dica:** Você pode criar dois OAuth Apps separados - um para desenvolvimento e outro para produção.

## 🌐 Configuração do Google OAuth (Opcional)

Se você quiser adicionar o Google como provedor de autenticação:

### Passo 1: Criar Projeto no Google Cloud Console

1. Acesse https://console.cloud.google.com/
2. Crie um novo projeto ou selecione um existente
3. Navegue até "APIs & Services" > "Credentials"
4. Clique em "Create Credentials" > "OAuth client ID"
5. Configure a tela de consentimento se solicitado
6. Escolha "Web application" como tipo
7. Adicione as URIs de redirecionamento autorizadas:
   - `http://localhost:3000/api/auth/callback/google` (dev)
   - `https://seu-dominio.vercel.app/api/auth/callback/google` (prod)
8. Anote o **Client ID** e **Client secret**

## 🔐 Configuração do Clerk (Opcional)

Clerk é uma alternativa ao NextAuth, pode ser ativado via variável de ambiente.

### Passo 1: Criar Conta no Clerk

1. Acesse https://clerk.com/
2. Crie uma conta e um novo application
3. No dashboard, copie:
   - Publishable Key
   - Secret Key

### Passo 2: Ativar Clerk

No arquivo `.env.local` do web app, adicione:
```env
CLERK_ENABLED=true
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="sua-publishable-key"
CLERK_SECRET_KEY="sua-secret-key"
```

No api e bff, adicione:
```env
CLERK_ENABLED=true
CLERK_SECRET_KEY="sua-secret-key"
```

## 📝 Configuração das Variáveis de Ambiente

Cada aplicação tem seu próprio arquivo `.env`. Use os arquivos `.env.example` como template.

### apps/web/.env.local

Crie o arquivo `apps/web/.env.local`:

```env
# Auth.js (NextAuth)
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="seu-secret-gerado-com-openssl"

# GitHub OAuth (obrigatório)
GITHUB_ID="seu-github-client-id"
GITHUB_SECRET="seu-github-client-secret"

# Google OAuth (opcional)
# GOOGLE_ID="seu-google-client-id"
# GOOGLE_SECRET="seu-google-client-secret"

# Clerk (opcional - descomente para ativar)
# CLERK_ENABLED=true
# NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="sua-clerk-publishable-key"
# CLERK_SECRET_KEY="sua-clerk-secret-key"

# API Configuration
NEXT_PUBLIC_API_URL="http://localhost:3001"
API_BASE_URL="http://localhost:3001"
```

### apps/api/.env

Crie o arquivo `apps/api/.env`:

```env
PORT=3001
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/agent_db"
JWT_SECRET="mesmo-secret-do-nextauth"
CORS_ORIGIN="http://localhost:3000"

# Clerk (opcional)
# CLERK_ENABLED=false
# CLERK_SECRET_KEY=""
```

### apps/bff/.env

Crie o arquivo `apps/bff/.env`:

```env
PORT=3002
UPSTREAM_API_URL="http://localhost:3001"
JWT_SECRET="mesmo-secret-do-nextauth"
CORS_ORIGIN="http://localhost:3000"

# Clerk (opcional)
# CLERK_ENABLED=false
# CLERK_SECRET_KEY=""
```

## 🚀 Executar Localmente

### 1. Instalar Dependências

```bash
pnpm install
```

### 2. Iniciar o Banco de Dados

```bash
docker-compose -f infra/docker-compose.yml up -d db
```

### 3. Executar Migrações do Prisma

```bash
cd apps/api
pnpm prisma:generate
pnpm prisma:migrate
cd ../..
```

### 4. Iniciar os Serviços em Modo de Desenvolvimento

Em diferentes terminais ou use `tmux`/`screen`:

```bash
# Terminal 1: API
cd apps/api
pnpm dev

# Terminal 2: Web
cd apps/web
pnpm dev

# Terminal 3 (opcional): BFF
cd apps/bff
pnpm dev
```

Ou use Turbo para iniciar tudo de uma vez:

```bash
pnpm dev
```

### 5. Acessar a Aplicação

- **Web App**: http://localhost:3000
- **API**: http://localhost:3001
- **API Docs (Swagger)**: http://localhost:3001/api/docs
- **BFF**: http://localhost:3002

## 📦 Deploy

### Deploy do Web App (Vercel)

1. Conecte seu repositório ao Vercel
2. Configure as variáveis de ambiente na dashboard do Vercel:
   - `NEXTAUTH_URL`: URL do seu app (ex: `https://seu-app.vercel.app`)
   - `NEXTAUTH_SECRET`: Seu secret gerado
   - `GITHUB_ID`: Client ID do GitHub OAuth
   - `GITHUB_SECRET`: Client Secret do GitHub OAuth
   - `NEXT_PUBLIC_API_URL`: URL da sua API em produção
3. Deploy!

**Importante:** Atualize a callback URL do GitHub OAuth para incluir seu domínio de produção.

### Deploy do API (Render/Fly.io)

#### Render

1. Crie um novo Web Service no Render
2. Conecte seu repositório
3. Configure:
   - **Build Command**: `cd apps/api && pnpm install && pnpm build`
   - **Start Command**: `cd apps/api && node dist/main`
4. Adicione variáveis de ambiente:
   - `DATABASE_URL`: Connection string do Neon
   - `JWT_SECRET`: Mesmo secret usado no web
   - `CORS_ORIGIN`: URL do seu web app

#### Fly.io

```bash
# Instale o Fly CLI
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Deploy da API
fly launch --dockerfile infra/Dockerfile.api
```

### Deploy do Banco de Dados (Neon)

1. Crie um banco no Neon (https://neon.tech)
2. Copie a connection string
3. Atualize `DATABASE_URL` nas variáveis de ambiente da API
4. Execute as migrações:
   ```bash
   # Localmente com connection string do Neon
   DATABASE_URL="sua-connection-string-neon" pnpm prisma:migrate
   ```

## ❓ Dúvidas Comuns

### "Cannot find module '@agent-monorepo/shared-types'"

**Solução:** Execute `pnpm build` na raiz do projeto para construir todas as dependências internas.

### "Error: Cannot connect to database"

**Soluções:**
1. Verifique se o Docker está rodando: `docker ps`
2. Verifique se a `DATABASE_URL` está correta
3. Tente reiniciar o container: `docker-compose -f infra/docker-compose.yml restart db`

### "Error: NEXTAUTH_SECRET missing"

**Solução:** Certifique-se de ter criado o arquivo `.env.local` em `apps/web/` com a variável `NEXTAUTH_SECRET`.

### "GitHub OAuth redirect_uri mismatch"

**Solução:** Verifique se a callback URL no GitHub OAuth App corresponde exatamente com:
- Dev: `http://localhost:3000/api/auth/callback/github`
- Prod: `https://seu-dominio/api/auth/callback/github`

### Erro ao rodar migrações do Prisma

**Solução:** 
1. Certifique-se de que o banco de dados está rodando
2. Verifique a `DATABASE_URL` no arquivo `.env`
3. Tente gerar o cliente novamente: `pnpm prisma:generate`

### Port already in use (porta já em uso)

**Solução:** 
```bash
# Encontre o processo usando a porta
lsof -i :3000  # ou :3001, :3002

# Mate o processo
kill -9 <PID>
```

## 🔧 Scripts Úteis

### Gerar NEXTAUTH_SECRET automaticamente

Crie um arquivo `scripts/generate-secret.sh`:

```bash
#!/bin/bash
echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)"
```

Execute:
```bash
chmod +x scripts/generate-secret.sh
./scripts/generate-secret.sh
```

### Resetar banco de dados local

```bash
# Parar e remover containers
docker-compose -f infra/docker-compose.yml down -v

# Reiniciar
docker-compose -f infra/docker-compose.yml up -d db

# Executar migrações novamente
cd apps/api
pnpm prisma:migrate
```

### Verificar estado do projeto

```bash
# Lint
pnpm lint

# Type check
pnpm typecheck

# Tests
pnpm test

# Build
pnpm build
```

## 📚 Próximos Passos

Após configurar tudo:

1. ✅ Acesse http://localhost:3000
2. ✅ Faça login com GitHub
3. ✅ Explore a interface do Studio
4. ✅ Teste o gerador de código: `pnpm agent:generate --spec specs/todo-app.yaml`
5. ✅ Leia a documentação da API: http://localhost:3001/api/docs

## 🆘 Suporte

Se você encontrar problemas não listados aqui:

1. Verifique os logs das aplicações
2. Consulte a documentação oficial das tecnologias:
   - Next.js: https://nextjs.org/docs
   - NestJS: https://docs.nestjs.com/
   - Prisma: https://www.prisma.io/docs
   - NextAuth: https://next-auth.js.org/
3. Abra uma issue no repositório do GitHub

---

Desenvolvido com ❤️ para ajudar desenvolvedores a construir aplicações full-stack rapidamente.
