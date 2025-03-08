import Types "types";
module {
    type LoanPost = Types.LoanPost;

    public type LoanPostActor = actor {
        getPost: (loanId: Text) -> async LoanPost;
        updateRaisedAmount: (loanId: Text, amount: Float, transactionCanisterId: Text) -> async Text;
    }
}