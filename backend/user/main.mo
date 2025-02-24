import List "mo:base/List";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Types "types";


actor class UserMain() {

  var users: List.List<Types.User> = List.nil<Types.User>();

  public func getUserByPrincipal(identity : Principal) : async ?Types.User {
    List.find<Types.User>(users, func(user: Types.User) : Bool { user.internetIdentity == identity });
  };

  public func getAllUsers() : async [Types.User] {
    List.toArray(users);
  };

  public func editUserProfile(user : Types.User) : async Result.Result<Types.User, Text> {
    let existingUser = await getUserByPrincipal(user.internetIdentity);
    switch (existingUser) {
      case (null) {
        return #err("User not found");
      };
      case (?existingUser) {
        let updatedUsers = List.filter<Types.User>(users, func (u: Types.User): Bool { 
          u.internetIdentity != existingUser.internetIdentity 
        });
        users := List.push(user, updatedUsers);
        return #ok(user);
      };
    };
  };

  public func createUser(user : Types.User) : async Result.Result<Types.User, Text> {
    let existingUser = await getUserByPrincipal(user.internetIdentity);
    switch (existingUser) {
      case (null) {
        users := List.push(user, users);
        return #ok(user);
      };
      case (?existingUser) {
        return #ok(existingUser);
      };
    };
  };
}