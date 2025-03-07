import Nat64 "mo:base/Nat64";
import Text "mo:base/Text";
import Time "mo:base/Time";
import List "mo:base/List";
import Float "mo:base/Float";
import Error "mo:base/Error";
import Timer "mo:base/Timer";
import Nat8 "mo:base/Nat8";
import Types "types";
import Utils "../utils";
import TransactionModule "../transaction/interface";
import UserActor "canister:user";

actor class LoanPostMain() {
    stable var posts: List.List<Types.LoanPost> = List.nil<Types.LoanPost>();
    stable var assurances: List.List<Types.LoanAssurance> = List.nil<Types.LoanAssurance>();

    func findPost(loanId: Text) : ?Types.LoanPost {
        List.find<Types.LoanPost>(posts, func(post: Types.LoanPost): Bool = post.loanId == loanId);
    };

    func updatePost(loanId: Text, updateFn: Types.LoanPost -> Types.LoanPost) : List.List<Types.LoanPost> {
        List.map<Types.LoanPost, Types.LoanPost>(
            posts,
            func(post: Types.LoanPost): Types.LoanPost {
                if (post.loanId == loanId) {
                    return updateFn(post);
                } else {
                    return post;
                }
            }
        );
    };

    func findAssurance(assuranceId: Text) : ?Types.LoanAssurance {
        List.find<Types.LoanAssurance>(assurances, func(assurance: Types.LoanAssurance): Bool = assurance.assuranceId == assuranceId);
    };

    public shared ({ caller }) func createPost(
        title: Text,
        description: Text,
        image: [Nat8],
        goal: Float,
        category: Text,
        debtor: Principal,
        loanDuration: Nat64,
        assuranceType: Text,
        assuranceFile: [Nat8]
    ) : async Text {
        let id = await Utils.generateUUID();
        let assuranceId = await Utils.generateUUID();

        let post : Types.LoanPost = {
            loanId = id;
            title = title;
            description = description;
            image = image;
            goal = goal;
            raised = 0.0;
            multiplier = 1.0;
            postDuration = 30;
            loanDuration = loanDuration;
            createdAt = Time.now();
            verifiedAt = 0;
            category = category;
            status = "Verifying";
            debtor = debtor;
            assuranceId = assuranceId;
        };

        let assurance : Types.LoanAssurance = {
            assuranceId = assuranceId;
            assuranceType = assuranceType;
            assuranceFile = assuranceFile;
        };

        assurances := List.push(assurance, assurances);
        posts := List.push(post, posts);

        return "Post created successfully!";
    };

    public shared query func getPosts() : async [Types.LoanPost] {
        List.toArray(posts);
    };

    public shared query func getPost(loanId: Text) : async Types.LoanPost {
        switch (findPost(loanId)) {
            case (?post) { post };
            case (null) { throw Error.reject("Post not found!"); };
        };
    };

    public shared query func getActivePosts() : async [Types.LoanPost] {
        List.toArray(List.filter(posts, func(post: Types.LoanPost): Bool = post.status == "Funding"));
    };

    public shared query func getUnverifiedPosts() : async [Types.LoanPost] {
        List.toArray(List.filter(posts, func(post: Types.LoanPost): Bool = post.status == "Verifying"));
    };

    public shared func acceptPost(loanId: Text, transactionCanisterId: Text) : async Text {
        switch (findPost(loanId)) {
            case (null) { return "Post not found!"; };
            case (?post) {
                let updatedPost : Types.LoanPost = {
                    post with
                    status = "Funding";
                    verifiedAt = Time.now();
                };
                posts := updatePost(loanId, func(_) = updatedPost);

                // Update post status after 30 days
                // let delay = 1_000_000_000 * 30 * 60 * 60 * 24;
                let delay = 1_000_000_000 * 60 * 5; // 1 minute in nanoseconds
                let timer = Timer.setTimer(#nanoseconds (delay), func (): async () {
                    ignore checkPostGoal(loanId, transactionCanisterId);
                });

                return "Post verified successfully!";
            };
        };
    };

    public shared func rejectPost(loanId: Text) : async Text {
        switch (findPost(loanId)) {
            case (null) { return "Post not found!"; };
            case (?post) {
                let updatedPost : Types.LoanPost = {
                    post with
                    status = "Rejected";
                };
                posts := updatePost(loanId, func(_) = updatedPost);
                return "Post rejected successfully!";
            };
        };
    };

    public shared query func getAssurance(assuranceId: Text) : async Types.LoanAssurance {
        switch (findAssurance(assuranceId)) {
            case (?assurance) { assurance };
            case (null) { throw Error.reject("Assurance not found"); };
        };
    };

    public shared func updateRaisedAmount(loanId: Text, amount: Float) : async Text {
        switch (findPost(loanId)) {
            case (null) { return "Post not found!"; };
            case (?post) {
                var status = post.status;

                if (status != "Funding") {
                    return "Post is not in funding state! Status: " # status;
                };

                if (post.raised + amount > post.goal) {
                    return "Amount exceeds the goal! Raised: " # Float.toText(post.raised);
                };

                // Should I cancel the timer?

                if (post.raised + amount == post.goal) {
                    status := "Repaying";
                };

                let updatedPost : Types.LoanPost = {
                    post with
                    raised = post.raised + amount;
                    status = status;
                };
                posts := updatePost(loanId, func(_) = updatedPost);
                return "Raised amount updated successfully!";
            };
        };
    };

    // Not fulfilled post, update status
    public func checkPostGoal(loanId: Text, transactionCanisterId: Text): async () {

        switch(findPost(loanId)) {
            case(null) { 
                return;
             };
            case(?post) { 
                var loanStatus = post.status;
                var transactionStatus = "";
                if (post.raised < post.goal) {
                    loanStatus := "Not Fulfilled";
                    transactionStatus := "Not Fulfilled";
                    let _  = await UserActor.topUpBalance()
                } else {
                    loanStatus := "Repaying";
                    transactionStatus := "Repaying";
                };

                let updatedPost : Types.LoanPost = {
                    post with
                    status = loanStatus;
                };
                posts := updatePost(post.loanId, func(_) = updatedPost);

                // Get post transactions
                let transactionActor = actor(transactionCanisterId) : TransactionModule.TransactionActor;
                let transactions = await transactionActor.getLoanPostTransactions(post.loanId);

                // Update transaction status for each transaction
                for (transaction in transactions.vals()) {
                    let updateResult = await transactionActor.updateTransactionStatus(transaction.transactionId, transactionStatus);
                };

            };
        };
    };


    // TODO: Loan duration + goal + interest calculation
    // public func calculateMultiplier(loanDuration: Nat64, goal: Float) : Float {
    //     // Calculation
    //     return 0
    // }

    // TODO: Repay loan
}