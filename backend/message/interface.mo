import Types "types";
import Result "mo:base/Result";
import Text "mo:base/Text";

module {

    public type MessageActor = actor {
        createMessage : (room_id: Text, message: Text, sender_id: Principal) -> async Result.Result<Types.Message, Text>;
    }
}