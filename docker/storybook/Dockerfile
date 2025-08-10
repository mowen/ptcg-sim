FROM node:24 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN pnpm install -g typescript

# COPY --exclude=node_modules --exclude=docker . /app
COPY . /app
RUN rm -rf /app/node_modules /app/client/node_modules /app/server/node_modules

WORKDIR /app
RUN pnpm clean

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm -C client run build-storybook

FROM nginx as deploy
COPY --from=build /app/client/storybook-static /usr/share/nginx/html
