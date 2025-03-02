import { useService } from '@/context/service-context';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';


const AuthRedirect: React.FC = ( ) => {
  const { userService } = useService();
  const [ isAuthenticated, setIsAuthenticated ] = useState<Boolean | null>(null);
  
  useEffect(() => {
    userService.isAuthenticated().then(isAuthenticated => {
      setIsAuthenticated(isAuthenticated);
    })
  }, []);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthRedirect;
