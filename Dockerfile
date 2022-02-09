FROM node:14
WORKDIR /app

COPY sharestation-gateway-service/package*.json ./
COPY sharestation-gateway-service/. .

ENV NODE_ENV=PROD
ENV EXPRESS_PORT=3000
ENV EXPIRES=300
ENV KEY=testjwt
ENV DATABASE_URL=postgres://postgres:bcd@247@db:5432/db_sharestation
ENV FILE_SERVICE_LOCAL=http://localhost:3001/
ENV FILE_SERVICE_PROD=http://file-service:3001/
ENV USER_SERVICE_LOCAL=http://localhost:3002/
ENV USER_SERVICE_PROD=http://user-service:3002/
ENV EMAIL_SERVICE_LOCAL=http://localhost:3003/
ENV EMAIL_SERVICE_PROD=http://email-service:3003/

RUN npm install && \
    npm install sequelize-cli && \
    chmod +x ./entrypoint.sh && \
    chmod +x ./wait-for-it.sh

EXPOSE 3000
ENTRYPOINT ["./wait-for-it.sh", "db:5432", "--", "./entrypoint.sh"]