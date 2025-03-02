import { useEffect, useState } from "react";
import useServiceContext from "../use-service-context";
import { User } from "@/lib/model/entity/user";

export const useGetAuthenticated = () => {
    const { userService } = useServiceContext();
    const [ isAuthenticated, setIsAuthenticated ] = useState<Boolean | null>(null);
    const [ me, setMe ] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    
    useEffect(() => {
        userService.me().then(user => {
            setMe(user);
            setIsAuthenticated(user != null);
        }).finally(() => setLoading(false));
    }, []);

    return {loading, isAuthenticated, me };
}
