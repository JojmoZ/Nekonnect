import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { Message } from '@/lib/model/entity/message';
import { useState } from 'react';
import { MessageBubble } from './message-bubble';
import { MessageResponse } from '@/lib/model/dto/response/get-message-response';
import { useGetAuthenticated } from '@/hooks/user/use-get-authenticated';
import { ChatForm } from './chat-form';
import { UseFormReturn } from 'react-hook-form';
import { messageDto } from '@/lib/model/dto/send-message.dto';

interface IProps {
  messages : MessageResponse[]
  form : UseFormReturn<messageDto>
  onMessage : () => void
}

export function ChatAppSidebar({messages, form, onMessage} : IProps) {

  const { me } = useGetAuthenticated();

  return (
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
  );
}
