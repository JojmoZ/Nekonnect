import { idlFactory , canisterId } from "@/declarations/user";
import { webSocket } from "@/utils/config/web-socket"
import { Actor, HttpAgent } from "@dfinity/agent";
import { useNavigate } from "react-router";
interface LoginPageProps {
  setUsername: (username: any) => void;
}
export const ChatPage: React.FC<LoginPageProps> = ({setUsername}) => {
    const navigate = useNavigate();
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
    const handleLogout = async () => {
        try {
          const agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });
          await agent.fetchRootKey();
    
          const backend = Actor.createActor(idlFactory, { agent, canisterId });
    
          await backend.logout();
          setUsername(null); // Clear user in frontend state
          navigate('/login');
        } catch (err) {
          console.error('Logout Error:', err);
        }
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

        <button onClick={handleLogout}>Logout</button>
      </div>
    );
}