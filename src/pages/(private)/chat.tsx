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
import { AuthClient } from '@dfinity/auth-client';
import { get } from 'http';
import { W } from 'react-router/dist/development/fog-of-war-Cm1iXIp7';

let roomService = new RoomService();
let userService = new UserService();
let roomUserService = new RoomUserService();

interface IProps {}

export const ChatPage: React.FC<IProps> = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      //   const agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });
      //   await agent.fetchRootKey();

      //   const backend = Actor.createActor(idlFactory, { agent, canisterId });

      //   await backend.logout();
      //   const authClient = await AuthClient.create();
      //     authClient.logout();
      //   setUsername(null); // Clear user in frontend state
      //   navigate('/login');
      await userService.logout();
    } catch (err) {
      console.error('Logout Error:', err);
    }
  };

  const [socket, setSocket] = useState<any>(null);

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
      console.log(response);

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

  useEffect(() => {
    const response = roomService.getRooms().then((res) => {
      console.log(res);
    });
    getSocket();
  }, []);

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
    { text: "I can't reset my password.", name: 'You', time: '10:03 AM' },
  ]);
  const currentUser = 'You';
  const [input, setInput] = useState('');

  return (
    <div>
      {/* <h1>Chat Page</h1>
        <div>
            <h1>Chat Page</h1>
            <button onClick={() => createRoom()}>Create Room</button>
            <button onClick={() => joinRoom()}>Join Room</button>
            <button onClick={sendMessage}>Send</button>
        </div>
        <button onClick={sendMessage}></button>

        <button onClick={handleLogout}>Logout</button> */}
      <div className="flex flex-col h-screen p-4 bg-white-100">
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex flex-col w-max max-w-[75%] gap-1 ${msg.name === 'You' ? 'ml-auto items-end' : 'items-start'}`}
            >
              {msg.name !== currentUser && (
                <span className="text-xs text-gray-500">{msg.name}</span>
              )}
              <div
                className={`flex items-end w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm relative ${msg.name === 'You' ? 'bg-primary text-primary-foreground' : 'bg-secondary'}`}
              >
                {msg.text}
              </div>

              {msg.name === currentUser ? (
                <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
              ) : (
                <span className="text-xs text-gray-500 ml-2">{msg.time}</span>
              )}
            </div>
          ))}
        </div>
        <form
          className="flex w-full items-center space-x-2 p-2 bg-white border-t"
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <input
            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm flex-1"
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
            <span className="sr-only">Send</span>
          </button>
        </form>
      </div>
    </div>
  );
};
