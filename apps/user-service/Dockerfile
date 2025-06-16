# Stage 1: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY ../../package*.json ./
COPY ../../tsconfig*.json ./
COPY ../../nest-cli.json ./
COPY ../../apps/api-gateway ./apps/api-gateway
COPY ../../apps/user-service ./apps/user-service
COPY ../../libs ./libs
COPY ../../libs/proto/user.proto ./libs/proto/user.proto
RUN ls -l ./libs/proto
RUN npm install --legacy-peer-deps
RUN npm run build:user-service

# Stage 2: Run
FROM node:20-alpine AS runner
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/apps/user-service ./apps/user-service
COPY --from=builder /app/libs ./libs
CMD ["node", "dist/apps/user-service/main.js"] 