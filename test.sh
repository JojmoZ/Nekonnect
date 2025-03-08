win_path=$(wslpath -w ~/Nekonnect/ocr_backend)
# Convert WSL path to Windows format
cmd.exe /c start cmd /k "pushd $win_path && wsl --cd ~/Nekonnect/ic-websocket-gateway -- bash -c 'cargo run'"
