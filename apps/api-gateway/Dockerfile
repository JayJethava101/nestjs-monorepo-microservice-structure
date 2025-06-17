# Use the base image
FROM node:20-alpine AS base

# Create app directory
WORKDIR /app

# Install dependencies only when needed
COPY package*.json ./

# Copy TypeScript config files
COPY tsconfig.json ./
COPY tsconfig.build.json ./

# Install dependencies
RUN npm install --legacy-peer-deps

# Copy shared libraries
COPY libs ./libs

# Copy source code
COPY apps/api-gateway ./apps/api-gateway

# Builder stage
FROM base AS builder
ENV NODE_ENV=production

# Build only the api-gateway
RUN cd apps/api-gateway && npm run build

# Production stage
FROM node:20-alpine AS production
ENV NODE_ENV=production

WORKDIR /app

# Copy built assets from builder
COPY --from=builder /app/apps/api-gateway/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Create non-root user
RUN addgroup -g 1001 -S nodejs
RUN adduser -S nestjs -u 1001

# Set proper permissions
RUN chown -R nestjs:nodejs /app

# Switch to non-root user
USER nestjs

# Expose port
EXPOSE 3000

# Health check
HEALTHCHECK --interval=30s --timeout=30s --start-period=5s --retries=3 \
    CMD wget --no-verbose --tries=1 --spider http://localhost:3000/health || exit 1

# Start the application
CMD ["node", "dist/main"] 