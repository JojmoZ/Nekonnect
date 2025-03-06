import { useEffect, useState } from "react";
import useServiceContext from "../use-service-context";
import { User } from "@/lib/model/entity/user";
import { useLayout } from "@/context/layout-context";

export const useGetAuthenticated = () => {
    const { userService } = useServiceContext();
    const [ isAuthenticated, setIsAuthenticated ] = useState<Boolean | null>(null);
    const [ me, setMe ] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const {startLoading, stopLoading} = useLayout();

    const fetch = async () => {
        startLoading();
        await userService.me().then(user => {
            setMe(user);
            setIsAuthenticated(user != null);
        })
        stopLoading();
    }
    
    useEffect(() => {
        fetch();
    }, []);

    return {loading, isAuthenticated, me, fetch };
}
