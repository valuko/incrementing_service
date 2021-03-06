FROM node:12-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json /usr/src/app/
RUN npm install --only=production
COPY . /usr/src/app
EXPOSE 5000
CMD [ "npm", "run", "start" ]
