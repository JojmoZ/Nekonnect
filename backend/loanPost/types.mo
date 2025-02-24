import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";

module {

    public type LoanPost = {
        id: Text;
        title: Text;
        description: Text;
        amount: Float;
        assurance: Float;
        interest: Float;
        createAt: Time.Time;
        postDuration: Nat64;
        loanLength: Nat64;
        debtor: Principal;
    }
}