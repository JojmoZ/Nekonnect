import { LoanPost } from "@/lib/model/entity/loan-post";
import { createContext, useEffect, useState } from "react";

type LoanPostContextType = {
  loanPosts: LoanPost[];
  selectedPost: LoanPost | null;
  setSelectedPost: (post: LoanPost | null) => void;
};

export const LoanPostContext = createContext<LoanPostContextType>({} as LoanPostContextType);

type LoanPostProviderProps = {
    loanPosts: LoanPost[];
    children: React.ReactNode;
  };
  
export const LoanPostProvider: React.FC<LoanPostProviderProps> = ({ loanPosts, children }) => {
    const [selectedPost, setSelectedPost] = useState<LoanPost | null>(null);

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
        <LoanPostContext.Provider value={{ loanPosts, selectedPost, setSelectedPost }}>
        {children}
        </LoanPostContext.Provider>
    );
};