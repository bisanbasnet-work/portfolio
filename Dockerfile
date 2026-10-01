# ==============================================================================
# Dockerfile for Static Portfolio Website (Bisan Basnet)
# Base Image: nginx:alpine (lightweight, secure, production-grade)
# ==============================================================================

FROM nginx:alpine

# Set standard working directory for Nginx static files
WORKDIR /usr/share/nginx/html

# Clean up default Nginx HTML content
RUN rm -rf ./*

# Copy static website files into container
COPY . .

# Expose port 80 for HTTP web traffic
EXPOSE 80

# Health check to verify Nginx is actively serving pages
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost/ || exit 1

# Run Nginx in the foreground (daemon off)
CMD ["nginx", "-g", "daemon off;"]
