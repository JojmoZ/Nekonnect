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
import { useGetAuthenticated } from '@/hooks/user/use-get-authenticated';
import { ChatForm } from './chat-form';
import { useForm, UseFormReturn } from 'react-hook-form';
import { messageDto, messageSchema } from '@/lib/model/dto/send-message.dto';
import { Outlet } from 'react-router';
import useServiceContext from '@/hooks/use-service-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { getWebSocket } from '@/lib/config/web-socket';
import { MessageResponse } from '@/declarations/message/message.did';
import { useChat } from '@/context/chat-context';

interface IProps {
  children : React.ReactNode
}

export function ChatAppSidebar({children} : IProps) {

  const { me } = useGetAuthenticated();
  const { messages } = useChat();


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
            <ChatForm />
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      {/* <ChatAppSidebar onMessage={onMessage} form={form} messages={messages}/> */}
    </SidebarProvider>
  );
}
