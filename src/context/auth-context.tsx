import useServiceContext from "@/hooks/use-service-context";
import { User } from "@/lib/model/entity/user";
import { createContext, useEffect, useState } from "react";
import { toast } from "sonner";

interface AuthContextProps {
    user: User | null | undefined;
    setUser: (user: User | null | undefined) => void;
    // login: () => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
  }
  
  interface AuthProps {
    children: React.ReactNode;
  }
  
  export const AuthContext = createContext<AuthContextProps>({
    user: undefined,
    setUser: () => undefined,
    // login: async () => undefined,
    logout: async () => undefined,
    fetchUser: async () => undefined,
  });
  
  export function AuthProvider({ children }: AuthProps) {
    const [user, setUser] = useState<User | undefined | null>();
    const { userService } = useServiceContext();
  
    const handleLogout = async () => {
      const toastId = toast.loading('Signing you out...');
  
      try {
        await userService.logout();
  
        setUser(null);
  
        toast.success('Signed out successfully!', { id: toastId });
      } catch (error) {
        toast.error('Failed to sign out', { id: toastId });
      }
    };
  
    const fetchUser = async () => {
      const result = await userService.me();
      if (!result || 'err' in result) {
        await userService.logout();
        setUser(null);
        return;
      }
  
      setUser(result);
    };
  
    useEffect(() => {
      if (user === undefined) {
        fetchUser();
      }
    }, []);
  
    return (
      <AuthContext.Provider
        value={{
          user,
          setUser,
          logout: handleLogout,
          fetchUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }