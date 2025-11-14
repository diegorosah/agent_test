# Guia de Configuração para Iniciantes

Este guia irá ajudá-lo a configurar e executar o monorepo do zero.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado:

1. **Node.js 20 ou superior (LTS)**
   - Baixe em: https://nodejs.org/
   - Verifique a instalação: `node --version`

2. **pnpm 8+**
   - Instale globalmente: `npm install -g pnpm@8.15.0`
   - Verifique a instalação: `pnpm --version`

3. **Docker Desktop**
   - Baixe em: https://www.docker.com/products/docker-desktop
   - Necessário para executar o PostgreSQL localmente

4. **Git**
   - Baixe em: https://git-scm.com/downloads
   - Verifique a instalação: `git --version`

## Passo 1: Clonar o Repositório

```bash
git clone <url-do-repositorio>
cd agent_test
```

## Passo 2: Instalar Dependências

Execute o comando abaixo na raiz do projeto:

```bash
pnpm install
```

Este comando irá:
- Baixar todas as dependências necessárias
- Configurar os workspaces do pnpm
- Preparar os links simbólicos entre pacotes

## Passo 3: Configurar o Banco de Dados

### 3.1 Iniciar o PostgreSQL com Docker

```bash
pnpm docker:up
```

Isso iniciará um container Docker com PostgreSQL na porta 5432.

### 3.2 Configurar Variáveis de Ambiente

Crie um arquivo `.env` em `apps/api/`:

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/monorepo"
PORT=3001
CORS_ORIGIN=http://localhost:3000
```

### 3.3 Executar Migrações

```bash
pnpm db:migrate
```

Isso criará as tabelas necessárias no banco de dados.

## Passo 4: Configurar a Aplicação Web

Crie um arquivo `.env` em `apps/web/`:

```bash
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<gerar-com-pnpm-gen-secret>
```

Para gerar um secret seguro:

```bash
pnpm gen:secret
```

Copie o valor gerado para `NEXTAUTH_SECRET`.

## Passo 5: Iniciar os Servidores de Desenvolvimento

```bash
pnpm dev
```

Este comando iniciará todos os aplicativos simultaneamente:
- **Web**: http://localhost:3000
- **API**: http://localhost:3001
- **BFF**: http://localhost:3002

## Passo 6: Verificar a Instalação

### 6.1 Acessar a Web

Abra http://localhost:3000 no navegador. Você deve ver a página inicial.

### 6.2 Acessar a Documentação da API

Abra http://localhost:3001/api/docs para ver a documentação interativa do Swagger.

### 6.3 Testar o Endpoint de Todos

```bash
curl http://localhost:3001/todos
```

Deve retornar uma lista vazia `[]`.

## Comandos Úteis

### Desenvolvimento
```bash
pnpm dev              # Iniciar todos os apps
pnpm build            # Compilar todos os apps
pnpm lint             # Verificar código
pnpm typecheck        # Verificar tipos TypeScript
pnpm test             # Executar testes
```

### Banco de Dados
```bash
pnpm db:migrate       # Executar migrações
pnpm db:studio        # Abrir Prisma Studio (GUI)
```

### Docker
```bash
pnpm docker:up        # Iniciar serviços
pnpm docker:down      # Parar serviços
```

### Gerador de Código
```bash
pnpm agent:generate --spec specs/todo-app.yaml         # Gerar código
pnpm agent:generate --spec specs/todo-app.yaml --dry-run  # Preview
```

## Solução de Problemas

### Erro: "Cannot connect to database"

Verifique se o PostgreSQL está rodando:
```bash
docker ps
```

Se não estiver, inicie-o:
```bash
pnpm docker:up
```

### Erro: "Port 3000 is already in use"

Algum processo está usando a porta. Encontre e pare:

```bash
# Linux/Mac
lsof -i :3000

# Windows
netstat -ano | findstr :3000
```

### Erro: "pnpm: command not found"

Instale o pnpm globalmente:
```bash
npm install -g pnpm
```

### Erro de Dependências

Limpe o cache e reinstale:
```bash
pnpm clean
rm -rf node_modules
pnpm install
```

## Próximos Passos

Agora que você tem tudo configurado:

1. Explore a estrutura do monorepo
2. Leia a [Documentação de Arquitetura](ADR-0001.md)
3. Confira os [Roadmaps](ROADMAP_MACRO.md)
4. Experimente o gerador de código
5. Crie seu primeiro feature!

## Recursos Adicionais

- [Next.js Documentation](https://nextjs.org/docs)
- [NestJS Documentation](https://docs.nestjs.com/)
- [Prisma Documentation](https://www.prisma.io/docs)
- [Turborepo Documentation](https://turbo.build/repo/docs)

## Suporte

Se você encontrar problemas não cobertos neste guia, abra uma issue no GitHub.
