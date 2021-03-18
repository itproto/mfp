# Specify a base image
FROM node:alpine

WORKDIR /usr/app

# Install some depenendencies
COPY ./package.json ./
RUN npm install -g nodemon
RUN npm install --silent
COPY ./ ./

RUN npm run build 

# ENTRYPOINT ["nodemon", "/usr/src/app/server.js"]
# Default command
CMD ["npm", "run", "dev:watch"]