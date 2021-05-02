# Production 
FROM node:12.8.1 AS builder
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package*.json ./
COPY .env.prod ./.env
RUN npm install
COPY . .
RUN npm run build
RUN npm run migration:run


FROM node:12.8.1 AS production
RUN mkdir -p /opt/app/dist
WORKDIR /opt/app
COPY --from=builder /opt/app/ ./
CMD ["npm", "run", "start:docker:prod"]
