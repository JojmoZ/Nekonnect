import List "mo:base/List";
import Principal "mo:base/Principal";
import Result "mo:base/Result";
import Types "types";

actor class UserMain() {

  stable var users: List.List<Types.User> = List.nil<Types.User>();

  public func getUserByPrincipal(identity : Principal) : async ?Types.User {
    List.find<Types.User>(users, func(user: Types.User) : Bool { user.internetIdentity == identity });
  };
  public func GetOwner() : async ?Types.User {
    List.find<Types.User>(users, func(user: Types.User) : Bool { user.role == "Owner" });
  };
  public func getAllUsers() : async [Types.User] {
    List.toArray(users);
  };

  public func editUserProfile(user : Types.User) : async Result.Result<Types.User, Text> {

    if (user.role == "Owner") {
      let owner = await GetOwner();
      switch (owner) {
        case (?owner) {
          return #err("Owner is exist");
        };
        case(null) {
        };
      }
    };
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

  public func reset() : async () {
    users := List.nil<Types.User>();
  };
  
  public func reduceBalance(user_id : Principal, amount: Float) : async Result.Result<Types.User, Text>{
    let user = await getUserByPrincipal(user_id);
    switch (user){
      case (null){
      return #err("User Not Found");
      };
      case(?user){
        let updatedUser = {
          user with
          balance = user.balance - amount;
        };
        users := List.filter<Types.User>(users, func (u: Types.User): Bool { 
          u.internetIdentity != user.internetIdentity 
        });
        users := List.push(updatedUser, users);
        return #ok(updatedUser);
      }
    }
  };
  public func topUpBalance(user_id : Principal, amount : Float) : async Result.Result<Types.User, Text> {
    let existingUser = await getUserByPrincipal(user_id);
    switch (existingUser) {
      case (null) {
        return #err("User not found");
      };
      case (?existingUser) {
        let updatedUser = {
          existingUser with
          balance = existingUser.balance + amount;
        };
        users := List.filter<Types.User>(users, func (u: Types.User): Bool { 
          u.internetIdentity != existingUser.internetIdentity 
        });
        users := List.push(updatedUser, users);
        return #ok(updatedUser);
      };
    };
  };
}