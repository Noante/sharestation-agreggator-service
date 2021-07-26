FROM node:14
WORKDIR /app

COPY gateway-service/package*.json ./
COPY gateway-service/. .

ENV NODE_ENV=LOCAL

RUN npm install && \
    npm install sequelize-cli && \
    chmod +x ./entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]