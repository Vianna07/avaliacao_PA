FROM node:20-alpine

WORKDIR /app

COPY . ./server

WORKDIR /app/server

RUN npm install -g pnpm@9
RUN pnpm install

CMD [ "pnpm", "start" ]

# Build: docker build -t weather-app-image .
# Run: docker run --name weather-app weather-app-image
