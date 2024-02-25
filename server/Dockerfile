FROM node:20-slim
WORKDIR /usr/src/app

COPY --chown=node:node . .
RUN npm install --production

USER node

EXPOSE 3000
CMD npm start
