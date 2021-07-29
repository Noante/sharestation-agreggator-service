FROM node:14
WORKDIR /app

COPY sharestation-gateway-service/package*.json ./
COPY sharestation-gateway-service/. .

ENV NODE_ENV=PROD

RUN npm install && \
    npm install sequelize-cli && \
    chmod +x ./entrypoint.sh

EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]