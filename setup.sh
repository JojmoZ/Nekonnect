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

# Step 7: Run Cargo in a new terminal
if command -v gnome-terminal &> /dev/null; then
    gnome-terminal -- bash -c "cd ic-websocket-gateway && cargo run; exec bash"
elif command -v x-terminal-emulator &> /dev/null; then
    x-terminal-emulator -e bash -c "cd ic-websocket-gateway && cargo run; exec bash"
elif command -v xfce4-terminal &> /dev/null; then
    xfce4-terminal --hold --command "bash -c 'cd ic-websocket-gateway && cargo run; exec bash'"
else
    echo "No supported terminal found. Running in background..."
    cd ic-websocket-gateway && cargo run &
fi

# Step 8: Move back to Nekonnect
cd ../

# Step 9: Start OCR backend in a new terminal
if command -v gnome-terminal &> /dev/null; then
    gnome-terminal -- bash -c "
    cd ocr_backend &&
    pip install -r requirements.txt &&
    python -m venv .venv &&
    source ./.venv/bin/activate &&
    python app.py;
    exec bash"
elif command -v x-terminal-emulator &> /dev/null; then
    x-terminal-emulator -e bash -c "
    cd ocr_backend &&
    pip install -r requirements.txt &&
    python -m venv .venv &&
    source ./.venv/bin/activate &&
    python app.py;
    exec bash"
elif command -v xfce4-terminal &> /dev/null; then
    xfce4-terminal --hold --command "bash -c '
    cd ocr_backend &&
    pip install -r requirements.txt &&
    python -m venv .venv &&
    source ./.venv/bin/activate &&
    python app.py;
    exec bash'"
else
    echo "No supported terminal found. Running in background..."
    cd ocr_backend && pip install -r requirements.txt && python -m venv .venv && source ./.venv/bin/activate && python app.py &
fi
