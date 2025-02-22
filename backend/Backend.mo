import List "mo:base/List";
import Text "mo:base/Text";
import Principal "mo:base/Principal";
import Iter "mo:base/Iter";
import Debug "mo:base/Debug";

actor Backend {
  // Counter feature
  stable var counter = 0;

  public query func get() : async Nat {
    counter;
  };

  public func inc() : async () {
    counter += 1;
  };

  public func add(n : Nat) : async () {
    counter += n;
  };

  // User registry feature
  type User = {
    username: Text;
    password: Text;
  };

  // Use `List<User>` to make it stable
  stable var users: List.List<User> = List.nil<User>();

  // Function to register a new user
  public shared ({ caller }) func register(username: Text, password: Text) : async Text {
    if (List.find<User>(users, func(user: User) : Bool { user.username == username }) != null) {
      return "Username already exists!";
    };

    let newUser: User = { username = username; password = password };
    users := List.push<User>(newUser, users);  // Correctly append to List<User>

    return "User registered successfully!";
  };

  // Function to retrieve user info (for testing)
  public query func getUser(username: Text) : async ?User {
    return List.find<User>(users, func(user: User) : Bool { user.username == username });
  };
};
