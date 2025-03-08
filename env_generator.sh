WS_IP=$(ip -4 addr show eth0 | grep -oP '(?<=inet\s)\d+(\.\d+){3}')
grep -qxF "VITE_WS_GATEWAY_URL='ws://$WS_IP:8080'" .env || echo "VITE_WS_GATEWAY_URL='ws://$WS_IP:8080'" >> .env
grep -qxF "VITE_IC_NETWORK_URL='http://127.0.0.1:4943'" .env || echo "VITE_IC_NETWORK_URL='http://127.0.0.1:4943'" >> .env
grep -qxF "VITE_II_NETWORK='ic'" .env || echo "VITE_II_NETWORK='ic'" >> .env
