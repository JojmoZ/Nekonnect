import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Time "mo:base/Time";
import Types "types";
import IcWebSocketCdk "mo:ic-websocket-cdk";
import IcWebSocketCdkState "mo:ic-websocket-cdk/State";
import IcWebSocketCdkTypes "mo:ic-websocket-cdk/Types";
import RoomUsersActor "canister:room_users";
import UserActor "canister:user";
import MessageActor "canister:message";
import MessageTypes "../message/types";
import RoomUserTypes "../roomUsers/types";
import Utils "../utils";

actor RoomManager {
    let rooms = HashMap.HashMap<Text, Types.Room>(10,Text.equal,Text.hash);
    
    let room_state = HashMap.HashMap<Text, [Principal]>(10,Text.equal,Text.hash);

    let params = IcWebSocketCdkTypes.WsInitParams(null, null);
    let ws_state = IcWebSocketCdkState.IcWebSocketState(params);

    public func join_room(room_id: Text,user_id: Principal) : async Result.Result<RoomUserTypes.RoomUser, Text> {
        let isUserInRoom = await RoomUsersActor.getByRoomIdAndUserId(room_id,user_id);
        switch (isUserInRoom) {
            case (?user) {
                let current_users = room_state.get(room_id);
                switch (current_users) {
                    case (?users) {
                        if (Array.find(users, func(u: Principal) : Bool { u == user_id }) == null) {
                            room_state.put(room_id, Array.append(users, [user_id]));
                        };
                    };
                    case (null) {
                        room_state.put(room_id, [user_id]);
                    };
                };
                #ok(user);
            };
            case (null) {
                #err("User not found in room");
            };
        };
        
    };

    func send_message(principal : IcWebSocketCdk.ClientPrincipal, msg : MessageTypes.Message): async () {
        Debug.print("Sending message:" # debug_show (msg));
        let participants = await RoomUsersActor.getAllUsersByRoomId(msg.room_id);
        Debug.print("Participants:" # debug_show (participants));
        switch (participants) {
            case(users) {
                let response = await MessageActor.createMessage(msg.room_id, msg.message, msg.user_id);
                switch (response) {
                    case (#ok(_)) {
                    };
                    case (#err(err)) {
                        Debug.print("Could not send message:" # debug_show (#Err(err)));
                    };
                };
                for (user in users.vals()) {
                    Debug.print("Principal:" # debug_show (user));
                    switch (await IcWebSocketCdk.send(ws_state, user.user_id, to_candid(msg))) {
                        case (#Err(err)) {
                            Debug.print("Could not send message:" # debug_show (#Err(err)));
                        };
                        case (_) {};
                    }
                };
            };
            
        }
    };

    func on_open(args : IcWebSocketCdk.OnOpenCallbackArgs) : async () {
        Debug.print("Client " # debug_show (args.client_principal) # " connected");
        // let message : Types.Message = {
        // message = "Connected to WebSocket";
        // username = "System"
        // };
        // await send_message(args.client_principal, message);
    };

    func on_message(args : IcWebSocketCdk.OnMessageCallbackArgs) : async () {
        let app_msg : ?MessageTypes.Message = from_candid(args.message);
        
        let new_msg: MessageTypes.Message = switch (app_msg) {
            case (?msg) { 
                let user = await UserActor.getUserByPrincipal(args.client_principal);
                let username = switch (user) {
                    case (?user) user.username;
                    case (null) "Unknown";
                };
                { 
                    message = Text.concat(username, msg.message);
                    user_id = args.client_principal;
                    room_id = msg.room_id;
                    created_at = Time.now();
                };
            };
            case (null) {
                Debug.print("Could not deserialize message");
                return;
            };
        };

        Debug.print("Received message: " # debug_show (new_msg));

        await send_message(args.client_principal, new_msg);
    };


    func on_close(args : IcWebSocketCdk.OnCloseCallbackArgs) : async () {
        Debug.print("Client " # debug_show (args.client_principal) # " disconnected");
    };

    let handlers = IcWebSocketCdkTypes.WsHandlers(
        ?on_open,
        ?on_message,
        ?on_close,
    );

    let ws = IcWebSocketCdk.IcWebSocket(ws_state, params, handlers);

    public shared ({ caller }) func ws_open(args : IcWebSocketCdk.CanisterWsOpenArguments) : async IcWebSocketCdk.CanisterWsOpenResult {
        await ws.ws_open(caller, args);
    };

    public shared ({ caller }) func ws_close(args : IcWebSocketCdk.CanisterWsCloseArguments) : async IcWebSocketCdk.CanisterWsCloseResult {
        await ws.ws_close(caller, args);
    };

    public shared ({ caller }) func ws_message(args : IcWebSocketCdk.CanisterWsMessageArguments, msg:? MessageTypes.Message) : async IcWebSocketCdk.CanisterWsMessageResult {
        await ws.ws_message(caller, args, msg);
    };

    public shared query ({ caller }) func ws_get_messages(args : IcWebSocketCdk.CanisterWsGetMessagesArguments) : async IcWebSocketCdk.CanisterWsGetMessagesResult {
        ws.ws_get_messages(caller, args);
    };

    public func getRoomById (room_id : Text) : async ?Types.Room {
        var room =  rooms.get(room_id);
        return room;
    };

    public func createRoom (room_name : Text,room_type : Text) : async  Result.Result<Types.Room,Text> {
        

        if (room_name == "") {
            return #err("All Fields must been filled")
        };

        let room_id = await Utils.generateUUID();

        let newRoom : Types.Room = {
            room_id = room_id;
            room_name = room_name;
            room_type = if (room_type == "") "Private" else room_type;
        };

        rooms.put(room_id,newRoom);
        return #ok(newRoom);
    };

    public func getAllRooms () : async [Types.Room] {
        let roomValues = rooms.vals();
        return Iter.toArray(roomValues);
    };
    
    public func createPrivateRoom(sender_id: Principal,receiver_id: Principal) : async Result.Result<Text, Text> {
        let room = await RoomUsersActor.getUserPrivateRoom(sender_id,receiver_id);
        switch (room) {
            case (null) {
                let result = await createRoom("Private Room", "Private");

                switch (result) {
                    case (#ok(new_room)) {
                        let response =  await RoomUsersActor.addUserToRoom(new_room.room_id, sender_id);
                        switch (response) {
                            case(#ok(_)){
                                let response = await join_room(new_room.room_id,sender_id);
                            };
                            case (#err(errorMessage)) {
                                return #err(errorMessage);
                            };
                        };
                        let response2 =  await RoomUsersActor.addUserToRoom(new_room.room_id, receiver_id);
                        switch (response2) {
                            case(#ok(_)){
                                let response2 = await join_room(new_room.room_id,receiver_id);
                            };
                            case (#err(errorMessage)) {
                                return #err(errorMessage);
                            };
                        };
                        return #ok(new_room.room_id);
                    };
                    case (#err(errorMessage)) {
                        return #err(errorMessage);
                    };
                };
            };
            case (?room_id) {
                let response = await join_room(room_id,sender_id);
                let response2 = await join_room(room_id,receiver_id);
                return #ok(room_id);
            };
        };
        #err("Error creating room");
        
    };


}
