import Text "mo:base/Text";
import Time "mo:base/Time";
import Principal "mo:base/Principal";
import UserType "../user/types";

module {


    public type Message = {
        message: Text;
        user_id: Principal;
        room_id : Text;
        created_at : Time.Time;
    };

    public type MessageResponse = {
        message: Text;
        // user : ?UserType.User;
        username : Text;
        room_id : Text;
        created_at : Time.Time;
        user_id : Principal;
    };

    public type MessageRequest = {
        message: Text;
        user_id: Principal;
        room_id : Text;
        created_at : Time.Time;
        username : Text;
        user_canister_id : Text;
        room_users_canister_id : Text;
        message_canister_id : Text;
    };
};