# Production Setup Guide

A comprehensive guide to deploy the personal website project in a production environment using Docker containerization.

## Prerequisites

Before you begin, ensure you have the following tools installed on your system:

- **Docker** (version 20.0 or higher recommended)
- **Docker Compose** (optional, for advanced deployment scenarios)

### Installing Prerequisites

If you don't have Docker installed:

1. **Docker**: Download and install from [docker.com](https://www.docker.com/get-started)
2. Verify installation by running:
   ```bash
   docker --version
   docker compose --version
   ```

## Production Deployment

### 1. Clone the Repository

First, clone the project repository to your production server:

```bash
git clone https://github.com/yudhaginongpratidina/personal-website.git
cd personal-website
```

### 2. Build the Docker Image

Build the production-ready Docker image with optimized settings:

```bash
docker build -t nextjs/personal-website:latest .
```

**Build Options:**
- Add `--no-cache` flag to force a fresh build: `docker build --no-cache -t nextjs/personal-website:latest .`
- Tag with version for better deployment management: `docker build -t nextjs/personal-website:v1.0.0 .`

### 3. Run the Docker Container

Deploy the application using Docker with production configuration:

```bash
docker run -d \
    --name personal-website \
    -p 80:5010 \
    -e NEXT_PUBLIC_ENVIRONMENT=production \
    -e NEXT_PUBLIC_BACKEND=https://your-backend-domain.com/api \
    --restart unless-stopped \
    nextjs/personal-website:latest
```

#### Command Breakdown

| Flag | Description |
|------|-------------|
| `-d` | Run container in detached mode (background) |
| `--name personal-website` | Assign a name to the container for easy management |
| `-p 80:5010` | Map host port 80 to container port 5010 |
| `-e` | Set environment variables |
| `--restart unless-stopped` | Automatically restart container if it stops |

### 4. Environment Configuration

#### Environment Variables Reference

| Variable | Description | Example | Required |
|----------|-------------|---------|----------|
| `NEXT_PUBLIC_ENVIRONMENT` | Deployment environment mode | `production` | Yes |
| `NEXT_PUBLIC_BACKEND` | Backend API endpoint URL | `https://api.yourdomain.com/v1` | Yes |

#### Production Environment Variables Example

```bash
# Replace with your actual production values
NEXT_PUBLIC_ENVIRONMENT=production
NEXT_PUBLIC_BACKEND=https://api.yourdomain.com/v1
```

**Important**: Use HTTPS URLs for production backend endpoints to ensure secure communication.

## Container Management

### Essential Docker Commands

```bash
# View running containers
docker ps

# View container logs
docker logs personal-website

# Follow live logs
docker logs -f personal-website

# Stop the container
docker stop personal-website

# Start the container
docker start personal-website

# Restart the container
docker restart personal-website

# Remove the container
docker rm personal-website

# Remove the image
docker rmi nextjs/personal-website:latest
```

### Health Check

Verify that your application is running correctly:

```bash
# Check if the container is running
docker ps | grep personal-website

# Test the application endpoint
curl http://localhost

# Check container resource usage
docker stats personal-website
```

## Monitoring and Maintenance

### Log Management

```bash
# View recent logs
docker logs --tail 100 personal-website

# Export logs to file
docker logs personal-website > app.log 2>&1
```

### Updates and Deployment

To deploy a new version:

```bash
# Pull latest code
git pull origin main

# Rebuild image
docker build -t nextjs/personal-website:latest .

# Stop current container
docker stop personal-website

# Remove old container
docker rm personal-website

# Run new container
docker run -d \
    --name personal-website \
    -p 5010:5010 \
    -e NEXT_PUBLIC_ENVIRONMENT=production \
    -e NEXT_PUBLIC_BACKEND=https://your-backend-domain.com/api \
    --restart unless-stopped \
    nextjs/personal-website:latest
```