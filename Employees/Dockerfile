FROM node:16.14-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install


COPY . .

RUN npm run generate

EXPOSE 3000

ENTRYPOINT [ "npm", "start" ]