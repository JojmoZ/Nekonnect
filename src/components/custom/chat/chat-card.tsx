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
import { GetRoomsResponse } from "@/lib/model/dto/response/get-room-response"
import { useEffect, useState } from "react"

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
    const message = room.message[0];
    const bigIntTimestamp = BigInt(message.created_at.toString());

    const timestampMs = Number(bigIntTimestamp / BigInt(1_000_000));
    
    const [formattedTime, setFormattedTime] = useState("")

    useEffect(() => {
        const messageDate = new Date(timestampMs)
        const today = new Date()
        const yesterday = new Date(today)
        yesterday.setDate(yesterday.getDate() - 1)

        const isToday = messageDate.toDateString() === today.toDateString()
        const isYesterday = messageDate.toDateString() === yesterday.toDateString()

        if (isToday) {
        setFormattedTime(messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }))
        } else if (isYesterday) {
        setFormattedTime(`Yesterday ${messageDate.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}`)
        } 
        else {
        setFormattedTime(messageDate.toLocaleDateString([], { month: "2-digit", day: "2-digit", year: "2-digit",hour: "2-digit", minute: "2-digit" }))
        }
    }, [timestampMs])
    
    return (
        <li
            className={`flex items-center justify-between rounded-md p-4 hover:bg-muted/50 transition-colors cursor-pointer ${
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
            <div className="px-1">
                <p className="font-medium">{receiver.username}</p>
                {message && <p className="text-xs text-muted-foreground">{formattedTime} {message?.message}</p>}
            </div>
            </div>
            <Button size="icon" variant="ghost" className="rounded-full h-8 w-8">
                <MessageCircleIcon className="h-4 w-4" />
            </Button>
        </li>
        // <Button onClick={() => onChat(receiver_id)}>Chat</Button>
    )
}
