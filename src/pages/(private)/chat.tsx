import { idlFactory, canisterId } from '@/declarations/user';
import { Actor, HttpAgent } from '@dfinity/agent';
import { useNavigate } from 'react-router';
import { _SERVICE, Message } from '@/declarations/message/message.did';
import { RoomUserService } from '@/services/room-users.service';
import { RoomService } from '@/services/room.service';
import { UserService } from '@/services/user.service';
import { roomDto, roomSchema } from '@/lib/model/dto/create-room.dto';
import IcWebSocket, { generateRandomIdentity } from 'ic-websocket-js';
import { useEffect, useState } from 'react';
import { getWebSocket } from '@/lib/config/web-socket';
import {
  SidebarContent,
  SidebarProvider,
  SidebarTrigger,
  useSidebar,
} from '@/components/ui/sidebar';
import { Sidebar } from 'lucide-react';
import { ChatAppSidebar } from '@/components/custom/chat/chat-sidebar';
import useServiceContext from '@/hooks/use-service-context';
import { MessageResponse } from '@/lib/model/dto/response/get-message-response';
import { UserList } from '@/components/custom/chat/user-list';
import { User } from '@/lib/model/entity/user';
import { useForm } from 'react-hook-form';
import { messageDto, messageSchema } from '@/lib/model/dto/send-message.dto';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';


interface IProps {}

export const ChatPage: React.FC<IProps> = () => {
  const navigate = useNavigate();

  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const { userService, roomService, roomUserService} = useServiceContext()
  const [socket, setSocket] = useState<any>(null);

  const form = useForm<messageDto>({
        resolver: zodResolver(messageSchema),
        defaultValues: {
            room_id : '',
            message : ''
        },
    });

  const sendMessage = async () => {
    const principal = await userService.getCallerPrincipal();
    console.log(principal.toString());
    try {
      const msg: Message = {
        message: 'Ping',
        room_id: 'af6dc03e-d335-423a-9aa5-190a1daa5d80',
        created_at: BigInt(new Date().getTime()),
        user_id: principal,
      };
      try {
        if (socket && socket.readyState === WebSocket.OPEN) {
          socket.send(msg);
          console.log('Message sent:', msg);
        } else {
          console.error('WebSocket is not open. Cannot send message.');
        }
      } catch (error) {
        console.error('Error sending message:', error);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const joinRoom = async () => {
    const principal = await userService.getCallerPrincipal();
    console.log(principal.toString());
    const response = await roomService.joinRoom(
      'af6dc03e-d335-423a-9aa5-190a1daa5d80',
      principal,
    );
    console.log(response);
    const response2 = await roomUserService.getByRoomIdAndUserId(
      'af6dc03e-d335-423a-9aa5-190a1daa5d80',
      principal,
    );
    console.log(response2);
    const response3 = await roomUserService.getAllUsersByRoomId(
      'af6dc03e-d335-423a-9aa5-190a1daa5d80',
    );
    response3.map((user) => console.log(user.user_id.toString()));
  };

  const createRoom = async () => {
    const chatRoom: roomDto = roomSchema.parse({
      room_id: 'af6dc03e-d335-423a-9aa5-190a1daa5d80',
      room_name: 'GUIGI',
    });
    roomService.createRoom(chatRoom);
    const response = await roomUserService.userJoinRoom(
      'af6dc03e-d335-423a-9aa5-190a1daa5d80',
      await userService.getCallerPrincipal(),
    );
    console.log(response);
  };

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
      };

      response.onerror = (error: any) => {
        console.log(error);
      };
      setSocket(response);
    }
  };

  const onChat = async (user : User) => {
    const response = await roomService.createPrivateRoom(user.internetIdentity)
    console.log(response);
    form.setValue('room_id', response);
  }

  const onMessage = async () => {
    socket.send(form.getValues());
  }

  useEffect(() => {;
    getSocket();
  }, []);

  return (
      <SidebarProvider
        style={
          {
            '--sidebar-width': '600px',
          } as React.CSSProperties
        }
        defaultOpen={false}
      >
        <main>
          <UserList onChat={onChat}/>
        </main>
        <ChatAppSidebar onMessage={onMessage} form={form} messages={messages}/>
      </SidebarProvider>
  );
};
