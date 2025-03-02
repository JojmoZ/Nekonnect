module {
    public type User = {
        internetIdentity: Principal;
        username: Text;
        dob: Text; // Date of birth (format: YYYY-MM-DD)
        nationality: Text;
        gender: Text; // "Male", "Female", "Other"
        email: Text;
        faceEncoding: ?[Nat8];
    };
}
