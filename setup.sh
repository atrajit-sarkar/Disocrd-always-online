#!/bin/bash
set -e

echo "=== Discord Always Online - AWS Setup ==="

# Update system packages
echo "[1/5] Updating system packages..."
sudo apt-get update -y && sudo apt-get upgrade -y

# Install Node.js (LTS) via NodeSource
echo "[2/5] Installing Node.js LTS..."
if ! command -v node &> /dev/null; then
    curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
    sudo apt-get install -y nodejs
else
    echo "Node.js already installed: $(node -v)"
fi

# Install build tools (needed for native npm modules)
echo "[3/5] Installing build essentials..."
sudo apt-get install -y build-essential

# Install npm dependencies
echo "[4/5] Installing npm dependencies..."
cd "$(dirname "$0")"
npm install

# Verify .env exists
if [ ! -f .env ]; then
    echo ""
    echo "WARNING: No .env file found!"
    echo "Create one with your tokens:"
    echo "  TOKEN_1=your_token_here"
    echo "  TOKEN_2=your_token_here"
    echo ""
fi

# Start the bot using pm2 for persistence
echo "[5/5] Setting up pm2 for auto-restart..."
if ! command -v pm2 &> /dev/null; then
    sudo npm install -g pm2
fi

pm2 stop discord-online 2>/dev/null || true
pm2 start main.js --name discord-online
pm2 save
pm2 startup | tail -1 | sudo bash 2>/dev/null || true

echo ""
echo "=== Setup Complete ==="
echo "Bot is running via pm2."
echo "Useful commands:"
echo "  pm2 logs discord-online   - View logs"
echo "  pm2 restart discord-online - Restart bot"
echo "  pm2 stop discord-online    - Stop bot"
echo "  pm2 status                 - Check status"
