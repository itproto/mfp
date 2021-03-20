# Specify a base image
FROM node:alpine

WORKDIR /usr/app

# Install some depenendencies
COPY ./package.json ./
RUN npm install -g nodemon
RUN npm install --only=production
COPY ./ ./

RUN npm run build 

EXPOSE 3000

# ENTRYPOINT ["nodemon", "/usr/src/app/server.js"]
# Default command
CMD ["npm", "start"]