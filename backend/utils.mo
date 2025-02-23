import Text "mo:base/Text";
module {

    public type Response<T> = {
        status : Nat;
        message : Text;
        data : T
    }

}