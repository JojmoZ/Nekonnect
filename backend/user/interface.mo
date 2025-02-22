import Types "types";
module {
    type User = Types.User;

    public type UserActor = actor {
        getUser: (username: Text) -> async ?User;
    }
}