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
// import MessageActor "canister:message";
import MessageTypes "../message/types";
import RoomUserTypes "../roomUsers/types";

actor RoomManger {
    let rooms = HashMap.HashMap<Text, Types.Room>(10,Text.equal,Text.hash);
    
    let room_state = HashMap.HashMap<Text, [Principal]>(10,Text.equal,Text.hash);

    let params = IcWebSocketCdkTypes.WsInitParams(null, null);
    let ws_state = IcWebSocketCdkState.IcWebSocketState(params);

    public shared ({ caller }) func join_room(room_id: Text) : async Result.Result<RoomUserTypes.RoomUser, Text> {
        let isUserInRoom = await RoomUsersActor.getUserInRoom(room_id,caller);
        switch (isUserInRoom) {
            case (?user) {
                let current_users = room_state.get(room_id);
                switch (current_users) {
                    case (?users) {
                        Debug.print("Current users: " # debug_show (users));
                        Debug.print("Caller: " # debug_show (caller));
                        Debug.print("Room: " # debug_show (room_id));
                        if (Array.find(users, func(u: Principal) : Bool { u == caller }) == null) {
                            room_state.put(room_id, Array.append(users, [caller]));
                        };
                    };
                    case (null) {
                        room_state.put(room_id, [caller]);
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
        let participants = room_state.get(msg.room_id);
        switch (participants) {
            case(?users) {
                for (user in users.vals()) {
                    Debug.print("Principal:" # debug_show (user));
                    switch (await IcWebSocketCdk.send(ws_state, user, to_candid(msg))) {
                        case (#Err(err)) {
                            Debug.print("Could not send message:" # debug_show (#Err(err)));
                        };
                        case (_) {};
                    }
                };
            };
            case(null) {
                Debug.print("Room not found: " # msg.room_id);
            }
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

  // method called by the Ws Gateway when closing the IcWebSocket connection
    public shared ({ caller }) func ws_close(args : IcWebSocketCdk.CanisterWsCloseArguments) : async IcWebSocketCdk.CanisterWsCloseResult {
        await ws.ws_close(caller, args);
    };

    // method called by the frontend SDK to send a message to the canister
    public shared ({ caller }) func ws_message(args : IcWebSocketCdk.CanisterWsMessageArguments, msg:? MessageTypes.Message) : async IcWebSocketCdk.CanisterWsMessageResult {
        await ws.ws_message(caller, args, msg);
    };

    // method called by the WS Gateway to get messages for all the clients it serves
    public shared query ({ caller }) func ws_get_messages(args : IcWebSocketCdk.CanisterWsGetMessagesArguments) : async IcWebSocketCdk.CanisterWsGetMessagesResult {
        ws.ws_get_messages(caller, args);
    };

    public func getRoomById (room_id : Text) : async ?Types.Room {
        var room =  rooms.get(room_id);
        return room;
    };

    public func createRoom (room_id : Text,room_name : Text,room_type : Text) : async  Result.Result<Types.Room,Text> {
        

        if (room_id == "" or room_name == "") {
            return #err("All Fields must been filled")
        };

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


}
