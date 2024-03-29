FROM node:lts as builder

WORKDIR /app

COPY . .

RUN yarn install \
  --prefer-offline \
  --frozen-lockfile \
  --non-interactive \
  --production=false

RUN yarn build

RUN rm -rf node_modules && \
  NODE_ENV=production yarn install \
  --prefer-offline \
  --pure-lockfile \
  --non-interactive \
  --production=true

FROM node:lts

WORKDIR /app

COPY --from=builder /app  .

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=80
ENV BASE_URL=$BASE_URL


ENV HOST 0.0.0.0
EXPOSE 80

CMD [ "yarn", "start" ]