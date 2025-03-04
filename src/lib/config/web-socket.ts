import IcWebSocket, {generateRandomIdentity} from "ic-websocket-js";
import { roomCanisterId, createRoomActor } from "@/services/base.service";
import { _SERVICE } from "@/declarations/room/room.did";
import { Message } from "@/declarations/message/message.did";
import { SignIdentity } from "@dfinity/agent";

const gateway = import.meta.env.VITE_WS_GATEWAY_URL ?? (() => { throw new Error("VITE_WS_GATEWAY_URL is not defined in .env"); })() ;
const icUrl = import.meta.env.VITE_IC_NETWORK_URL ?? (() => { throw new Error("VITE_IC_NETWORK_URL is not defined in .env"); })();

export const getWebSocket = (identity : SignIdentity) : IcWebSocket<_SERVICE, Message> => {
    console.log(identity);
    try {
        return new IcWebSocket(gateway, undefined,{
            canisterId : roomCanisterId,
            identity : identity,
            networkUrl : icUrl,
            canisterActor : createRoomActor(roomCanisterId),
        })
    } catch (e) {
        throw new Error(`Error creating WebSocket: ${e}`);
    }
};