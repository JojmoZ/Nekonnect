import { MessageResponse } from "@/declarations/message/message.did";
import { idlFactory } from "@/declarations/room";
import { GetRoomsResponse } from "@/declarations/room/room.did";
import useServiceContext from "@/hooks/use-service-context";
import { getWebSocket } from "@/lib/config/web-socket";
import { messageDto, messageSchema } from "@/lib/model/dto/send-message.dto"
import LoadingScreen from "@/pages/(public)/loading";
import { IDL } from "@dfinity/candid";
import { Principal } from "@dfinity/principal";
import { zodResolver } from "@hookform/resolvers/zod";
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { useForm, UseFormReturn } from "react-hook-form"
import { useAuth } from "./auth-context";

interface IProps {
    form : UseFormReturn<messageDto>
    rooms : GetRoomsResponse[]
    children : ReactNode
    messages : MessageResponse[]
    getRoom : (id : string) => void
    getMessages : (room_id : string) => void
    onMessageSend : () => void
    onOpenChat : (user_id : Principal,  post_id : string) => void
}

export const ChatContext = createContext<IProps>({} as IProps);

export const ChatProvider= ({ children } : { children: React.ReactNode }) => {
    const [rooms, setRooms] = useState<GetRoomsResponse[]>([]);
    const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [socket, setSocket] = useState<any>(null);
    const { roomService, messageService, userService } = useServiceContext();
    const { me } = useAuth();
    const [loading, setLoading] = useState(true);

    const form = useForm<messageDto>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            room_id : '',
            message : '',
            created_at : BigInt(new Date().getTime()),
            user_id : me?.internetIdentity,
            username : me?.username,
        },
    });

    const getRoom = async (id : string) => {
        const response = await roomService.getRoomByPostId(id)
        setRooms(response)
    }

    const getMessages = async (room_id : string) => {
        const messages = await messageService.getMessagesByRoomId(form.getValues('room_id'));
        setMessages(messages)
    }

    const onOpenChat = async (user_id : Principal, post_id : string) => {
        const response = await roomService.createPrivateRoom(user_id,post_id!)
        form.setValue('room_id', response);
        await getMessages(response)
    }

    const getSocket = async () => {
        if (socket === null) {
          const response = await getWebSocket(
            await userService.getCallerIdentity(),
          );
     
          response.onopen = () => {
            console.log('Connected');
          };
    
          response.onclose = () => {
            console.log('Disconnected');
          };
    
          response.onmessage = (event: any) => {
            console.log('Message');
            console.log(event.data);
            setMessages((msg) => [ event.data,...msg]);
          };
    
          response.onerror = (error: any) => {
            console.log(error);
          };
          setSocket(response);
        }
      };

    const onMessageSend = async () => {
      if (me == null) return
        form.setValue('user_id', me.internetIdentity);
        form.setValue('username', me.username);
        try {
          if (socket && socket.readyState === WebSocket.OPEN) {
            socket.send(form.getValues());
            form.setValue('message', '');
          } else {
            console.error('WebSocket is not open. Cannot send message.');
          }
        } catch (error) {
          console.error('Error sending message:', error);
        }
      }

    useEffect(() => {
        getSocket()
        setLoading(false)
    }, []);

    const value: IProps = {
          form : form,
          rooms : rooms,
          children : children,
          messages : messages,
          getRoom : getRoom,
          getMessages : getMessages,
          onMessageSend : onMessageSend,
          onOpenChat : onOpenChat
      };

    if (loading) {
        return <LoadingScreen />;
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);