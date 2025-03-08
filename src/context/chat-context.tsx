import { Message, MessageResponse } from "@/declarations/message/message.did";
import { idlFactory, room } from "@/declarations/room";
import { _SERVICE } from "@/declarations/room/room.did";
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
import IcWebSocket from "ic-websocket-js";
import { toast } from "sonner";
import { GetRoomsResponse } from "@/lib/model/dto/response/get-room-response";
import { messageCanisterId, roomUsersCanisterId, userCanisterId } from "@/services/base.service";

interface IProps {
    form : UseFormReturn<messageDto>
    rooms : GetRoomsResponse[]
    children : ReactNode
    selectedRoom : string | null
    // messages : MessageResponse[]
    getRoom : (id : string) => void
    // getMessages : (room_id : string) => void
    onSelectRoom : (room_id : string) => void
    onMessageSend : () => void
    onOpenChat : (user_id : Principal,  post_id : string) => void
    setPostId : (id : string) => void
}

export const ChatContext = createContext<IProps>({} as IProps);

export const ChatProvider= ({ children } : { children: React.ReactNode }) => {
    const [rooms, setRooms] = useState<GetRoomsResponse[]>([]);
    const [selectedRoom, setSelectedRoom] = useState<string | null>(null);
    const [postId, setPostId] = useState<string | null>(null);
    // const [messages, setMessages] = useState<MessageResponse[]>([]);
    const [socket, setSocket] = useState<IcWebSocket<_SERVICE, Message> | null>(null);
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
            message_canister_id : messageCanisterId,
            user_canister_id : userCanisterId,
            room_users_canister_id : roomUsersCanisterId
        },
    });

      const getRoom = async (id: string) => {
        const response = await roomService.getRoomByPostId(id);
        
        const filteredRoom: GetRoomsResponse[] = (await Promise.all(
            response.map(async (room) => {
                const roomMessage = await messageService.getMessagesByRoomId(room.room_id);
                console.log(roomMessage);
    
                roomMessage.sort(
                    (a, b) =>
                        new Date(b.created_at.toString()).getTime() -
                        new Date(a.created_at.toString()).getTime()
                );
    
                return {
                    post_id: room.post_id,
                    room_id: room.room_id,
                    room_name: room.room_name,
                    room_type: room.room_type,
                    room_user: room.room_user,
                    message: roomMessage,
                };
            })
        )).filter((room) => room.post_id !== "");
        
        // console.log(filteredRoom);
        setRooms(filteredRoom);
    };
    

    const onSelectRoom = (room_id : string) => {
        setSelectedRoom(room_id);
    }

    // const getMessages = async (room_id : string) => {
    //     const messages = await messageService.getMessagesByRoomId(room_id);
    //     setMessages(messages)
    // }

    const toastGetMessages = async (room_id : string) => {
      toast.promise(messageService.getMessagesByRoomId(room_id), {
        loading: 'Loading messages',
        success: 'Messages loaded successfully',
        error: 'Error loading messages',
      })
    }

    const onOpenChat = async (user_id : Principal, post_id : string) => {
      // if (me == null) return
      // const roomExist = rooms.find(room => {
      //   const receiver = room.room_user.find(user => user.user_id === user_id)
      //   const sender = room.room_user.find(user => user.user_id === me.internetIdentity)
      //   return receiver != null && sender != null
      // })

      const response = await roomService.createPrivateRoom(user_id,post_id!)
      form.setValue('room_id', response);
      setSelectedRoom(response);
        // await getMessages(response)
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
    
          response.onmessage = (event: MessageEvent) => {
            const newMessage : MessageResponse  = event.data 
            // console.log(newMessage)
            const roomExist = rooms.find(room => room.room_id === newMessage.room_id)
            if (!roomExist && postId) {
              getRoom(postId)
              return
            }
            setRooms((rooms) => rooms.map((room) => room.room_id === newMessage.room_id ? {...room, message : [ newMessage,...room.message]} : room))
            // setMessages((msg) => [ event.data,...msg]);
          };
    
          response.onerror = (error: Event) => {
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
          toast.error('Error sending message to WebSocket',{position: 'top-right'});
          console.error('Error sending message:', error);
        }
      }

      const changePostId = (id : string) => {
        setPostId(id)
      }

    useEffect(() => {
        getSocket()
        setLoading(false)
    }, []);

    const value: IProps = {
          form : form,
          rooms : rooms,
          children : children,
          selectedRoom : selectedRoom,
          setPostId : changePostId,
          // messages : messages,
          getRoom : getRoom,
          onSelectRoom : onSelectRoom,
          // getMessages : toastGetMessages,
          onMessageSend : onMessageSend,
          onOpenChat : onOpenChat
      };

    if (loading) {
        return <LoadingScreen text="Chat"/>;
    }

    return (
        <ChatContext.Provider value={value}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);