# Use an official Node.js runtime as the base image
FROM node:17

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the entire React app source code into the working directory
COPY . .

# Build the React app using Vite
RUN npm run build

# Expose the port that your React app will run on (default is 3000)
EXPOSE 3000

# Start the React app when the container starts
CMD ["npm", "run", "serve"]
