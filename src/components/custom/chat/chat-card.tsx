import { Button } from "@/components/ui/button"
import useServiceContext from "@/hooks/use-service-context"
import { useSidebar } from "@/components/ui/sidebar"
import { UseFormReturn } from "react-hook-form"
import { messageDto } from "@/lib/model/dto/send-message.dto"
import { Principal } from "@dfinity/principal"
import { useChat } from "@/context/chat-context"
import { useAuth } from "@/context/auth-context"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { MessageCircleIcon } from "lucide-react"
import { deserializeImage } from "@/lib/utils/Image"
import { GetRoomsResponse, RoomUserResponse } from "@/declarations/room/room.did"

interface IProps {
    room : GetRoomsResponse
}

export function ChatCard({room}: IProps) {

    const { toggleSidebar , open} = useSidebar();
    const { onOpenChat } = useChat();
    const { me } = useAuth();

    const onChat = async (user_id : Principal) => {
        if (!open) onOpenChat(user_id,room.post_id!)
        toggleSidebar()
    }

    const receiver = room.room_user.filter((user) => user.user_id.toString() != me?.internetIdentity.toString())[0];
    
    return (
        <li
            className={`flex items-center justify-between p-4 px-6 hover:bg-muted/50 transition-colors cursor-pointer ${
                me?.internetIdentity === receiver.user_id ? "bg-muted/70" : ""
            }`}
            onClick={() => onChat(receiver.user_id)}
        >
            <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10 relative">
                <AvatarImage src={deserializeImage(receiver.profilePicture)} alt={receiver.username} />
                <AvatarFallback>{receiver.username.slice(0,2)}</AvatarFallback>
                {/* {user.status && (
                <span
                    className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${getStatusColor(user.status)}`}
                ></span>
                )} */}
            </Avatar>
            <div>
                <p className="font-medium">{receiver.username}</p>
                {/* {user.lastActive && <p className="text-xs text-muted-foreground">Last active: {user.lastActive}</p>} */}
            </div>
            </div>
            <Button size="icon" variant="ghost" className="rounded-full h-8 w-8">
                <MessageCircleIcon className="h-4 w-4" />
            </Button>
        </li>
        // <Button onClick={() => onChat(receiver_id)}>Chat</Button>
    )
}
