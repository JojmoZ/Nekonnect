import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { useState } from 'react';

export function ChatAppSidebar() {
  const [messages, setMessages] = useState<
    { text: string; name: string; time: string }[]
  >([
    {
      text: 'Hi, how can I help you today?',
      name: 'Support',
      time: '10:00 AM',
    },
    {
      text: "Hey, I'm having trouble with my account.",
      name: 'You',
      time: '10:01 AM',
    },
    {
      text: 'Could you describe the issue?',
      name: 'Support',
      time: '10:02 AM',
    },
    {
      text: 'Could you describe the issue?',
      name: 'Support',
      time: '10:02 AM',
    },
    {
      text: 'Could you describe the issue?',
      name: 'Support',
      time: '10:02 AM',
    },
    {
      text: 'Could you describe the issue?',
      name: 'Support',
      time: '10:02 AM',
    },
    {
      text: 'Could you describe the issue?',
      name: 'Support',
      time: '10:02 AM',
    },
    {
      text: 'Could you describe the issue?',
      name: 'Support',
      time: '10:02 AM',
    },
    { text: "I can't reset my password.", name: 'You', time: '10:03 AM' },
  ]);
  const currentUser = 'You';
  const [input, setInput] = useState('');

  return (
    <Sidebar
      style={
        {
          '--sidebar-overflow-y': 'hidden',
        } as React.CSSProperties
      }
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
              <div
                key={index}
                className={`flex flex-col w-max max-w-[75%] gap-1 ${
                  msg.name === 'You' ? 'ml-auto items-end' : 'items-start'
                }`}
              >
                {msg.name !== currentUser && (
                  <span className="text-xs text-gray-500">{msg.name}</span>
                )}
                <div
                  className={`flex items-end w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm relative ${
                    msg.name === 'You'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary'
                  }`}
                >
                  {msg.text}
                </div>
                <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
              </div>
            ))}
          </div>
          <form
            style={
              {
                '--sidebar-width': '500px',
              } as React.CSSProperties
            }
            className="sticky w-full bottom-0 left-0 flex items-center space-x-2 px-1 pt-2 bg-white border-t "
            onSubmit={(e) => {
              e.preventDefault();
              // sendMessage();
            }}
          >
            <input
              className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1"
              id="message"
              placeholder="Type your message..."
              autoComplete="off"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground shadow hover:bg-primary/90 h-9 w-9"
              type="submit"
              disabled={!input.trim()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-send"
              >
                <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z"></path>
                <path d="m21.854 2.147-10.94 10.939"></path>
              </svg>
            </button>
          </form>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
