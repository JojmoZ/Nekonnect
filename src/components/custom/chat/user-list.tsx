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

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
]

interface IProps {
    onChat : (user : User) => void
}

export function UserList({onChat}: IProps) {

    const [users, setUsers] = useState<User[]>([]);
    const { userService } = useServiceContext();
    const { loading, me } = useGetAuthenticated();
    const { toggleSidebar } = useSidebar();

    const addOnChat = (user : User) => {
        toggleSidebar();
        onChat(user);
    }

    const getAllUser = async () => {
        const response = await userService.getAllUser();
        const filterResponse = response.filter((user) => user.username !== me?.username);
        console.log(filterResponse)
        setUsers(filterResponse);
    }
    
    useEffect(() => {
        if (loading) return;
        getAllUser(); 
    },[loading])
    
    
    return (
        <Card className={cn("w-[380px]")}>
        <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have 3 unread messages.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
            {users.map((user,index) => (
                <div key={index} className=" flex items-center rounded-md border p-4">
                    <div className="flex items-center justify-between flex-1 space-y-1">
                        <p className="text-sm font-medium leading-none">
                        {user.username}
                        </p>
                        <Button onClick={() => addOnChat(user)}>Chat</Button>
                    </div>
                </div>
            ))}
        </CardContent>
        </Card>
    )
}
