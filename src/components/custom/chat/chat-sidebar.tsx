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
import { ChatForm } from './chat-form';
import { useForm, UseFormReturn } from 'react-hook-form';
import { messageDto, messageSchema } from '@/lib/model/dto/send-message.dto';
import { Outlet } from 'react-router';
import useServiceContext from '@/hooks/use-service-context';
import { zodResolver } from '@hookform/resolvers/zod';
import { getWebSocket } from '@/lib/config/web-socket';
import { MessageResponse } from '@/declarations/message/message.did';
import { useChat } from '@/context/chat-context';
import { useAuth } from '@/context/auth-context';
import { User } from '@/lib/model/entity/user';
import { deserializeImage } from '@/lib/utils/Image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface IProps {
  user: User | null;
  children: React.ReactNode
}

export function ChatAppSidebar({ user, children }: IProps) {

  const { me } = useAuth();
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
            'padding-top': '112px',
          } as React.CSSProperties
        }
        side='right'
        variant='floating'
      >
        <SidebarContent
          className='bg-background rounded-md'
        >
          <SidebarHeader className="sticky top-0 bg-secondary p-3 shadow-md z-10 rounded-t-md">
            <div className="flex items-center space-x-4 p-1">
              <Avatar className="h-14 w-14 md:h-14 md:w-14 border-4 border-background shadow-md">
                <AvatarFallback className="bg-primary text-sm">{me?.username.substring(0, 2).toUpperCase()}</AvatarFallback>
                <AvatarImage src={deserializeImage(me?.profilePicture ?? [])} alt={me?.username} />
              </Avatar>
              <div>
                <h2 className="text-foreground font-semibold text-lg">{user?.username}</h2>
              </div>
            </div>
          </SidebarHeader>
          <SidebarGroup className=" h-screen flex flex-col flex-1 overflow-y-auto ">
            <div className="flex-1 p-4 space-y-2 flex flex-col-reverse overflow-y-auto scrollbar-hidden">
              {messages.map((msg, index) => (
                <MessageBubble message={msg} user={me} key={index} />
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
