# Production
FROM node:12.8.1 AS builder
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package*.json /opt/app/
COPY nginx.conf /opt/app/
RUN npm install
COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=builder /opt/app/dist/client/ /usr/share/nginx/html
COPY --from=builder /opt/app/nginx.conf /etc/nginx/conf.d/default.conf
# ENTRYPOINT ["nginx", "-g", "daemon off;"]
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'

