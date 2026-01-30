FROM node as base

FROM base as development

WORKDIR /dest

COPY package.json .

RUN npm install

COPY . .

ENV PORT=4000

EXPOSE ${PORT}

CMD [ "npm", "run" , "start-dev" ]


FROM base as production

WORKDIR /dest

COPY package.json .

RUN npm install --only=production

COPY . .

ENV PORT=4000

EXPOSE ${PORT}

CMD [ "npm", "run" , "start" ]