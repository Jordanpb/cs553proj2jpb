# Use the official Node.js image as the base
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app/rest-server

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally to enable live code reloading
RUN npm install -g nodemon

# Copy the backend source code to the container
COPY . .

# Expose the port the server will listen on
EXPOSE 3000

# Start the server
CMD ["node", "rest-server.js"]