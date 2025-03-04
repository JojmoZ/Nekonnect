import Text "mo:base/Text";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import UserType "../user/types";

module {

    public type User = UserType.User;

    public type Message = {
        message: Text;
        user_id: Principal;
        room_id : Text;
        created_at : Time.Time;
    };

    public type MessageResponse = {
        message: Text;
        user : ?User;
        room_id : Text;
        created_at : Time.Time;
    }
};