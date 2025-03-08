win_path=$(wslpath -w ~/Nekonnect/ocr_backend)
cmd.exe /c start cmd /k "pushd $win_path && wsl --cd ~/Nekonnect/ocr_backend"
