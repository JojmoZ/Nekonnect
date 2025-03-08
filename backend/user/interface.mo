import Types "types";
import Result "mo:base/Result";
module {
    type User = Types.User;

    public type UserActor = actor {
        getUserByPrincipal: (identity: Principal) -> async ?User;
        topUpBalance: (identity: Principal, amount: Float) -> async Result.Result<Types.User, Text>;
        reduceBalance: (user_id : Principal, amount: Float) -> async Result.Result<Types.User, Text>;
        GetOwner: () -> async ?Types.User;
    }
}