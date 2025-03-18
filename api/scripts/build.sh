#!/bin/sh

npx tsc
cp -r prisma/migrations dist/prisma
cp -r prisma/schema.prisma dist/prisma
