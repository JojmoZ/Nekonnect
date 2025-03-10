import Nat64 "mo:base/Nat64";
import Nat8 "mo:base/Nat8";
import Time "mo:base/Time";
import TransactionTypes "../transaction/types";

module {

    let _status = ["Verifying", "Funding", "Repaying", "Repaid"];

    public type Transaction = TransactionTypes.Transaction;

    public type LoanPost = {
        loanId: Text;
        title: Text;
        description: Text;
        image: [Nat8];
        goal: Float;
        raised: Float;
        multiplier: Float;
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
        debtor: Principal;
        assuranceId: Text;
        assuranceType: Text;
        assuranceFile: [Nat8];
    }

}