# Step 1: Move to parent directory
dfx stop
dfx start --clean --background

REPO_URL="https://github.com/omnia-network/ic-websocket-gateway.git"
TARGET_DIR="ic-websocket-gateway"

# Check if the directory exists
if [ -d "$TARGET_DIR" ] && [ "$(ls -A "$TARGET_DIR")" ]; then
    echo "Repository already exists and has content in $TARGET_DIR."
else
    echo "Cloning repository..."
    git clone "$REPO_URL" "$TARGET_DIR"
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
win_path=$(wslpath -w ~/Nekonnect/ocr_backend)
# Convert WSL path to Windows format
cmd.exe /c start cmd /k "pushd $win_path && wsl --cd ~/Nekonnect/ic-websocket-gateway -- bash -c 'cargo run'"

cmd.exe /c start cmd /k "pushd $win_path && wsl --cd ~/Nekonnect/ocr_backend -- bash -c 'pip install -r requirements.txt && python -m venv .venv && source .venv/bin/activate && python app.py'"
