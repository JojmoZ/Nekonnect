import { useEffect, useState } from "react";
import useServiceContext from "../use-service-context";
import { User } from "@/lib/model/entity/user";

export const useGetAuthenticated = () => {
    const { userService } = useServiceContext();
    const [ isAuthenticated, setIsAuthenticated ] = useState<Boolean | null>(null);
    const [ user, setUser ] = useState<User | null>(null);
    
    useEffect(() => {
        userService.isAuthenticated().then(isAuthenticated => {
            setIsAuthenticated(isAuthenticated);
        })
        // userService.me().then(user => {
        //     setUser(user);
        //     console.log(user);
        // })
    }, []);

    return { isAuthenticated, user };
}
