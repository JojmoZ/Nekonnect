import Text "mo:base/Text";
import Time "mo:base/Time";
import Principal "mo:base/Principal";

module {

    public type Message = {
        message: Text;
        user_id: Principal;
        room_id : Text;
        created_at : Time.Time;
    };
};