FROM node:20 as BUILD

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:20

WORKDIR /app

COPY --from=build /app/dist /app/dist

COPY package*.json ./

RUN npm ci

EXPOSE 3000

CMD ["npm", "run", "start:prod"]
