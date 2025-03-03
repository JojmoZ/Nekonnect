import Types "types";
module {
    type Transaction = Types.Transaction;

    public type TransactionActor = actor {
        getLoanPostTransactions: (loanId: Text) -> async [Transaction];
        updateTransactionStatus: (transactionId: Text, status: Text) -> async Text;
    }
}