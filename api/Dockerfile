FROM node:22-alpine

WORKDIR /app

ENV NODE_ENV=development
COPY package*.json ./
RUN npm install
COPY . .

EXPOSE 3000
ENTRYPOINT [ "./scripts/entrypoint.sh" ]
