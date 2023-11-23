# Use an official Node.js image as a base image
FROM node:20.9.0-alpine3.17

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the container
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code to the container
COPY . .

# Expose the port that the app will run on
EXPOSE 5173

# Command to run the application
CMD ["npm", "start"]
