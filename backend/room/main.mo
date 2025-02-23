import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Result "mo:base/Result";
import Option "mo:base/Option";
import Iter "mo:base/Iter";
import Types "types";


actor class RoomMain() {
    let rooms = HashMap.HashMap<Text, Types.Room>(10,Text.equal,Text.hash);

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
