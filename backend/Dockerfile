FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package.json ./
COPY prisma ./prisma

# DEBUG (temporary)
RUN node -v && npm -v \
 && echo "registry=$(npm config get registry)" \
 && npm config list \
 && env | sort | grep -E 'NPM|HTTP|HTTPS|PROXY|NO_PROXY' || true \
 && curl -I https://registry.npmjs.org/@prisma%2fclient

RUN npm install && npx prisma generate

COPY . .

EXPOSE 8080
CMD ["npm", "run", "dev"]
