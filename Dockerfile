# Use Node.js 18 as base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy source code
COPY . .

# Build the application
RUN npm run build

# Copy static assets to dist
RUN cp -r style dist/ && \
    cp -r img dist/ && \
    cp -r fonts dist/ && \
    cp -r music dist/ && \
    cp wishes.json dist/

# Expose port 1113
EXPOSE 1113

# Set default port
ENV PORT=1113

# Start the application
CMD ["sh", "-c", "npx serve dist -p ${PORT:-1113}"]