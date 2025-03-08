#!/bin/bash

# Step 1: Move to parent directory
dfx stop
dfx start --clean --background

# Step 2: Clone repository
git clone https://github.com/omnia-network/ic-websocket-gateway.git

# Step 3: Enter repository directory
cd ic-websocket-gateway

# Step 4-6: Install Rust and update it
sudo apt install -y cargo
sudo apt install -y rustup
rustup update stable

# Step 7-8: Install dependencies
sudo apt update
sudo apt install -y pkg-config libssl-dev

# Step 9: Run Cargo in a new terminal
gnome-terminal -- bash -c "
cd ic-websocket-gateway &&
cargo run;
exec bash"

# Step 10: Move to Nekonnect
cd ../

# Step 11-14: Start dfx, setup, and deploy
gnome-terminal -- bash -c "
cd ocr_backend &&
pip install -r requirements.txt &&
python -m venv .venv &&
source ./.venv/bin/activate &&
python app.py;
exec bash"
