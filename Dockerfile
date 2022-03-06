# stage 1
FROM node:latest as node
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

# stage 2
FROM nginx:alpine
COPY --from=node /app/dist/wigedev-fitness-log /usr/share/nginx/html

ENV HOST "0.0.0.0"
ENV PORT 80
EXPOSE 80
