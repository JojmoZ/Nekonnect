import Types "../user/types";
import Principal "mo:base/Principal";
module {

    type User = Types.User;

    let _status = ["Ongoing", "Not Fulfilled", "Refunded", "Repaid"];

    public type Transaction = {
        transactionId: Text;
        loanId: Text;
        amount: Float;
        date: Text;
        method: Text;
        status: Text;
        lender: Principal;
    }
}