import { MessageResponse } from "@/declarations/message/message.did"
import { Message } from "@/lib/model/entity/message"
import { User } from "@/lib/model/entity/user"
import { useEffect, useState } from "react"

interface IProps {
    message : MessageResponse
    user : User | null
}

export const MessageBubble = ({message, user} : IProps) => {
    // console.log(message)
    const isSender = message.user_id.toString() === user?.internetIdentity.toString();
    const bigIntTimestamp = BigInt(message.created_at);

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
        } else {
        setFormattedTime(messageDate.toLocaleDateString([], { month: "numeric", day: "numeric", year: "2-digit" }))
        }
    }, [timestampMs])

    
    return (
        <div
        className={`flex flex-col w-max max-w-[80%] gap-1 mb-2 ${
          isSender ? 'ml-auto items-end' : 'items-start'
        }`}
      >
        {!isSender && (
          <span className="text-xs font-medium text-muted-foreground pl-2">{message.username}</span>
        )}
        <div
          className={`flex items-end gap-2 ${
            isSender ? 'flex-row' : 'flex-row-reverse'
          }`}
        >
          <div
            className={`relative px-4 py-2 text-sm break-words ${
              isSender
                ? 'bg-primary text-primary-foreground rounded-t-lg rounded-bl-lg rounded-br-sm'
                : 'bg-secondary text-secondary-foreground rounded-t-lg rounded-br-lg rounded-bl-sm'
            }`}
          >
            {message.message}
          </div>
        </div>
        <div className={`flex items-center gap-1 ${isSender ? 'flex-row' : 'flex-row-reverse'} px-2`}>
          <span className="text-xs text-muted-foreground">{formattedTime}</span>
          {/* {isSender && message.status && (
            <span className="text-xs text-muted-foreground">
              {message.status === "sent" && <CheckIcon className="h-3 w-3" />}
              {message.status === "delivered" && <CheckIcon className="h-3 w-3" />}
              {message.status === "read" && <CheckCheckIcon className="h-3 w-3" />}
            </span>
          )} */}
        </div>
      </div>
    )
}
