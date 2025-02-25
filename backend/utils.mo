import Text "mo:base/Text";
import Source "mo:uuid/async/SourceV4";
import UUID "mo:uuid/UUID";

module {

    public func generateUUID() : async Text {
        let g = Source.Source();
        return UUID.toText(await g.new());
    }

}