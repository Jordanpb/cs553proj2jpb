# Use the official Node.js image
FROM node:14

# Set the working directory
WORKDIR /app/soap-server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the application files
COPY . .

# Expose the server port
EXPOSE 8000

# Start the server
CMD ["node", "soap-server.js"]