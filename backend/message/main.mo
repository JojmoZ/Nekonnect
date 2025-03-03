//import IcWebSocketCdk "mo:ic-websocket-cdk";
//import IcWebSocketCdkState "mo:ic-websocket-cdk/State";
//import IcWebSocketCdkTypes "mo:ic-websocket-cdk/Types";
//import IcWebSocketCdk "mo:ic-websocket-cdk";
//import IcWebSocketCdkState "mo:ic-websocket-cdk/State";
//import IcWebSocketCdkTypes "mo:ic-websocket-cdk/Types";
import Text "mo:base/Text";
//import Debug "mo:base/Debug";
//import Debug "mo:base/Debug";
import HashMap "mo:base/HashMap";
import Array "mo:base/Array";
import Result "mo:base/Result";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import RoomUsersActor "canister:room_users";
import UserActor "canister:user";
import RoomUserTypes "../roomUsers/types";
import Types "types";

actor class MessageManager() {
    let roomMessages = HashMap.HashMap<Text, [Types.Message]>(10,Text.equal,Text.hash);

    
    public func getMessagesByRoomId (room_id : Text) : async [Types.MessageResponse] {
        let messages =  roomMessages.get(room_id);
        switch (messages) {
            case (?messages) {
              var messageResponses : [Types.MessageResponse] = [];
              for (message in Iter.fromArray(messages)) {
                let user = await UserActor.getUserByPrincipal(message.user_id);
                let messageResponse : Types.MessageResponse = {
                  message = message.message;
                  user = user;
                  room_id = message.room_id;
                  created_at = message.created_at;
                };
                messageResponses := Array.append(messageResponses, [messageResponse]);
              };
              return messageResponses;
            };
            case (null) { return []; }; 
        };
    };

    public shared func createMessage (room_id : Text,message : Text, sender_id : Principal) : async  Result.Result<Types.Message,Text> {
        

        if (room_id == "" or message == "") {
            return #err("All Fields must been filled")
        };

        let newMessage : Types.Message = {
            room_id = room_id;
            user_id = sender_id;
            message = message;
            created_at = Time.now();
        };
        
        let messages =  roomMessages.get(room_id);
        switch (messages) {
          case (?existingMessages) {
            let newMessages = Array.append(existingMessages, [newMessage]);
            roomMessages.put(room_id, newMessages);
          };
          case (null) {
            roomMessages.put(room_id, [newMessage]);
          };
        };
        return #ok(newMessage);
    };


     
}