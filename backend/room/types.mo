import Text "mo:base/Text";
import Time "mo:base/Time";
import RoomUserTypes "../roomUsers/types";
module {

    public type Room = {
        room_id : Text;
        room_name : Text;
        room_type : Text;
        post_id : Text;
    };

    public type GetRoomsResponse = {
        room_id : Text;
        room_name : Text;
        room_type : Text;
        post_id : Text;
        room_user : [RoomUserTypes.RoomUser];
    };

    public type WebSocketRequest = {
        message: Text;
        user_id: Principal;
        room_id : Text;
        created_at : Time.Time;
        canister_id : Text;
    };
};