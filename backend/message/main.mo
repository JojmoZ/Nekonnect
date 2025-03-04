import Text "mo:base/Text";
import List "mo:base/List";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import UserModule "../user/interface";
import Types "types";

actor class MessageManager() {
    stable var roomMessages: List.List<Types.Message> = List.nil();

    public func getMessagesByRoomId(room_id: Text, userCanisterId: Text) : async [Types.MessageResponse] {
        let filteredMessages = List.filter<Types.Message>(
            roomMessages,
            func (msg) = msg.room_id == room_id
        );

        var messageResponses: [Types.MessageResponse] = [];
        for (message in Iter.fromList(filteredMessages)) {
            let userActor = actor (userCanisterId) : UserModule.UserActor;
            let user = await userActor.getUserByPrincipal(message.user_id);
            let messageResponse: Types.MessageResponse = {
                message = message.message;
                user = user;
                room_id = message.room_id;
                created_at = message.created_at;
            };
            messageResponses := Array.append(messageResponses, [messageResponse]);
        };

        return messageResponses;
    };

    public shared func createMessage(room_id: Text, message: Text, sender_id: Principal) : async Result.Result<Types.Message, Text> {
        if (room_id == "" or message == "") {
            return #err("All Fields must be filled");
        };

        let newMessage: Types.Message = {
            room_id = room_id;
            user_id = sender_id;
            message = message;
            created_at = Time.now();
        };

        roomMessages := List.push(newMessage, roomMessages);

        return #ok(newMessage);
    };
}
