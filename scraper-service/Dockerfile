FROM node:20-alpine

RUN mkdir -p /app

WORKDIR /app

COPY package*.json ./

RUN npm ci

COPY . /app

RUN npm run build

EXPOSE ${SCRAPER_SERVICE_PORT}

CMD [ "npm", "run", "start" ]