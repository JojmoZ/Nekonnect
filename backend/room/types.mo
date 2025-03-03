import Text "mo:base/Text";
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
};