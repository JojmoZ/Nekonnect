import { MessageResponse } from "@/declarations/message/message.did"
import { Message } from "@/lib/model/entity/message"
import { User } from "@/lib/model/entity/user"

interface IProps {
    message : MessageResponse
    user : User | null
}

export const MessageBubble = ({message, user} : IProps) => {
    // console.log(message)
    const isSender = message.user_id.toString() === user?.internetIdentity.toString();
    const bigIntTimestamp = BigInt(message.created_at);

    const timestampMs = Number(bigIntTimestamp / BigInt(1_000_000));

    
    return (
        <div
            className={`flex flex-col w-max max-w-[75%] gap-1 ${
                isSender ? 'ml-auto items-end' : 'items-start'
            }`}
        >
            {!isSender && (
                <span className="text-xs text-gray-500">{message.username}</span>
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
            <span className="text-xs text-gray-500 ml-2">{new Date(timestampMs).toLocaleTimeString()}</span>
        </div>
    )
}
