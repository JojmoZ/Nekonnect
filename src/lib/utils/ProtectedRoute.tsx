import { useGetAuthenticated } from '@/hooks/user/use-get-authenticated';
import LoadingScreen from '@/pages/(public)/loading';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { RoleEnum } from '../enum/role-enum';
import { toast } from 'sonner';

interface IProps {
  role : RoleEnum
}

const ProtectedRoute = ({role} : IProps) => {
  const { isAuthenticated, me, loading } = useGetAuthenticated();
  const location = useLocation();

  console.log("test")
  
  if (isAuthenticated === null) {
    return <LoadingScreen text='Navigating you' />;
  }

  if ((!isAuthenticated || me === null || me.role !== role) && me?.role !== RoleEnum.ADMIN) {
    toast.error('You are not authorized to access this page.');
    return <Navigate to="/" replace />;
  }
  // (isAuthenticated && location.pathname.includes("edit-profile")) 

  if (
    (me.username == '' || me.username == null) &&
    !location.pathname.includes('edit-profile')
  ) {
    toast.error('Please complete your profile.');
    return <Navigate to="/edit-profile" replace />;
  } 


  return <Outlet />
};

export default ProtectedRoute;
