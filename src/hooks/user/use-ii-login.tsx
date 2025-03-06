import { useNavigate } from 'react-router-dom';
import useServiceContext from '@/hooks/use-service-context';
import { useGetAuthenticated } from '@/hooks/user/use-get-authenticated';
import { toast } from 'sonner';

export const useIILogin = () => {
  const navigate = useNavigate();
  const { userService } = useServiceContext();
  const { fetch } = useGetAuthenticated();

  const IILogin = async () => { 
    try {
      const loggedInUser = await userService.login();

      if (loggedInUser) {
        console.log('Logged in user:', loggedInUser);
        fetch();

        if (!loggedInUser.username || loggedInUser.username.trim() === '') {
          console.log('Redirecting to edit profile...');
          navigate('/edit-profile'); 
        } else {
          console.log('Redirecting to home...');
          navigate('/home'); 
        }
      } else {
        console.log('Failed to retrieve user information.');
      }
    } catch (err) {
      console.error('Auth error:', err);
    }
  }

  const handleIILogin = async () => {
    toast.promise(IILogin(), {
      loading: 'Logging in...',
      success: 'Logged in successfully',
      error: 'Failed to log in',
    });
  };

  return { handleIILogin };
};