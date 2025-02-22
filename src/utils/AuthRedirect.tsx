import { Navigate, Outlet } from 'react-router-dom';

interface AuthRedirectProps {
  isAuthenticated: boolean;
}

const AuthRedirect: React.FC<AuthRedirectProps> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Navigate to="/temp" replace /> : <Outlet />;
};

export default AuthRedirect;
