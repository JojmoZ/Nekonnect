import Types "types";
import Text "mo:base/Text";
import Time "mo:base/Time";
import List "mo:base/List";
import Error "mo:base/Error";
import Utils "../utils";
import LoanPostModule "../loanPost/interface";

actor class TransactionMain() {

    stable var transactions: List.List<Types.Transaction> = List.nil<Types.Transaction>();

    public shared ({ caller }) func createTransaction(loanId : Text, amount : Float, method : Text, loanPostCanisterId : Text) : async Text {

        let transactionId = await Utils.generateUUID();

        let transaction = {
            transactionId = transactionId;
            loanId = loanId;
            amount = amount;
            date = Utils.timeToDateString(Time.now());
            method = method;
            status = "Ongoing";
            lender = caller;
        };

        let loanPostActor = actor (loanPostCanisterId) : LoanPostModule.LoanPostActor;
        let update = await loanPostActor.updateRaisedAmount(loanId, amount);

        if (update != "Raised amount updated successfully!") {
            return update;
        };

        transactions := List.push<Types.Transaction>(transaction, transactions);

        return "Transaction created successfully!";
    };

    public shared query func getTransactions(): async [Types.Transaction] {
        return List.toArray(transactions);

    };

    public shared query ({ caller }) func getUserTransactions(): async [Types.Transaction] {
        return List.toArray(List.filter<Types.Transaction>(transactions, func (transaction: Types.Transaction): Bool = transaction.lender == caller ));
    };
}