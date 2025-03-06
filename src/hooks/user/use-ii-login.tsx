import { useNavigate } from 'react-router-dom';
import useServiceContext from '@/hooks/use-service-context';
import { useGetAuthenticated } from '@/hooks/user/use-get-authenticated';

export const useIILogin = () => {
  const navigate = useNavigate();
  const { userService } = useServiceContext();
  const { fetch } = useGetAuthenticated();

  const handleIILogin = async () => {
    try {
      const loggedInUser = await userService.login();

      if (loggedInUser) {
        console.log('Logged in user:', loggedInUser);
        fetch();

        if (!loggedInUser.username || loggedInUser.username.trim() === '') {
          console.log('Redirecting to edit profile...');
          navigate('/edit-profile'); // No username → go to edit profile
        } else {
          console.log('Redirecting to home...');
          navigate('/home'); // Username exists → go to home
        }
      } else {
        console.log('Failed to retrieve user information.');
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
  };

  return { handleIILogin };
};