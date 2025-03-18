#!/bin/sh

START_COMMAND="npm run start:prod"

if [ "$NODE_ENV" != "production" ]; then
  START_COMMAND="npm run dev"
fi

npx prisma generate
npx prisma migrate dev

exec $START_COMMAND
