import { useEffect } from "react"
import LoadingScreen from "../(public)/loading"
import { useGetAuthenticated } from "@/hooks/user/use-get-authenticated";
import useServiceContext from "@/hooks/use-service-context";
import { RoleEnum } from "@/lib/enum/role-enum";
import { CarTaxiFront } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const GetAdminRole = () => {
    const { isAuthenticated, me } = useGetAuthenticated();
    const { userService } = useServiceContext();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated === false) {
            toast.error('You are not authorized to access this page.');
            navigate("/")
            return;
        }
        if (me === null) return

        userService.editUser({ ...me, role: RoleEnum.ADMIN }).then(() => {
            toast.success('You are now an admin!');
        }).catch((error) => {
           toast.error(error.message);
        })
        navigate("/")
        return;
    },[me])
    return (
        <LoadingScreen />
    )
}