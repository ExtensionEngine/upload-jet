FROM node:20 AS base
RUN npm i -g pnpm

FROM base AS dependencies
WORKDIR /app
COPY . .
RUN pnpm install

FROM dependencies as build
RUN pnpm run --filter="./packages/**" -r  build
RUN pnpm run --filter="./upload-jet" build

FROM build as pruned
WORKDIR /app
RUN pnpm --filter "./upload-jet" deploy pruned

FROM base as deploy
WORKDIR /app
ENV NODE_ENV=production
COPY --from=pruned /app/pruned/dist ./dist
COPY --from=pruned /app/pruned/node_modules node_modules
COPY --from=pruned /app/pruned/package.json .
EXPOSE 3000
CMD ["pnpm", "start:prod"]
