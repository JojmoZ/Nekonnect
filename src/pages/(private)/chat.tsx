import { webSocket } from "@/utils/config/web-socket"

export const ChatPage = () => {
    webSocket.onopen = () => {
        console.log("Connected to WebSocket");
    };

    webSocket.onmessage = (event) => {
        console.log("Received message:", event.data);
    };

    webSocket.onclose = () => {
        console.log("WebSocket connection closed");
    };

    webSocket.onerror = (error) => {
        console.log("WebSocket error:", error);
    };

    const sendMessage = () => {
        try {
            const msg : Message  = {
                message : "Ping",
                username : "Wowowo"
            }
            webSocket.send(msg);
        } catch (e) {
            console.error(e)
        }
    };

    return (
        <div>
            <h1>Chat Page</h1>
            <button onClick={sendMessage}></button>
        </div>
    );
}