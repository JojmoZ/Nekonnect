import List "mo:base/List";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";

actor Backend {
  // User registry feature
  type User = {
    username: Text;
    password: Text;
  };

  // Stable storage for registered users
  stable var users: List.List<User> = List.nil<User>();

  // Track logged-in users (mapping Principal -> Username)
  stable var loggedInUsers: List.List<(Principal, Text)> = List.nil<(Principal, Text)>();

  // Function to register a new user
  public shared ({ caller }) func register(username: Text, password: Text) : async Text {
    if (List.find<User>(users, func(user: User) : Bool { user.username == username }) != null) {
      return "Username already exists!";
    };

    let newUser: User = { username = username; password = password };
    users := List.push<User>(newUser, users);

    return "User registered successfully!";
  };

  // Function to login a user
  public shared ({ caller }) func login(username: Text, password: Text) : async Text {
    switch (List.find<User>(users, func(user: User) : Bool { user.username == username and user.password == password })) {
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

  // Function to logout a user
  public shared ({ caller }) func logout() : async Text {
    loggedInUsers := List.filter<(Principal, Text)>(loggedInUsers, func(entry: (Principal, Text)) : Bool { entry.0 != caller });
    return "Logged out successfully!";
  };
};
