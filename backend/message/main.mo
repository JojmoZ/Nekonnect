import Text "mo:base/Text";
import List "mo:base/List";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Array "mo:base/Array";
import Types "types";
import UserActor "canister:user";

actor class MessageManager() {
    stable var roomMessages: List.List<Types.Message> = List.nil();

    public func getMessagesByRoomId(room_id: Text) : async [Types.MessageResponse] {
        let filteredMessages = List.filter<Types.Message>(
            roomMessages,
            func (msg) = msg.room_id == room_id
        );

        var messageResponses: [Types.MessageResponse] = [];
        for (message in Iter.fromList(filteredMessages)) {
            let user = await UserActor.getUserByPrincipal(message.user_id);
            let username = switch (user) {
                    case (?u) u.username;
                    case (null) "Unknown";
                };
            let messageResponse: Types.MessageResponse = {
                message = message.message;
                room_id = message.room_id;
                created_at = message.created_at;
                username = username;
                user_id = message.user_id;
            };
            messageResponses := Array.append(messageResponses, [messageResponse]);
        };

        return messageResponses;
    };

    public func getMessagesByRoomIdAndUserId(room_id: Text, user_id: Principal) : async [Types.MessageResponse] {
        let filteredMessages = List.filter<Types.Message>(
            roomMessages,
            func (msg) = msg.room_id == room_id and msg.user_id == user_id
        );

        var messageResponses: [Types.MessageResponse] = [];
        for (message in Iter.fromList(filteredMessages)) {
            let user = await UserActor.getUserByPrincipal(message.user_id);
            let username = switch (user) {
                    case (?u) u.username;
                    case (null) "Unknown";
                };
            let messageResponse: Types.MessageResponse = {
                message = message.message;
                room_id = message.room_id;
                created_at = message.created_at;
                username = username;
                user_id = message.user_id;
            };
            messageResponses := Array.append(messageResponses, [messageResponse]);
            return messageResponses;
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
