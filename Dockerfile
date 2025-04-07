# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies and serve globally
RUN yarn install --frozen-lockfile && npm install -g serve

# Copy all files
COPY . .

# Build the application
RUN yarn build

# Expose port 5173
EXPOSE 5173

# Start the application using serve
CMD ["serve", "-s", "dist", "-l", "5173"]