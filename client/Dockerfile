FROM node:20-alpine as builder

WORKDIR /app/client

COPY . .

RUN npm install -g pnpm@9
RUN pnpm install
RUN pnpm run build

FROM nginx:1.25-alpine

COPY --from=builder /app/client/dist usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
COPY mime.types /etc/nginx/mime.types

RUN rm -rf /app/client

CMD [ "nginx", "-g", "daemon off;"]
