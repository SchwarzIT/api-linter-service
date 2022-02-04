FROM node:17.3.1 AS builder

RUN mkdir -p /linter && chown -R node:node /linter

WORKDIR /linter

COPY --chown=node:node package*.json /linter/

USER node

RUN npm install

COPY --chown=node:node ./ /linter/

RUN npm run build

FROM node:17.3.1-alpine As production

RUN mkdir -p /linter && chown -R node:node /linter

ENV NODE_ENV=production

WORKDIR /linter

COPY --chown=node:node package*.json /linter/

USER node

RUN npm install --only=production

COPY --from=builder --chown=node:node /linter/dist ./dist/

CMD ["node", "dist/main"]