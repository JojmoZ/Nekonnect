import Types "types";
module {
    type User = Types.User;

    public type UserActor = actor {
        getUserByPrincipal: (identity: Principal) -> async ?User;
    }
}