import { useEffect } from "react"
import LoadingScreen from "../(public)/loading"
import useServiceContext from "@/hooks/use-service-context";
import { RoleEnum } from "@/lib/enum/role-enum";
import { CarTaxiFront } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useAuth } from "@/context/auth-context";

export const GetOwnerRole = () => {
    const { isAuthenticated, me } = useAuth();
    const { userService } = useServiceContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            toast.error('You are not authorized to access this page.');
            navigate("/")
            return;
        }
        if (me === null) return

        userService.editUser({ ...me, role: RoleEnum.OWNER }).then(() => {
            toast.success('You are now an Owner!');
        }).catch((error) => {
           toast.error(error.message);
        })
        navigate("/")
        return;
    },[me])
    
    return (
        null
    )
}