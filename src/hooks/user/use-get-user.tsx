import { User } from "@/lib/model/entity/user";
import { Principal } from "@dfinity/principal";
import { useEffect, useState } from "react";
import useServiceContext from "../use-service-context";

export function useGetUser(principal: Principal) {
    const { userService } = useServiceContext();
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getUser = async () => {
            const user = await userService.getUserByPrincipal(principal);
            setUser(user);
            setLoading(false);
            console.log(user)
        };
        
        console.log(principal)
        getUser();
    }, [principal]);

    return { user, loading };
}
