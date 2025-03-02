import Types "../user/types";
import Principal "mo:base/Principal";
import Time "mo:base/Time";
module {

    type User = Types.User;

    let _status = ["Ongoing", "Not Fulfilled", "Refunded", "Repaid"];

    public type Transaction = {
        transactionId: Text;
        loanId: Text;
        amount: Float;
        date: Time.Time;
        method: Text;
        status: Text;
        lender: Principal;
    }
}