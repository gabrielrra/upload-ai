#!/bin/sh
if [ "$NODE_ENV" = "production" ]; then
  node prisma/seed.js
else
  npx tsx prisma/seed.ts
fi

