FROM node:10.15-slim

WORKDIR /usr/src/app

ADD package.json package.json
RUN npm install

ADD . .
RUN npm run build

ENV HOST 0.0.0.0
ENV PORT 8080
EXPOSE 8080

CMD ["npm", "run", "start"]
