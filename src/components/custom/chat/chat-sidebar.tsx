import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarProvider,
} from '@/components/ui/sidebar';
import { Message } from '@/lib/model/entity/message';
import { useEffect, useState } from 'react';
import { MessageBubble } from './message-bubble';
import { MessageResponse } from '@/lib/model/dto/response/get-message-response';
import { useGetAuthenticated } from '@/hooks/user/use-get-authenticated';
import { ChatForm } from './chat-form';
import { useForm, UseFormReturn } from 'react-hook-form';
import { messageDto, messageSchema } from '@/lib/model/dto/send-message.dto';
import { Outlet } from 'react-router';
import useServiceContext from '@/hooks/use-service-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { getWebSocket } from '@/lib/config/web-socket';

interface IProps {
  form : UseFormReturn<messageDto>
  children : React.ReactNode
}

export function ChatAppSidebar({form,children} : IProps) {

  const { me } = useGetAuthenticated();
  const [messages, setMessages] = useState<MessageResponse[]>([]);
  const { userService, messageService } = useServiceContext()
  const [socket, setSocket] = useState<any>(null);

  const getMessages = async () => {
    const messages = await messageService.getMessagesByRoomId(form.getValues('room_id'));
    console.log(messages)
    // setMessages(messages);
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
        };
  
        response.onerror = (error: any) => {
          console.log(error);
        };
        setSocket(response);
      }
    };

    
  
  const onMessage = async () => {
    form.setValue('user_id', await userService.getCallerPrincipal());
    console.log(form.getValues())
    console.log(socket)
    try {
      if (socket && socket.readyState === WebSocket.OPEN) {
        socket.send(form.getValues());
        console.log('Message sent:', form.getValues());
      } else {
        console.error('WebSocket is not open. Cannot send message.');
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
    // socket.send(form.getValues());
  }

  useEffect(() => {
    getMessages();
    getSocket();
  }, [form.getValues('room_id')]);

  return (
    <SidebarProvider
      style={
        {
          '--sidebar-width': '600px',
        } as React.CSSProperties
      }
      defaultOpen={false}
    >
      {children}
      <Sidebar
        style={
          {
            '--sidebar-overflow-y': 'hidden',
          } as React.CSSProperties
        }
        side='right'
      >
        <SidebarContent
          style={
            {
              backgroundColor: 'white',
            } as React.CSSProperties
          }
        >
          <SidebarHeader className="sticky top-0 bg-gray-700 p-3 shadow-md z-10">
            <div className="flex items-center space-x-4 p-1">
              <img
                className="w-14 h-14 rounded-full border-4 border-white shadow-lg ml-2"
                src="https://jagadtani.com/uploads/gallery/2023/09/merawat-anak-bebek-agar-2caf76baf1.jpg"
                alt="Profile"
              />
              <div>
                <h2 className="text-white font-semibold text-lg">John Doe</h2>
              </div>
            </div>
          </SidebarHeader>
          <SidebarGroup className=" h-screen flex flex-col flex-1 overflow-y-auto ">
            <div className="flex-1 p-4 space-y-2 flex flex-col-reverse overflow-y-auto scrollbar-hidden">
              {messages.map((msg, index) => (
                <MessageBubble message={msg} user={me} key={index}/>
              ))}
            </div>
            <ChatForm onMessage={onMessage} form={form} />
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {/* <ChatAppSidebar onMessage={onMessage} form={form} messages={messages}/> */}
    </SidebarProvider>
  );
}
