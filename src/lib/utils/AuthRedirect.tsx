import { useGetAuthenticated } from '@/hooks/user/use-get-authenticated';
import { Navigate, Outlet } from 'react-router-dom';


const AuthRedirect: React.FC = ( ) => {

  const { isAuthenticated } = useGetAuthenticated(); 
  
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }
  
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthRedirect;
