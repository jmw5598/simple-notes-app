# Production
FROM node:14 AS builder
RUN mkdir -p /opt/app
WORKDIR /opt/app
COPY package*.json /opt/app/
COPY nginx.conf /opt/app/
RUN npm install
COPY . .
RUN npm run build:libs
RUN npm run build:user
RUN npm run build:admin

FROM nginx:alpine
RUN mkdir -p /usr/share/nginx/app
RUN mkdir -p /usr/share/nginx/admin
COPY --from=builder /opt/app/dist/user/ /usr/share/nginx/html/app/
COPY --from=builder /opt/app/dist/admin/ /usr/share/nginx/html/admin/
COPY --from=builder /opt/app/nginx.conf /etc/nginx/conf.d/default.conf
CMD sed -i -e 's/$PORT/'"$PORT"'/g' /etc/nginx/conf.d/default.conf && nginx -g 'daemon off;'
