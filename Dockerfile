# Use Ubuntu 24.04 LTS as base image
FROM ubuntu:24.04

# Set environment variable to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js 20 and npm
RUN apt update && \
    apt install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt install -y nodejs && \
    apt clean && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy package.json and install local dependencies (including newman if needed)
COPY package*.json ./
RUN npm install

# Copy source code
COPY . .

# Expose the application port
EXPOSE 3000

# Start the app
CMD ["node", "index.js"]
