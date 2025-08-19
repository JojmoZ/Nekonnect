import List "mo:base/List";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Nat8 "mo:base/Nat8";
import Array "mo:base/Array";
import Blob "mo:base/Blob";
import Types "types";
import UserActor "canister:user";

persistent actor RoomUsersManager {
    var roomUsers : List.List<Types.RoomUser> = List.nil<Types.RoomUser>();

    public func addUserToRoom(room_id: Text, user_id: Principal) : async Result.Result<(), Text> {
        let newUser : Types.RoomUser = { room_id = room_id; user_id = user_id };

        if (List.find<Types.RoomUser>(roomUsers, func(user) = user.room_id == room_id and user.user_id == user_id) != null) {
            return #err("User already exists in the room");
        };

        roomUsers := List.push(newUser, roomUsers);
        return #ok(());
    };

    public func removeUserFromRoom(room_id: Text, user_id: Principal) : async Result.Result<(), Text> {
        let updatedList = List.filter<Types.RoomUser>(roomUsers, func(user) = not (user.room_id == room_id and user.user_id == user_id));

        if (List.size(updatedList) == List.size(roomUsers)) {
            return #err("User not found in the room");
        };

        roomUsers := updatedList;
        return #ok(());
    };

    public func getUserPrivateRoom(user_sender: Principal, user_receiver: Principal) : async [Text] {
        var roomIds : List.List<Text> = List.nil<Text>();

        for (room : Types.RoomUser in Iter.fromList<Types.RoomUser>(roomUsers)) {
            let room_id : Text = room.room_id;

            let is_sender : Bool = List.find<Types.RoomUser>(
                roomUsers, 
                func(user : Types.RoomUser) : Bool { user.room_id == room_id and user.user_id == user_sender }
            ) != null;

            let is_receiver : Bool = List.find<Types.RoomUser>(
                roomUsers, 
                func(user : Types.RoomUser) : Bool { user.room_id == room_id and user.user_id == user_receiver }
            ) != null;

            let already_added : Bool = List.some<Text>(roomIds, func(id : Text) : Bool { id == room_id });

            if (is_sender and is_receiver and not already_added) {
                roomIds := List.push(room_id, roomIds); 
            };
        };

        return List.toArray<Text>(roomIds); 
    };


    public func getByRoomIdAndUserId(room_id: Text, user_id: Principal) : async ?Types.RoomUser {
        List.find<Types.RoomUser>(roomUsers, func(user) = user.room_id == room_id and user.user_id == user_id);
    };

    public func getAllUsersByRoomId(room_id: Text) : async [Types.RoomUser] {
        
        List.toArray<Types.RoomUser>(List.filter<Types.RoomUser>(roomUsers, func(user) = user.room_id == room_id));
    };

     public func getAllUsersResponseByRoomId(room_id: Text) : async [Types.RoomUserResponse] {
        let filtered_users = List.filter<Types.RoomUser>(
            roomUsers,
            func(user) { user.room_id == room_id }
        );

        var response : [Types.RoomUserResponse] = [];
        
        for (room_user in Iter.fromList(filtered_users)) {
            let user = await UserActor.getUserByPrincipal(room_user.user_id);
            let username = switch (user) {
                case (?u) u.username;
                case (null) "Unknown";
            };
            // let profile : [Nat8] = switch (user) {
            //     case (?u) u.profilePicture;
            //     case (null) [];
            // };
            
            let newResponse : Types.RoomUserResponse= { 
                username = username;
                profilePicture = [];
                room_id = room_id;
                user_id = room_user.user_id;
            };
            response := Array.append(response, [newResponse]);
        };

        return response;
    };
}
