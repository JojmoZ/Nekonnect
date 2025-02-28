import Nat64 "mo:base/Nat64";
import Nat8 "mo:base/Nat8";

module {

    public type LoanPost = {
        loanId: Text;
        title: Text;
        description: Text;
        goal: Float;
        raised: Float;
        createdAt: Text;
        verifiedAt: Text;
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
        assuranceFile: [Nat8];
    }

}