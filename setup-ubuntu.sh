wsl --install -d Ubuntu

sudo apt update && sudo apt upgrade -y
sudo apt install nodejs npm -y
curl -fsSL https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"


sh -ci "$(curl -fsSL https://internetcomputer.org/install.sh)"
source "$HOME/.local/share/dfx/env"
nvm install 22
nvm use 22

sudo apt install cargo
echo 'export PATH="$HOME/.cargo/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
unset npm_config_prefix
rustup update

sudo apt install rustup
sudo apt install cargo
rustup update

npm install -g ic-mops
npm install -g typescript

