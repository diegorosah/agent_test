#!/bin/bash

# Script to generate a secure random secret for NEXTAUTH_SECRET
# Usage: ./scripts/generate-secret.sh

echo "Generating secure random secret..."
echo ""
echo "NEXTAUTH_SECRET=\"$(openssl rand -base64 32)\""
echo ""
echo "Copy the line above to your apps/web/.env.local file"
echo "Use the same value for JWT_SECRET in apps/api/.env and apps/bff/.env"
