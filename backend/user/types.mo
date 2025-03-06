import Nat8 "mo:base/Nat8";
import Text "mo:base/Text";
module {
    public type User = {
        internetIdentity: Principal;
        username: Text;
        dob: Text; // Date of birth (format: YYYY-MM-DD)
        nationality: Text;
        gender: Text; // "Male", "Female", "Other"
        email: Text;
        balance: Float;
        profilePicture: [Nat8];
        faceEncoding: ?[Float];
        role : Text;
    };
}
