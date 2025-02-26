import Nat64 "mo:base/Nat64";
import HashMap "mo:base/HashMap";
import Text "mo:base/Text";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Int64 "mo:base/Int64";
import Array "mo:base/Array";
import List "mo:base/List";
import Nat "mo:base/Nat";
import Float "mo:base/Float";
import Types "types";
import Utils "../utils"

actor class LoanPostMain() {
    stable var posts: List.List<Types.LoanPost> = List.nil<Types.LoanPost>();

    public shared ({ caller }) func createPost(title : Text, description : Text, goal : Float, category : Text, loanDuration : Nat64) : async Text {
        let id = await Utils.generateUUID();

        let post = {
            loanId = id;
            title = title;
            description = description;
            goal = goal;
            raised = Float.fromInt(0);
            postDuration = Nat64.fromIntWrap(30);
            loanDuration = loanDuration;
            createdAt = Time.now();
            category = category;
            isFulfilled = false;
            debtor = caller;
        };

        posts := List.push<Types.LoanPost>(post, posts);

        return "Post created successfully!";
    };

    public shared query func getPosts() : async [Types.LoanPost] {
        return List.toArray(posts);
    };

    // public shared query func getActivePosts() : async [Types.LoanPost] {
    //     let currentTime = Int64.fromInt(Time.now()); 
    //     let activePosts = List.filter<Types.LoanPost>(
    //         posts,
    //         func(post: Types.LoanPost): Bool {
    //             currentTime <= post.createAt + Int64.fromNat64(post.postDuration)
    //         }
    //     );
    //     return List.toArray(activePosts);

    // };
}