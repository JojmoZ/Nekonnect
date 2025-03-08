#!/bin/bash

# Step 1: Move to parent directory
dfx stop
dfx start --clean --background

REPO_URL="https://github.com/omnia-network/ic-websocket-gateway.git"
TARGET_DIR="ic-websocket-gateway"

# Check if the directory exists
if [ -d "$TARGET_DIR" ]; then
    echo "Repository already exists in $TARGET_DIR."
else
    echo "Cloning repository..."
    git clone "$REPO_URL"
fi

# Step 3: Enter repository directory
cd ic-websocket-gateway

# Step 4: Install Rust via `rustup`
if ! command -v rustup &> /dev/null; then
    echo "Rustup not found. Installing now..."
    curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
    source "$HOME/.cargo/env"
fi

# Step 5: Ensure Rust is updated
rustup update stable

# Step 6: Install dependencies
sudo apt update
sudo apt install -y pkg-config libssl-dev

cmd.exe /c start /k "cd ic-websocket-gateway && cargo run"
cd ../
cmd.exe /k start /c "cd ocr_backend && pip install -r requirements.txt && python -m venv .venv && source ./.venv/bin/activate && python app.py" 

