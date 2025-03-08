import Types "types";
import Text "mo:base/Text";
import Result "mo:base/Result";

module {

    public type RoomUsersActor = actor {
        getAllUsersByRoomId : (room_id: Text) -> async [Types.RoomUser];
        getAllUsersResponseByRoomId : (room_id: Text) -> async [Types.RoomUserResponse];
        getUserPrivateRoom : (user_sender: Principal, user_receiver: Principal) -> async [Text];
        addUserToRoom : (room_id: Text, user_id: Principal) -> async Result.Result<(), Text>;
        removeUserFromRoom : (room_id: Text, user_id: Principal) -> async Result.Result<(), Text>

    }
}