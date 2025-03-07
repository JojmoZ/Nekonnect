import Types "types";
import Text "mo:base/Text";
import Time "mo:base/Time";
import List "mo:base/List";
import Error "mo:base/Error";
import Principal "mo:base/Principal";
import Debug "mo:base/Debug";
import Utils "../utils";
import LoanPostModule "../loanPost/interface";
import UserActor "canister:user";

actor class TransactionMain() {

    stable var transactions: List.List<Types.Transaction> = List.nil<Types.Transaction>();

    func findTransaction(transactionId: Text) : ?Types.Transaction {
        List.find<Types.Transaction>(transactions, func(transaction: Types.Transaction): Bool = transaction.transactionId == transactionId);
    };

    func updateTransaction(transactionId: Text, updateFn: Types.Transaction -> Types.Transaction) : List.List<Types.Transaction> {
        List.map<Types.Transaction, Types.Transaction>(
            transactions,
            func(transaction: Types.Transaction): Types.Transaction {
                if (transaction.transactionId == transactionId) {
                    return updateFn(transaction);
                } else {
                    return transaction;
                }
            }
        );
    };

    public shared ({ caller }) func createTransaction(loanId : Text, amount : Float, method : Text, loanPostCanisterId : Text, userId : Principal) : async Text {

        let transactionId = await Utils.generateUUID();
        let transaction = {
            transactionId = transactionId;
            loanId = loanId;
            amount = amount;
            date = Time.now();
            method = method;
            status = "Ongoing";
            lender = userId;
        };
        let loanPostActor = actor (loanPostCanisterId) : LoanPostModule.LoanPostActor;
        let update = await loanPostActor.updateRaisedAmount(loanId, amount);

        if (update != "Raised amount updated successfully!") {
            return update;
        }

        let _ = await UserActor.reduceBalance(userId,amount);
        transactions := List.push<Types.Transaction>(transaction, transactions);

        return "Transaction created successfully!";
    };

    public shared query func getTransactions(): async [Types.Transaction] {
        return List.toArray(transactions);

    };

    public shared query ({ caller }) func getUserTransactions(): async [Types.Transaction] {
        return List.toArray(List.filter<Types.Transaction>(transactions, func (transaction: Types.Transaction): Bool = transaction.lender == caller ));
    };

    // Get loan post transaction
    public shared query func getLoanPostTransactions(loanId : Text): async [Types.Transaction] {
        return List.toArray(List.filter<Types.Transaction>(transactions, func (transaction: Types.Transaction): Bool = transaction.loanId == loanId ));
    };

    public shared func updateTransactionStatus(transactionId : Text, status : Text) : async Text {
        switch (findTransaction(transactionId)) {
            case (null) { return "Transaction not found!"; };
            case (?transaction) {
                let updatedTransaction : Types.Transaction = {
                    transaction with
                    status = status;
                };
                transactions := updateTransaction(transactionId, func(_) = updatedTransaction);

                return "Transaction updated successfully!";
            };
        };
    };
}