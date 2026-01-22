FROM python:3.11-alpine

RUN apk add --no-cache curl netcat-openbsd

WORKDIR /app

EXPOSE 8080

CMD ["python", "-m", "http.server", "8080"]
