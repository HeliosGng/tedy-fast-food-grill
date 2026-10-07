# Multi-stage Dockerfile optimized for Google Cloud Run
FROM node:22-alpine AS builder

WORKDIR /app

# Copy dependency definitions
COPY package*.json ./

# Install dependencies (including build tools)
RUN npm ci

# Copy application source
COPY . ./

# Build production client bundle
RUN npm run build

# Runner stage: minimal production image
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV PORT=8080

# Copy package definitions
COPY package*.json ./

# Install production dependencies only
RUN npm ci --omit=dev

# Copy built distribution assets and server
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/server.js ./server.js

# Expose port (Cloud Run sets $PORT environment variable at runtime)
EXPOSE 8080

# Launch server
CMD ["node", "server.js"]
