# Etapa 1: Build Angular
FROM node:18 AS build

WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# Etapa 2: Servidor de producción
FROM node:18

WORKDIR /app
COPY --from=build /app /app

RUN npm install express

EXPOSE 8080
CMD ["node", "server.js"]
