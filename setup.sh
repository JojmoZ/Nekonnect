# Step 1: Move to parent directory

sudo fuser -k 5000/tcp
sudo fuser -k 4943/tcp
sudo fuser -k 8080/tcp

# Ensure all processes using these ports are killed
sudo lsof -t -i:5000 | xargs sudo kill -9 2>/dev/null
sudo lsof -t -i:4943 | xargs sudo kill -9 2>/dev/null
sudo lsof -t -i:8080 | xargs sudo kill -9 2>/dev/null

dfx stop
dfx start --clean --background

REPO_URL="https://github.com/omnia-network/ic-websocket-gateway.git"
TARGET_DIR="ic-websocket-gateway"


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
apt install xfce4-terminal

# Step 7: Run Cargo in a new terminal
if command -v xfce4-terminal &> /dev/null; then
    xfce4-terminal --hold --command "bash -c 'cargo run; exec bash'" &
elif command -v gnome-terminal &> /dev/null; then
    gnome-terminal -- bash -c "cargo run; exec bash" &
elif command -v x-terminal-emulator &> /dev/null; then
    x-terminal-emulator -e bash -c "cargo run; exec bash" &
else
    echo "No supported terminal found. Running in background..."
    cargo run &
fi

# Step 8: Move back to Nekonnect
cd ../
sudo apt update
sudo apt install -y python3-pip
sudo apt install python3-venv
sudo apt install -y cmake g++ python3-dev libopenblas-dev liblapack-dev libx11-dev

# Step 9: Start OCR backend in a new terminal
if command -v xfce4-terminal &> /dev/null; then
    xfce4-terminal --hold --command "bash -c '
    cd ocr_backend &&
    python3 -m venv .venv &&
    source ./.venv/bin/activate &&
    pip install -r requirements.txt &&
    python3 app.py;
    exec bash'"
elif command -v gnome-terminal &> /dev/null; then
    gnome-terminal -- bash -c "
    cd ocr_backend &&
    python3 -m venv .venv &&
    source ./.venv/bin/activate &&
    pip install -r requirements.txt &&
    python3 app.py;
    exec bash"
elif command -v x-terminal-emulator &> /dev/null; then
    x-terminal-emulator -e bash -c "
    cd ocr_backend &&
    python3 -m venv .venv &&
    source ./.venv/bin/activate &&
    pip install -r requirements.txt &&
    python3 app.py;
    exec bash"
else
    echo "No supported terminal found. Running in background..."
    cd ocr_backend && python3 -m venv .venv && source ./.venv/bin/activate && pip install -r requirements.txt && python3 app.py &
fi

npm i
dfx canister create --all 
dfx deps pull
dfx deps init rdmx6-jaaaa-aaaaa-aaadq-cai --argument null
dfx deps deploy 

dfx generate
dfx deploy
dfx generate
dfx deploy 
chmod +x ./env_generator.sh 
./env_generator.sh 

