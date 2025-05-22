# Use Ubuntu 24.04 LTS as base image
FROM ubuntu:24.04

# Set environment variable to avoid interactive prompts
ENV DEBIAN_FRONTEND=noninteractive

# Install Node.js 20 and npm
RUN apt update && \
    apt install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt install -y nodejs && \
    apt clean

# Set NODE_PATH to ensure global modules are accessible
ENV NODE_PATH=/usr/lib/node_modules
RUN export NODE_PATH=/usr/lib/node_modules 
RUN curl -o- "https://dl-cli.pstmn.io/install/linux64.sh" | sh -x

# ENV PATH=$PATH:/usr/lib/node_modules/.bin    
# Install htmlextra reporter globally
RUN npm install -g newman-reporter-htmlextra jest-html-reporter


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
