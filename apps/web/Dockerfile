FROM node:24.14.0-bookworm-slim AS base

ENV PNPM_HOME="/pnpm" \
    PATH="/pnpm:${PATH}"

RUN corepack enable && corepack prepare pnpm@11.9.0 --activate

WORKDIR /workspace

FROM base AS dependencies

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY apps/web/package.json apps/web/package.json
RUN pnpm install --frozen-lockfile --filter @agentic-ml/web...

FROM dependencies AS builder

COPY apps/web ./apps/web
RUN pnpm --filter @agentic-ml/web build

FROM node:24.14.0-bookworm-slim AS runner

ENV HOSTNAME="0.0.0.0" \
    NODE_ENV="production" \
    NEXT_TELEMETRY_DISABLED=1 \
    PORT=3000

WORKDIR /workspace

COPY --from=builder --chown=node:node /workspace/apps/web/.next/standalone ./
COPY --from=builder --chown=node:node /workspace/apps/web/.next/static ./apps/web/.next/static

USER node

EXPOSE 3000

CMD ["node", "apps/web/server.js"]
