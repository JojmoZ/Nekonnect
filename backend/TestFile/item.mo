import Types "./types";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Iter "mo:base/Iter";

persistent actor ItemsManager {
   transient var storedFiles: HashMap.HashMap<Text, Types.Item> = HashMap.HashMap<Text, Types.Item>(10, Text.equal, Text.hash);

  public shared func uploadFile(name: Text, content: [Nat8]): async Bool {
    storedFiles.put(name, { name = name; content = content });
    return true;
  };

  public shared query func getUploadedFiles(): async [Text] {
    return Iter.toArray(storedFiles.keys());
  };

  public shared query func getFileContent(name: Text): async [Nat8] {
    switch (storedFiles.get(name)) {
      case (?file) { return file.content }; // ✅ Always return an array
      case null { return [] }; // ✅ Return empty array instead of `null`
    };
  };
}
