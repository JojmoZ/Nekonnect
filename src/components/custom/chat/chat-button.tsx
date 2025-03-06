import { Button } from "@/components/ui/button"
import useServiceContext from "@/hooks/use-service-context"
import { useSidebar } from "@/components/ui/sidebar"
import { UseFormReturn } from "react-hook-form"
import { messageDto } from "@/lib/model/dto/send-message.dto"
import { Principal } from "@dfinity/principal"
import { useChat } from "@/context/chat-context"

interface IProps {
    receiver_id : Principal
    post_id : string | undefined
}

export function ChatButton({ receiver_id,post_id}: IProps) {

    const { toggleSidebar} = useSidebar();
    const { onOpenChat } = useChat();

    const onChat = async (user_id : Principal) => {
        onOpenChat(user_id,post_id!)
        toggleSidebar()
    }
    
    return (
        <Button onClick={() => onChat(receiver_id)}>Chat</Button>
    )
}
