#!/bin/bash

# Get optional commit message suffix from the first argument
suffix="$1"

# Generate default commit message with date/time
datetime=$(date +"%Y-%m-%d %H:%M:%S")
commit_msg="$datetime"

# If suffix provided, append it
if [ -n "$suffix" ]; then
  commit_msg="$commit_msg - $suffix"
fi

echo "Committing with message: \"$commit_msg\""

# Stage all changes
git add .

# Commit with message
git commit -m "$commit_msg"

# Push to origin main
git push origin main

# SSH to server and pull latest
ssh fiona_server 'cd /volume1/docker/lambda-house/ && git pull origin main'
