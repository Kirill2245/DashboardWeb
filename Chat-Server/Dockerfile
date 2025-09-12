FROM node:22
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 5001
CMD ["npm", "start"]  