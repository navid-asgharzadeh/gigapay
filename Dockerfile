FROM node:lts AS builder
WORKDIR /app
COPY . .
RUN yarn
RUN npx prisma generate
RUN yarn build
RUN rm -rf node_modules
RUN yarn install --production


FROM node:lts AS runner
ENV NODE_ENV production
WORKDIR /app
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/yarn.lock ./yarn.lock
EXPOSE 3000
CMD ["yarn", "start"]

