FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache openssl

COPY package.json ./
COPY prisma ./prisma

# DEBUG (temporary)
RUN node -v && npm -v \
 && echo "registry=$(npm config get registry)" \
 && npm config list \
 && (env | sort | grep -E 'NPM|HTTP|HTTPS|PROXY|NO_PROXY' || true) \
 && node -e "require('https').request('https://registry.npmjs.org/@prisma%2fclient',{method:'HEAD'},res=>{console.log('npmjs status',res.statusCode);process.exit(res.statusCode>=200&&res.statusCode<500?0:1)}).on('error',e=>{console.error(e);process.exit(1)}).end()"

RUN npm install && npx prisma generate && npx prisma migrate dev

COPY . .

EXPOSE 8080
CMD ["npm", "run", "dev"]
