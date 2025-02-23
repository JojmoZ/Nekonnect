import Text "mo:base/Text";
import Principal "mo:base/Principal";

module {
    public type RoomUser = {
        room_id : Text;
        user_id : Principal;
    }
}