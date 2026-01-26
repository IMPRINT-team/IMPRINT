FROM node:18-alpine

COPY package.json package-lock.json ./
COPY backend/package.json backend/package.json
COPY web-dashboard/package.json web-dashboard/package.json

COPY package.json package-lock.json* ./
RUN npm install

COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
