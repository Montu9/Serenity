FROM node:21-alpine

WORKDIR /app

COPY package.json .

RUN npm install --verbose

COPY . .

RUN npm run build

EXPOSE 5173

CMD [ "npm", "run", "preview" ]