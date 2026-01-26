FROM node:18-alpine

WORKDIR /workspace

COPY package.json package-lock.json ./
COPY backend/package.json backend/package.json
COPY web-dashboard/package.json web-dashboard/package.json

RUN npm install

COPY . .

WORKDIR /workspace/web-dashboard

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0", "--port", "5173"]
