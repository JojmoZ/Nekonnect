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
    loading: boolean;
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
  const [loading, setLoading] = useState<boolean>(false);

  const logoutProcess = async () => {
    try {
      await userService.logout();

    } catch (err) {
      console.error('Failed to logout:', err);
    }
  }

  const logout = async () => {
    toast.promise(logoutProcess(), {
      loading: 'Logging out...',
      success: () => {
        setUser(null);
        setIsAuthenticated(false);
        window.location.href = '/';
        return 'Logged out successfully';
      },
      error: 'Failed to log out',
    });
  };

  const loginProcess = async () => {
    try {
      const loggedInUser = await userService.login();
      if (loggedInUser) {
        console.log('Logged in user:', loggedInUser);
        setUser(loggedInUser);

        if (!loggedInUser.username || loggedInUser.username.trim() === '') {
          console.log('Redirecting to edit profile...');
          window.location.href = '/edit-profile'; 
        } else {
          console.log('Redirecting to home...');
          window.location.href = '/home'; 
        }
      } else {
        console.log('Failed to retrieve user information.');
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  const login = async () => {
    toast.promise(loginProcess(), {
      loading: 'Logging in...',
      success: 'Logged in successfully',
      error: 'Failed to log in',
    });
  }

  const fetchUser = async () => {
    startLoading();
    setLoading(true);
    const currentUser = await userService.me()
    if (currentUser) {
      setUser(currentUser);
      setIsAuthenticated(true);
    } else {
      setUser(null);
      setIsAuthenticated(false);
    }
    stopLoading();
    setLoading(false);
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
          isAuthenticated : isAuthenticated,
          loading: loading
        }
      }
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);