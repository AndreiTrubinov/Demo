# # Install dependencies only when needed
FROM node:16.10-alpine AS builddeps
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
# COPY package.json yarn.lock ./
#COPY usernpmdotdir/ /root/.npm/
COPY package.json package-lock.json ./
# COPY package.json ./
# COPY node_modules ./node_modules
RUN npm install
#RUN npm install --platform=linux --arch=x64 sharp
RUN npm install sharp


FROM node:16.10-alpine AS rundeps
# # Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app
# COPY package.json yarn.lock ./
#COPY usernpmdotdir/ /root/.npm/
COPY package.json package-lock.json ./
RUN npm install --production --frozen-lockfile --ignore-scripts --prefer-offline
#RUN npm install --platform=linux --arch=x64 sharp
RUN npm install sharp


# # Rebuild the source code only when needed
FROM node:16.10-alpine AS builder
WORKDIR /app
#COPY ./node_modules ./node_modules
COPY . .

COPY --from=builddeps /app/node_modules ./node_modules

ENV NEXT_TELEMETRY_DISABLED 1
RUN npm run build --verbose
RUN rm -Rf node_modules
COPY --from=rundeps /app/node_modules ./node_modules

# Production image, copy all the files and run next
FROM node:16.10-alpine AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json
COPY --from=builder --chown=nextjs:nodejs /app/package-lock.json ./package-lock.json
COPY --from=builder --chown=nextjs:nodejs /app/next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/next-i18next.config.js ./
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

# #COPY --from=rundeps --chown=nextjs:nodejs /app/node_modules ./node_modules
# COPY --chown=nextjs:nodejs node_modules ./node_modules
# COPY --chown=nextjs:nodejs package.json ./package.json
# COPY --chown=nextjs:nodejs package-lock.json ./package-lock.json
# COPY --chown=nextjs:nodejs next.config.js ./
# COPY --chown=nextjs:nodejs next-i18next.config.js ./
# COPY --chown=nextjs:nodejs public ./public
# COPY --chown=nextjs:nodejs .next ./.next

# COPY --from=builder /app/node_modules ./node_modules
# COPY ./package.json ./package.json
# COPY ./package-lock.json ./package-lock.json
# COPY ./next.config.js ./
# COPY ./next-i18next.config.js ./
# COPY ./public ./public

# COPY . .
# RUN npm install --platform=linux --arch=x64 sharp

# COPY --chown=nextjs:nodejs --chmod=0777 ./.next ./.next

#RUN chmod -Rf 0777 ./.next


USER nextjs

EXPOSE 3000

ENV PORT 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
ENV NEXT_TELEMETRY_DISABLED 1

# CMD ["node_modules/.bin/next", "start"]
CMD ["npm", "run", "start"]
