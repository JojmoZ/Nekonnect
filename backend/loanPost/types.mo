import Nat64 "mo:base/Nat64";
import Nat8 "mo:base/Nat8";
import Time "mo:base/Time";

module {

    let _status = ["Verifying", "Funding", "Repaying", "Repaid"];

    public type LoanPost = {
        loanId: Text;
        title: Text;
        description: Text;
        goal: Float;
        raised: Float;
        createdAt: Time.Time;
        verifiedAt: Time.Time;
        postDuration: Nat64;
        category: Text;
        loanDuration: Nat64;
        status: Text;
        debtor: Principal;
        assuranceId: Text;
    };

    public type LoanAssurance = {
        assuranceId: Text;
        assuranceType: Text;
        assuranceFile: [Nat8];
    }

}