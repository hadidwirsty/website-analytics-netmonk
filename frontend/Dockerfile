FROM node:16-alpine

WORKDIR /app

COPY package* .
COPY .npmrc .
RUN npm install

COPY .env .env
COPY . .

CMD [ "npm", "run", "start" ]
