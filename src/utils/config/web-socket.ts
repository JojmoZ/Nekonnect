import IcWebSocket, {generateRandomIdentity} from "ic-websocket-js";
import { canisterId , createActor} from "@/declarations/chat";


const gateway = "ws://172.21.35.212:8080";
const icUrl = "http://127.0.0.1:4943";

export const webSocket = 
new IcWebSocket(gateway, undefined,{
    canisterId : canisterId,
    identity : generateRandomIdentity(),
    networkUrl : icUrl,
    canisterActor : createActor(canisterId),

});