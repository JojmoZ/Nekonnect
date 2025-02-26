import { LoanPostService } from "@/services/loan-post.service";
import { RoomUserService } from "@/services/room-users.service";
import { RoomService } from "@/services/room.service";
import { UserService } from "@/services/user.service";
import React, { useEffect, useMemo, useState } from "react";
interface IProps {
    userService : UserService
    roomUserService : RoomUserService
    roomService : RoomService
    loanPostService : LoanPostService
}

export const ServiceContext = React.createContext<IProps>({} as IProps);


export const ServiceProvider= ({ children } : { children: React.ReactNode }) => {
    const [userService, setUserService] = useState<UserService>(new UserService());
    const [roomUserService, setRoomUserService] = useState<RoomUserService>(new RoomUserService());
    const [roomService, setRoomService] = useState<RoomService>(new RoomService());
    const [loanPostService, setLoanPostService] = useState<LoanPostService>(new LoanPostService());

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const initializeServices = async () => {
            const user = new UserService();
            const roomUser = new RoomUserService();
            const room = new RoomService();
            const loanPost = new LoanPostService();

            await Promise.all([
                user.ensureInitialized(),
                roomUser.ensureInitialized(),
                room.ensureInitialized(),
                loanPost.ensureInitialized(),
            ]);

            setUserService(user);
            setRoomUserService(roomUser);
            setRoomService(room);
            setLoanPostService(loanPost);
            setLoading(false);
        };

        initializeServices();
    }, []);

    const value: IProps = useMemo(() => {
        return {
            userService: userService,
            roomUserService: roomUserService,
            roomService: roomService,
            loanPostService: loanPostService,
        };
    }, [userService, roomUserService, roomService, loanPostService]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <ServiceContext.Provider value={value}>
            {children}
        </ServiceContext.Provider>
    );
};

export const useService = () => React.useContext(ServiceContext);
