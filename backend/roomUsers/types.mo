import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";

module {
    public type RoomUser = {
        room_id : Text;
        user_id : Principal;
    };

    public type RoomUserResponse = {
        room_id : Text;
        user_id : Principal;
        username : Text;
        profilePicture: [Nat8];
    };
}
