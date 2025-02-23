import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import TrieSet "mo:base/TrieSet";
import Principal "mo:base/Principal";
import Hash "mo:base/Hash";
import Result "mo:base/Result";
import Array "mo:base/Array";
import Bool "mo:base/Bool";
import Iter "mo:base/Iter";
import Types "types";

actor RoomUsersManager {
    private let roomUsers = HashMap.HashMap<Text, TrieSet.Set<Types.RoomUser>>(10, Text.equal, Text.hash);

    // Helper functions for TrieSet operations
    private func hashUser(user: Types.RoomUser) : Nat32 {
        let roomHash = Text.hash(user.room_id);
        let userHash = Principal.hash(user.user_id);
        roomHash +% userHash
    };

    private func equalUser(a: Types.RoomUser, b: Types.RoomUser) : Bool {
        a.room_id == b.room_id and a.user_id == b.user_id
    };
    public func addUserToRoom(room_id: Text, user_id: Principal) : async Result.Result<(), Text> {
        let newUser : Types.RoomUser = {
            room_id = room_id;
            user_id = user_id;
        };
        
        switch (roomUsers.get(room_id)) {
            case (null) {
                let newSet = TrieSet.empty<Types.RoomUser>();
                let updatedSet = TrieSet.put<Types.RoomUser>(
                    newSet,
                    newUser,
                    hashUser(newUser),
                    equalUser
                );
                roomUsers.put(room_id, updatedSet);
                #ok(());
            };
            case (?existingSet) {
                let updatedSet = TrieSet.put<Types.RoomUser>(
                    existingSet,
                    newUser,
                    hashUser(newUser),
                    equalUser
                );
                roomUsers.put(room_id, updatedSet);
                #ok(());
            };
        };
    };

    public func removeUserFromRoom(room_id: Text, user_id: Principal) : async Result.Result<(), Text> {
        switch (roomUsers.get(room_id)) {
            case (null) {
                #err("Room not found");
            };
            case (?existingSet) {
                let userToRemove : Types.RoomUser = {
                    room_id = room_id;
                    user_id = user_id;
                };
                
                let updatedSet = TrieSet.delete<Types.RoomUser>(
                    existingSet,
                    userToRemove,
                    hashUser(userToRemove),
                    equalUser
                );
                
                roomUsers.put(room_id, updatedSet);
                #ok(());
            };
        };
    };


    public func getByRoomIdAndUserId(room_id: Text, user_id: Principal) : async ?Types.RoomUser {
        switch (roomUsers.get(room_id)) {
            case (null) { 
                null;
            };
            case (?existingSet) {
                let matchingUser = Iter.filter<Types.RoomUser>(Array.vals(TrieSet.toArray<Types.RoomUser>(existingSet)), func(user : Types.RoomUser) : Bool { user.user_id == user_id });
                matchingUser.next();
            };
        };
    };

    public func getAllUsersByRoomId(room_id: Text) : async [Types.RoomUser] {
        switch (roomUsers.get(room_id)) {
            case (null) { 
                [];
            };
            case (?existingSet) {
                TrieSet.toArray<Types.RoomUser>(existingSet);
            };
        };
    };

    

}

