# stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build:prod

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/wigedev-fitness-log /usr/share/nginx/html

ENV PORT 80
ENV HOST 0.0.0.0
