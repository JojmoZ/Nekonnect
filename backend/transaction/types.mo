import Types "../user/types";
module {

    type User = Types.User;

    // dummy type for now
    type Transaction = {
        id: Text;
        amount: Int;
        date: Text;
        description: Text;
        category: Text;
        account: Text;
        user: User;
    }
}