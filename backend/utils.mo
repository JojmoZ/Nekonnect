import Text "mo:base/Text";
import Source "mo:uuid/async/SourceV4";
import UUID "mo:uuid/UUID";

module {

    public type Response<T> = {
        status : Nat;
        message : Text;
        data : T
    };

    public func generateUUID() : async Text {
        let g = Source.Source();
        return UUID.toText(await g.new());
    }

}