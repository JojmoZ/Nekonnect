import { useGetAuthenticated } from '@/hooks/user/use-get-authenticated';
import LoadingScreen from '@/pages/(public)/loading';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useGetAuthenticated(); 
  
  if (isAuthenticated === null) {
    return <LoadingScreen />;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
