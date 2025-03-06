import useServiceContext from "@/hooks/use-service-context";
import { LoanPost } from "@/lib/model/entity/loan-post";
import { Principal } from "@dfinity/principal";
import { createContext, useEffect, useState } from "react";

type LoanPostContextType = {
  loanPosts: LoanPost[];
  selectedPost: LoanPost | null;
  setSelectedPost: (post: LoanPost | null) => void;
  fetchUsernameByPrincipal: (principal: Principal) => Promise<string>;
};

export const LoanPostContext = createContext<LoanPostContextType>({} as LoanPostContextType);

type LoanPostProviderProps = {
    loanPosts: LoanPost[];
    children: React.ReactNode;
  };
  
export const LoanPostProvider: React.FC<LoanPostProviderProps> = ({ loanPosts, children }) => {
    const [selectedPost, setSelectedPost] = useState<LoanPost | null>(null);
    const { userService } = useServiceContext();
    const [usernameCache, setUsernameCache] = useState<Record<string, string>>(
      {},
    );

    const fetchUsernameByPrincipal = async (principal: Principal) => {
      const principalText = principal.toText(); // <-- Convert Principal to string

      if (usernameCache[principalText]) {
        return usernameCache[principalText]; // Use cache if available
      }

      const user = await userService.getUserByPrincipal(principal); // Make sure this returns the user object
      const username = user?.username ?? principalText; // fallback to principal if username is missing

      setUsernameCache((prev) => ({ ...prev, [principalText]: username }));

      return username;
    };

    useEffect(() => {
      // Check if the selected post is in the loanPosts array
      if (selectedPost) {
        const post = loanPosts.find((post) => post.loanId === selectedPost.loanId);
        if (!post) {
          setSelectedPost(null);
        }
      }
    }, [loanPosts]);

    return (
        <LoanPostContext.Provider value={{ loanPosts, selectedPost, setSelectedPost, fetchUsernameByPrincipal }}>
        {children}
        </LoanPostContext.Provider>
    );
};