#!/bin/bash

# Push local changes to origin main
git push origin main

# SSH to server and pull latest changes
ssh fiona_server 'cd /volume1/docker/lambda-house/frontend/src && git pull origin main'
