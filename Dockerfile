FROM node:16.13.2

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000
CMD ["yarn", "start:dev"]
