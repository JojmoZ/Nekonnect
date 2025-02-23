import { RoomService } from "@/services/room.service";
import { webSocket } from "@/utils/config/web-socket"
import { roomDto, roomSchema } from "@/utils/model/dto/create-room.dto";
import { useEffect } from "react";
import { createTracing } from "trace_events";

let roomService = new RoomService();

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
                username : "Wowowo",
                room_id : ""
            }
            webSocket.send(msg);
        } catch (e) {
            console.error(e)
        }
    };

    const createRoom = () => {
        const chatRoom : roomDto = roomSchema.parse({
            room_name : "GUIGI"
        })
        roomService.createRoom(chatRoom)
    }

    useEffect(() => {
        const response = roomService.getRooms().then(res => console.log(res))
        // console.log(response.data)
    },[])


    

    return (
        <div>
            <h1>Chat Page</h1>
            <button onClick={createRoom}>Create Room</button>
        </div>
    );
}