# Stage 1: Build React application
FROM node:22-alpine AS build

# Create application directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy project files
COPY . .

# Create production build
RUN npm run build


# Stage 2: Serve React using Nginx
FROM nginx:alpine

# Copy Vite build files to Nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]