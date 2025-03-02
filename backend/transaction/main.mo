import Types "../user/types";
import Text "mo:base/Text";
import UserModule "../user/interface";

actor class TransactionMain() {

    // dummy function for now
    public func getTransactionUserDetail(username : Text, userCanisterId : Text) : async ?Types.User {
        let userActor = actor (userCanisterId) : UserModule.UserActor;
        return await userActor.getUser(username);
    }
}