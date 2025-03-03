import { BellRing, Check } from "lucide-react"

import { cn } from "@/lib/utils/cn"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from "react"
import { User } from "@/lib/model/entity/user"
import useServiceContext from "@/hooks/use-service-context"
import { useGetAuthenticated } from "@/hooks/user/use-get-authenticated"
import { useSidebar } from "@/components/ui/sidebar"
import { UseFormReturn } from "react-hook-form"
import { messageDto } from "@/lib/model/dto/send-message.dto"
import { Principal } from "@dfinity/principal"

interface IProps {
    form : UseFormReturn<messageDto>,
    receiver_id : Principal
}

export function ChatButton({form, receiver_id}: IProps) {

    const {  roomService } = useServiceContext();
    const { toggleSidebar } = useSidebar();

    const onChat = async (user_id : Principal) => {
        const response = await roomService.createPrivateRoom(user_id)
        form.setValue('room_id', response);
        console.log(response);
        toggleSidebar()
    }
    
    return (
        <Button onClick={() => onChat(receiver_id)}>Chat</Button>
    )
}
