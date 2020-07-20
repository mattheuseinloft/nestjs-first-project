FROM node:10

WORKDIR /usr/src/app

COPY package*.json ./

# Install production dependencies.
RUN npm i

# Copy local code to the container image.
COPY . .

RUN npm run build

# Run the web service on container startup.
CMD [ "npm", "run", "start:prod" ]