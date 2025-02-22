import IcWebSocket, {generateRandomIdentity} from "ic-websocket-js";
import { canisterId , createActor} from "@/declarations/chat";

const gateway = import.meta.env.VITE_WS_GATEWAY_URL ?? (() => { throw new Error("VITE_WS_GATEWAY_URL is not defined in .env"); })() ;
const icUrl = import.meta.env.VITE_IC_NETWORK_URL ?? (() => { throw new Error("VITE_IC_NETWORK_URL is not defined in .env"); })();

export const webSocket = 
new IcWebSocket(gateway, undefined,{
    canisterId : canisterId,
    identity : generateRandomIdentity(),
    networkUrl : icUrl,
    canisterActor : createActor(canisterId),

});