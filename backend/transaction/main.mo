import Types "types";
import Text "mo:base/Text";
import Time "mo:base/Time";
import List "mo:base/List";
import Utils "../utils";

actor class TransactionMain() {

    // dummy function for now
    // public func getTransactionUserDetail(username : Text, userCanisterId : Text) : async ?Types.User {
    //     let userActor = actor (userCanisterId) : UserModule.UserActor;
    //     return await userActor.getUser(username);
    // }

    stable var transactions: List.List<Types.Transaction> = List.nil<Types.Transaction>();

    public shared ({ caller }) func createTransaction(loanId : Text, amount : Float, method : Text) : async Text {

        let transactionId = await Utils.generateUUID();

        let transaction = {
            transactionId = transactionId;
            loanId = loanId;
            amount = amount;
            date = Utils.timeToDateString(Time.now());
            method = method;
            lender = caller;
        };

        transactions := List.push<Types.Transaction>(transaction, transactions);

        return "Transaction created successfully!";
    };

    public shared query func getTransactions(): async [Types.Transaction] {
        return List.toArray(transactions);

    }
}