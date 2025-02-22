import IcWebSocketCdk "mo:ic-websocket-cdk";
import IcWebSocketCdkState "mo:ic-websocket-cdk/State";
import IcWebSocketCdkTypes "mo:ic-websocket-cdk/Types";
import Text "mo:base/Text";
import Debug "mo:base/Debug";
import Types "types";

actor {

    let params = IcWebSocketCdkTypes.WsInitParams(null, null);
    let ws_state = IcWebSocketCdkState.IcWebSocketState(params);

    func send_message(principal : IcWebSocketCdk.ClientPrincipal, msg : Types.Message): async () {
        switch (await IcWebSocketCdk.send(ws_state, principal, to_candid(msg))) {
            case (#Err(err)) {
                Debug.print("Could not send message:" # debug_show (#Err(err)));
            };
            case (_) {};
        }
    };

    func on_open(args : IcWebSocketCdk.OnOpenCallbackArgs) : async () {
        let message : Types.Message = {
        message = "Connected to WebSocket";
        username = "System"
        };
        await send_message(args.client_principal, message);
    };

    func on_message(args : IcWebSocketCdk.OnMessageCallbackArgs) : async () {
        let app_msg : ?Types.Message = from_candid(args.message);
        
        let new_msg: Types.Message = switch (app_msg) {
            case (?msg) { 
                { 
                    message = Text.concat(msg.username, msg.message);
                    username = msg.username;
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
    public shared ({ caller }) func ws_message(args : IcWebSocketCdk.CanisterWsMessageArguments, msg:? Types.Message) : async IcWebSocketCdk.CanisterWsMessageResult {
        await ws.ws_message(caller, args, msg);
    };

    // method called by the WS Gateway to get messages for all the clients it serves
    public shared query ({ caller }) func ws_get_messages(args : IcWebSocketCdk.        CanisterWsGetMessagesArguments) : async IcWebSocketCdk.CanisterWsGetMessagesResult {
        ws.ws_get_messages(caller, args);
    };
     
}