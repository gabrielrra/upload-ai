FROM node:22-alpine

ARG DATABASE_URL
ENV DATABASE_URL=$DATABASE_URL
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

EXPOSE 3000

RUN npm run prisma:init

CMD ["npm", "run", "dev"]
