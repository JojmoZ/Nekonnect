import { useGetAuthenticated } from '@/hooks/user/use-get-authenticated';
import { Navigate, Outlet } from 'react-router-dom';


const ProtectedRoute: React.FC = () => {
  const { isAuthenticated } = useGetAuthenticated(); 
  
  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
