# syntax=docker/dockerfile:1

FROM node:20-alpine AS base
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1

FROM base AS deps
RUN apk add --no-cache libc6-compat
COPY package*.json ./
RUN npm ci

FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NODE_ENV=production
RUN npm run build

FROM base AS prod-deps
COPY package*.json ./
RUN npm ci --omit=dev

FROM base AS runner
ENV NODE_ENV=production
RUN addgroup -g 1001 -S nodejs \
  && adduser -S nextjs -u 1001

# Copy production dependencies only
COPY --from=prod-deps /app/node_modules ./node_modules

# Copy built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY package*.json ./

EXPOSE 3000
USER nextjs
CMD ["npm", "run", "start"]
