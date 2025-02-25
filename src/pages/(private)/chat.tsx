import { idlFactory , canisterId } from "@/declarations/user";
import { Actor, HttpAgent } from "@dfinity/agent";
import { useNavigate } from "react-router";
import { _SERVICE, Message } from "@/declarations/message/message.did";
import { RoomUserService } from "@/services/room-users.service";
import { RoomService } from "@/services/room.service";
import { UserService } from "@/services/user.service";
import { roomDto, roomSchema } from "@/lib/model/dto/create-room.dto";
import IcWebSocket, { generateRandomIdentity } from "ic-websocket-js";
import { useEffect, useState } from "react";
import { getWebSocket } from "@/lib/config/web-socket";
import { AuthClient } from "@dfinity/auth-client";
import { get } from "http";
import { W } from "react-router/dist/development/fog-of-war-Cm1iXIp7";

let roomService = new RoomService();
let userService = new UserService();
let roomUserService = new RoomUserService();


interface LoginPageProps {
  setUsername: (username: any) => void;
}
  
 export const ChatPage: React.FC<LoginPageProps> = ({setUsername}) => {
    const navigate = useNavigate();
   
    

    const handleLogout = async () => {
        try {
        //   const agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });
        //   await agent.fetchRootKey();
    
        //   const backend = Actor.createActor(idlFactory, { agent, canisterId });
    
        //   await backend.logout();
        //   const authClient = await AuthClient.create();
        //     authClient.logout();
        //   setUsername(null); // Clear user in frontend state
        //   navigate('/login');
            await userService.logout()
        } catch (err) {
          console.error('Logout Error:', err);
        }
      };

    const [socket,setSocket] = useState<any>(null);

    const sendMessage = async () => {
        const principal = await userService.getCallerPrincipal();
        console.log(principal.toString())
        try {
            const msg : Message = {
                message : "Ping",
                room_id : "af6dc03e-d335-423a-9aa5-190a1daa5d80",
                created_at : BigInt(new Date().getTime()),
                user_id : principal
            }
            try {
                if (socket && socket.readyState === WebSocket.OPEN) {
                    socket.send(msg);
                    console.log("Message sent:", msg);
                } else {
                    console.error("WebSocket is not open. Cannot send message.");
                }
            } catch (error) {
                console.error("Error sending message:", error);
            }
        } catch (e) {
            console.error(e)
        }
    };

    const joinRoom = async() => {
        const principal = await userService.getCallerPrincipal();
        console.log(principal.toString())
        const response = await roomService.joinRoom("af6dc03e-d335-423a-9aa5-190a1daa5d80",principal);
        console.log(response)
        const response2 = await roomUserService.getByRoomIdAndUserId("af6dc03e-d335-423a-9aa5-190a1daa5d80",principal);
        console.log(response2)
        const response3 = await roomUserService.getAllUsersByRoomId("af6dc03e-d335-423a-9aa5-190a1daa5d80");
        response3.map((user) => console.log(user.user_id.toString()))
    }

    const createRoom = async () => {
        const chatRoom : roomDto = roomSchema.parse({
            room_id : 'af6dc03e-d335-423a-9aa5-190a1daa5d80',
            room_name : "GUIGI"
        })
        roomService.createRoom(chatRoom)
        const response = await roomUserService.userJoinRoom("af6dc03e-d335-423a-9aa5-190a1daa5d80", await userService.getCallerPrincipal());
        console.log(response)

    }

    const getSocket = async () => {
        if (socket === null) {
            const response = await getWebSocket(await userService.getCallerIdentity());
            console.log(response)

            response.onopen = () => {
                console.log("Connected")
            }

            response.onclose = () => {
                console.log("Disconnected")
            }

            response.onmessage = (event : any) => {
                console.log("Message")
                console.log(event.data)
            }

            response.onerror = (error : any) => {
                console.log(error)
            }
            setSocket(response)
        }
    }

    


    useEffect(() => {
        const response = roomService.getRooms().then(res => {
            console.log(res)

        })
        getSocket();
        
    },[])


    

    return (
      <div>
        <h1>Chat Page</h1>
        <div>
            <h1>Chat Page</h1>
            <button onClick={() => createRoom()}>Create Room</button>
            <button onClick={() => joinRoom()}>Join Room</button>
            <button onClick={sendMessage}>Send</button>
        </div>
        <button onClick={sendMessage}></button>

        <button onClick={handleLogout}>Logout</button>
      </div>


    );
}