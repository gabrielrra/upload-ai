# Build stage
FROM node:20-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
ENV NODE_ENV=production
ENV DATABASE_URL=""
ENV OPEN_API_KEY=""

COPY --from=builder /app/dist ./dist
COPY package*.json ./
RUN npm ci --only=production

# Use non-root user for security
USER node

EXPOSE 3000
CMD ["npm", "start"]
