import useServiceContext from "@/hooks/use-service-context";
import { User } from "@/lib/model/entity/user";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { useLayout } from "./layout-context";

interface AuthContextProps {
    me: User | null;
    isAuthenticated: Boolean | null;
    setUser: (user: User ) => void;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    fetchUser: () => Promise<void>;
  }
  
interface AuthProps {
  children: React.ReactNode;
}
  
export const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export function AuthProvider({ children }: AuthProps) {
  const [user, setUser] = useState<User | null>(null);
  const { userService } = useServiceContext();
  const [ isAuthenticated, setIsAuthenticated ] = useState<Boolean | null>(null);
  const {startLoading, stopLoading} = useLayout();

  const logout = async () => {
    const toastId = toast.loading('Signing you out...');
    try {
      await userService.logout();
      setUser(null);
      setIsAuthenticated(false);
      window.location.href = '/';
      // toast.success('Signed out successfully!', { id: toastId });
    } catch (error) {
      // toast.error('Failed to sign out', { id: toastId });
    }
  };

  const login = async () => {
    startLoading()
    try {
      const loggedInUser = await userService.login();
      if (loggedInUser) {
        console.log('Logged in user:', loggedInUser);
        setUser(loggedInUser);

        if (!loggedInUser.username || loggedInUser.username.trim() === '') {
          console.log('Redirecting to edit profile...');
          window.location.href = '/edit-profile'; // No username → go to edit profile
        } else {
          console.log('Redirecting to home...');
          window.location.href = '/home'; // Username exists → go to home
        }
      } else {
        console.log('Failed to retrieve user information.');
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
    stopLoading()
  }

  const fetchUser = async () => {
    startLoading();
    const currentUser = await userService.me()
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    stopLoading();
  };

  

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={
        {
          me: user,
          setUser: setUser,
          login: login,
          logout: logout,
          fetchUser: fetchUser,
          isAuthenticated : isAuthenticated
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);