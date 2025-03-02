import { MessageResponse } from "@/lib/model/dto/response/get-message-response"
import { Message } from "@/lib/model/entity/message"
import { User } from "@/lib/model/entity/user"

interface IProps {
    message : MessageResponse
    user : User | null
}

export const MessageBubble = ({message, user} : IProps) => {
    const isSender = message.user.internetIdentity.toString() === user?.internetIdentity.toString();
    return (
        <div
            className={`flex flex-col w-max max-w-[75%] gap-1 ${
                isSender ? 'ml-auto items-end' : 'items-start'
            }`}
        >
            {!isSender && (
                <span className="text-xs text-gray-500">{message.user.username}</span>
            )}
            <div
                className={`flex items-end w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm relative ${
                isSender
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary'
                }`}
            >
                {message.message}
            </div>
            <span className="text-xs text-gray-500 ml-2">{message.created_at.toString()}</span>
        </div>
    )
}
