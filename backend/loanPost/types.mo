import Nat64 "mo:base/Nat64";
import Time "mo:base/Time";

module {

    public type LoanPost = {
        loanId: Text;
        title: Text;
        description: Text;
        goal: Float;
        raised: Float;
        createdAt: Time.Time;
        postDuration: Nat64;
        category: Text;
        loanDuration: Nat64;
        isFulfilled: Bool;
        isVerified: Bool;
        debtor: Principal;
        assuranceId: Text;
    };

    public type LoanAssurance = {
        assuranceId: Text;
        assuranceType: Text;
        assuranceFile: Text;
    }

}