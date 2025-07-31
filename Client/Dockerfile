FROM node:22 AS development
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 3000
CMD ["npm", "run", "dev"]

FROM node:22 AS builder
WORKDIR /app
COPY --from=development /app .

COPY vite.config.js .
COPY src/ ./src/
COPY public/ ./public/
RUN npm run build  

FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html


EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]