FROM node:alpine

WORKDIR /usr/app

COPY package.json ./

RUN npm install -g pnpm && pnpm install

COPY . . 

EXPOSE 3333

CMD ["pnpm", "dev"] 