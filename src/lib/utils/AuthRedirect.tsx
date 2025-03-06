import { useGetAuthenticated } from '@/hooks/user/use-get-authenticated';
import LoadingScreen from '@/pages/(public)/loading';
import { Navigate, Outlet } from 'react-router-dom';


const AuthRedirect: React.FC = ( ) => {

  const { isAuthenticated } = useGetAuthenticated(); 
  
  if (isAuthenticated === null) {
    return <LoadingScreen text='Authenticating' />;
  }
  
  return isAuthenticated ? <Navigate to="/" replace /> : <Outlet />;
};

export default AuthRedirect;
