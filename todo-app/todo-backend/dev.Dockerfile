FROM node:24 AS build-stage
WORKDIR /usr/src/app
COPY . .
RUN npm install
CMD ["npm", "run", "dev"]