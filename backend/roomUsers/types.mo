import Principal "mo:base/Principal";
import Text "mo:base/Text";

module {

    public type RoomUser = {
        room_id : Text;
        user_id : Principal;
    };
};