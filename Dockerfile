FROM node:latest

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY package.json /home/node/app

RUN npm i

COPY . /home/node/app

RUN npm run dev

EXPOSE 7001