FROM node:20-alpine AS base
RUN corepack enable && corepack prepare pnpm@8.15.0 --activate
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-workspace.yaml pnpm-lock.yaml* ./
COPY apps/bff/package.json ./apps/bff/
RUN pnpm install --frozen-lockfile

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm --filter @monorepo/bff build

FROM base AS runner
ENV NODE_ENV production
COPY --from=builder /app/apps/bff/dist ./apps/bff/dist
COPY --from=builder /app/apps/bff/node_modules ./apps/bff/node_modules
COPY --from=builder /app/apps/bff/package.json ./apps/bff/
WORKDIR /app/apps/bff
EXPOSE 3002
CMD ["node", "dist/main"]
