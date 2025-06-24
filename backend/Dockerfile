# Use the official Node.js Alpine image for a smaller size
FROM node:alpine

# Create a non-root user 'app' and group 'app'
RUN addgroup -S app && adduser -S -G app app

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json for npm install
COPY package*.json ./

# Change ownership of /app to 'app' user and group
RUN chown -R app:app /app

# Switch to non-root user 'app'
USER app

# Install dependencies
RUN npm install

# Copy all project files to the container
COPY --chown=app:app . .

# Expose port 8000
EXPOSE 8000

# Start the application
CMD ["npm", "start"]
