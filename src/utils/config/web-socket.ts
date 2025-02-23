import IcWebSocket, {generateRandomIdentity} from "ic-websocket-js";
import { roomCanisterId, createRoomActor } from "@/services/base.service";

const gateway = import.meta.env.VITE_WS_GATEWAY_URL ?? (() => { throw new Error("VITE_WS_GATEWAY_URL is not defined in .env"); })() ;
const icUrl = import.meta.env.VITE_IC_NETWORK_URL ?? (() => { throw new Error("VITE_IC_NETWORK_URL is not defined in .env"); })();

export const webSocket = 
new IcWebSocket(gateway, undefined,{
    canisterId : roomCanisterId,
    identity : generateRandomIdentity(),
    networkUrl : icUrl,
    canisterActor : createRoomActor(roomCanisterId),

});