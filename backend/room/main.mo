import Text "mo:base/Text";
import Result "mo:base/Result";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";
import Array "mo:base/Array";
import Time "mo:base/Time";
import List "mo:base/List";
import Buffer "mo:base/Buffer";
import Error "mo:base/Error";
import Types "types";
import IcWebSocketCdk "mo:ic-websocket-cdk";
import IcWebSocketCdkState "mo:ic-websocket-cdk/State";
import IcWebSocketCdkTypes "mo:ic-websocket-cdk/Types";
import RoomUsersActor "canister:room_users";
import UserActor "canister:user";
import MessageActor "canister:message";
import MessageTypes "../message/types";
import Utils "../utils";


actor RoomManager {
    stable var rooms : List.List<Types.Room> = List.nil<Types.Room>();

    let params = IcWebSocketCdkTypes.WsInitParams(null, null);
    let ws_state = IcWebSocketCdkState.IcWebSocketState(params);


    func send_message(_: IcWebSocketCdk.ClientPrincipal, msg: MessageTypes.MessageResponse): async () {
        Debug.print("Sending message: " # debug_show(msg));
        let participants = await RoomUsersActor.getAllUsersByRoomId(msg.room_id);
        Debug.print("Participants: " # debug_show(participants));
        let response = await MessageActor.createMessage(msg.room_id, msg.message, msg.user_id);
        switch (response) {
            case (#err(err)) {
                Debug.print("Could not send message: " # debug_show(#Err(err)));
                return;
            };
            case (_) {};
        };

        

        for (user in Iter.fromArray(participants)) {
            Debug.print("Sending to Principal: " # debug_show(user));

            switch (await IcWebSocketCdk.send(ws_state, user.user_id, to_candid(msg))) {
                case (#Err(err)) {
                    Debug.print("Could not send message: " # debug_show(#Err(err)));
                };
                case (_) {};
            };
        };
    };

    func on_open(args: IcWebSocketCdk.OnOpenCallbackArgs) : async () {
        Debug.print("Client " # debug_show(args.client_principal) # " connected");
    };

    func on_message(args: IcWebSocketCdk.OnMessageCallbackArgs) : async () {

        let app_msg : ? MessageTypes.Message = try {
            from_candid(args.message);
        } catch (e) {
            Debug.print("Deserialization error: " # Error.message(e));
            return;
        };

        let new_msg = switch (app_msg) {
            case (?msg) {
                let user = await UserActor.getUserByPrincipal(msg.user_id);

                let username = switch (user) {
                    case (?u) u.username;
                    case (null) "Unknown";
                };
                { 
                    message = msg.message;
                    room_id = msg.room_id;
                    created_at = Time.now();
                    username = username;
                    user_id  = msg.user_id;
                };
            };
            case (null) {
                Debug.print("Could not deserialize message2");
                return;
            };
        };

        await send_message(args.client_principal, new_msg);
    };

    func on_close(args: IcWebSocketCdk.OnCloseCallbackArgs) : async () {
        Debug.print("Client " # debug_show(args.client_principal) # " disconnected");
    };

    let handlers = IcWebSocketCdkTypes.WsHandlers(
        ?on_open,
        ?on_message,
        ?on_close,
    );

    let ws = IcWebSocketCdk.IcWebSocket(ws_state, params, handlers);

    public shared ({ caller }) func ws_open(args: IcWebSocketCdk.CanisterWsOpenArguments) : async IcWebSocketCdk.CanisterWsOpenResult {
        await ws.ws_open(caller, args);
    };

    public shared ({ caller }) func ws_close(args: IcWebSocketCdk.CanisterWsCloseArguments) : async IcWebSocketCdk.CanisterWsCloseResult {
        await ws.ws_close(caller, args);
    };

    public shared ({ caller }) func ws_message(args: IcWebSocketCdk.CanisterWsMessageArguments, msg: ?MessageTypes.MessageResponse) : async IcWebSocketCdk.CanisterWsMessageResult {
        await ws.ws_message(caller, args, msg);
    };

    public shared query ({ caller }) func ws_get_messages(args: IcWebSocketCdk.CanisterWsGetMessagesArguments) : async IcWebSocketCdk.CanisterWsGetMessagesResult {
        ws.ws_get_messages(caller, args);
    };

    public func getRoomById(room_id: Text) : async ?Types.Room {
        return List.find(rooms, func(room : Types.Room) : Bool { room.room_id == room_id });
    };

    public func createRoom(room_name: Text, room_type: Text, post_id: Text) : async Result.Result<Types.Room, Text> {
        if (room_name == "") return #err("Room name cannot be empty");

        let room_id = await Utils.generateUUID();
        let newRoom: Types.Room = {
            room_id = room_id;
            room_name = room_name;
            room_type = if (room_type == "") "Private" else room_type;
            post_id = post_id;
        };

        rooms := List.push(newRoom, rooms);
        return #ok(newRoom);
    };

    public func getAllRooms() : async [Types.Room] {
        return List.toArray(rooms);
    };

    public func createPrivateRoom(sender_id: Principal, receiver_id: Principal, post_id: Text) : async Result.Result<Text, Text> {
        let userRooms = await RoomUsersActor.getUserPrivateRoom(sender_id, receiver_id);

        for (room_id in Iter.fromArray(userRooms)) {
            let existing_room = await getRoomById(room_id);
            switch (existing_room) {
                case (?room) {
                    if (room.post_id == post_id) {
                        return #ok(room_id);
                    };
                };
                case (null) {};
            };
        };
        let result = await createRoom("Private Room", "Private", post_id);
        switch (result) {
            case (#ok(new_room)) {
                ignore await RoomUsersActor.addUserToRoom(new_room.room_id, sender_id);
                ignore await RoomUsersActor.addUserToRoom(new_room.room_id, receiver_id);
                return #ok(new_room.room_id);
            };
            case (#err(errorMessage)) {
                return #err(errorMessage);
            };
        };

    };

    public func getRoomByPostId(post_id: Text) : async [Types.GetRoomsResponse] {
        let filteredRooms = List.filter(rooms, func(room : Types.Room) : Bool { room.post_id == post_id });
        let roomsArray = List.toArray(filteredRooms);

        let results = Buffer.Buffer<Types.GetRoomsResponse>(Array.size(roomsArray));

        for (room in roomsArray.vals()) {
            let users = await RoomUsersActor.getAllUsersByRoomId(room.room_id);
            results.add({
                room_id = room.room_id;
                post_id = room.post_id;
                room_type = room.room_type;
                room_name = room.room_name;
                room_user = users;
            });
        };

        return Buffer.toArray(results);
    };
};
