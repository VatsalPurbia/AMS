FROM node:18.16.0-alpine

WORKDIR /app/test

COPY package*.json ./

RUN npm i

COPY . . 

ENV PORT = 3000

EXPOSE 3000


CMD ["npm" , "start"] 