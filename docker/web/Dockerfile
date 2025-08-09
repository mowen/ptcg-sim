FROM node:24 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
RUN pnpm install -g typescript
RUN pnpm install -g nodemon 

# COPY --exclude=node_modules --exclude=docker . /app
COPY . /app
RUN rm -rf /app/node_modules 
RUN rm -rf /app/client/node_modules
RUN rm -rf /app/server/node_modules

WORKDIR /app
RUN pnpm clean

FROM base AS prod-deps
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --prod --frozen-lockfile

FROM base AS build
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run build

FROM base
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=prod-deps /app/client/node_modules /app/client/node_modules
COPY --from=prod-deps /app/server/node_modules /app/server/node_modules
COPY --from=build /app/client/dist /app/client/dist
COPY --from=build /app/server/dist /app/server/dist

CMD [ "pnpm", "start" ]