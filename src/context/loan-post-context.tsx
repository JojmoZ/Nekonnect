import { LoanPost } from "@/lib/model/entity/loan-post";
import { createContext, useState } from "react";

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

    return (
        <LoanPostContext.Provider value={{ loanPosts, selectedPost, setSelectedPost }}>
        {children}
        </LoanPostContext.Provider>
    );
};