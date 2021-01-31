FROM node:15-alpine
USER node

RUN mkdir -p /home/node/app
WORKDIR /home/node/app

# RUN apk update && apk --no-cache add --virtual builds-deps build-base python 

COPY --chown=node:node package*.json /home/node/app/

RUN npm install
#RUN npm rebuild bcrypt --build-from-source

CMD ["npm", "run", "dev"]
