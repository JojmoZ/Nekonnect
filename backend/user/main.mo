import List "mo:base/List";
import Principal "mo:base/Principal";
import Blob "mo:base/Blob";
import Nat8 "mo:base/Nat8";
import Time "mo:base/Time";
import Nat64 "mo:base/Nat64";
import Types "types";
import Fuzz "mo:fuzz";


actor class UserMain() {

  // Stable storage for registered users
  stable var users: List.List<Types.User> = List.nil<Types.User>();

  // Track logged-in users (mapping Principal -> Username)
  stable var loggedInUsers: List.List<(Principal, Text)> = List.nil<(Principal, Text)>();

  // Function to register a new user
  public shared ({ caller }) func register(username: Text, password: Text) : async Text {
    if (List.find<Types.User>(users, func(user: Types.User) : Bool { user.username == username }) != null) {
      return "Username already exists!";
    };

    let newUser: Types.User = { username = username; password = password ; internetIdentity = caller };
    users := List.push<Types.User>(newUser, users);

    return "User registered successfully!";
  };

  // Function to login a user
  public shared ({ caller }) func login(username: Text, password: Text) : async Text {
    switch (List.find<Types.User>(users, func(user: Types.User) : Bool { user.username == username and user.password == password })) {
      case (?user) {
        if (List.find<(Principal, Text)>(loggedInUsers, func(entry: (Principal, Text)) : Bool { entry.0 == caller }) == null) {
          loggedInUsers := List.push((caller, username), loggedInUsers);
        };
        return "Login successful!";
      };
      case null {
        return "Invalid username or password.";
      };
    };
  };

  // Function to get the logged-in user's username
  public shared ({ caller }) func getLoggedInUser() : async ?Text {
    switch (List.find<(Principal, Text)>(loggedInUsers, func(entry: (Principal, Text)) : Bool { entry.0 == caller })) {
      case (?entry) { ?entry.1 };  // Return username
      case null { null };          // No user found
    };
  };

  // Function to get a user
  public func getUser(username : Text) : async ?Types.User {
    List.find<Types.User>(users, func(user: Types.User) : Bool { user.username == username });
  };

  public func getUserByPrincipal(identity : Principal) : async ?Types.User {
    List.find<Types.User>(users, func(user: Types.User) : Bool { user.internetIdentity == identity });
  };

  // Function to logout a user
  public shared ({ caller }) func logout() : async Text {
    loggedInUsers := List.filter<(Principal, Text)>(loggedInUsers, func(entry: (Principal, Text)) : Bool { entry.0 != caller });
    return "Logged out successfully!";
  };

  public shared (msg) func getCallerPrincipal() : async Principal {
      return msg.caller;
  };

  public func generateFakePrincipal(id : Nat) : async Principal {
    let fuzz = Fuzz.Fuzz();
    let principal = fuzz.principal.randomPrincipal(10);
    principal;
  };
}