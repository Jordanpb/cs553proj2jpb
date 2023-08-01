# Use the official Node.js image as the base
FROM node:14-alpine

# Set the working directory in the container
WORKDIR /app/frontend

# Copy the package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Install nodemon globally to enable live code reloading
RUN npm install -g nodemon

# Copy the frontend source code to the container
COPY . .

# Build the frontend
RUN npm run build

# Expose the port for the frontend (optional if using Nginx or other reverse proxy)
EXPOSE 80

# Start the server (optional if using Nginx or other reverse proxy)
CMD ["npm", "start"]
