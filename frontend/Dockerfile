FROM node:15-alpine
USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

COPY --chown=node:node package*.json /home/node/app/

RUN npm ci

CMD ["npm", "start"]
