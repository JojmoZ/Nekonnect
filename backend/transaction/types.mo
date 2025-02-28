import Types "../user/types";
import Principal "mo:base/Principal";
module {

    type User = Types.User;

    public type Transaction = {
        transactionId: Text;
        loanId: Text;
        amount: Float;
        date: Text;
        method: Text;
        lender: Principal;
    }
}