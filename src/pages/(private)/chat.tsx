import { Message } from "@/declarations/message/message.did";
import { RoomUserService } from "@/services/room-users.service";
import { RoomService } from "@/services/room.service";
import { UserService } from "@/services/user.service";
import { webSocket } from "@/lib/config/web-socket"
import { roomDto, roomSchema } from "@/lib/model/dto/create-room.dto";
import { generateRandomIdentity } from "ic-websocket-js";
import { join } from "path";
import { useEffect, useState } from "react";
import { createTracing } from "trace_events";

let roomService = new RoomService();
let userService = new UserService();
let roomUserService = new RoomUserService();

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

    const sendMessage = async () => {
        const principal = await userService.getCallerPrincipal(1);
        console.log(principal)
        try {
            const msg : Message = {
                message : "Ping",
                room_id : "af6dc03e-d335-423a-9aa5-190a1daa5d80",
                created_at : BigInt(new Date().getTime()),
                user_id : principal
            }
            webSocket.send(msg);
        } catch (e) {
            console.error(e)
        }
    };

    const joinRoom = async() => {
        const response = await roomService.joinRoom("af6dc03e-d335-423a-9aa5-190a1daa5d80");
        console.log(response)
    }

    const createRoom = async () => {
        const chatRoom : roomDto = roomSchema.parse({
            room_id : 'af6dc03e-d335-423a-9aa5-190a1daa5d80',
            room_name : "GUIGI"
        })
        const response = await roomUserService.userJoinRoom("af6dc03e-d335-423a-9aa5-190a1daa5d80");
        console.log(response)
        roomService.createRoom(chatRoom)
    }

    useEffect(() => {
        const response = roomService.getRooms().then(res => {
            console.log(res)

        })
        // console.log(response.data)
    },[])


    

    return (
        <div>
            <h1>Chat Page</h1>
            <button onClick={() => createRoom()}>Create Room</button>
            <button onClick={() => joinRoom()}>Join Room</button>
            <button onClick={sendMessage}>Send</button>
        </div>
    );
}