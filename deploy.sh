#!/bin/bash

# Navigate to project directory
cd /var/www/WeSmart

# Pull latest changes from the main branch
git pull origin main

# Rebuild and restart Docker containers
docker-compose up -d --build

echo "Deployment completed successfully."
