import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthClient } from '@dfinity/auth-client';
import { useService } from '@/context/service-context';

const LoginPage: React.FC = () => {

  const { userService } = useService();

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const handleIIlogin = async () => {
    try {
      const loggedInUser = await userService.login();

      if (loggedInUser) {
        console.log("Logged in user:", loggedInUser);

        if (!loggedInUser.username || loggedInUser.username.trim() === "") {
          console.log("Redirecting to edit profile...");
          
          navigate("/edit-profile"); // No username → go to edit profile
        } else {
          console.log("Redirecting to temp...");
          navigate("/temp"); // Username exists → go to temp
        }
      } else {
        setError("Failed to retrieve user information.");
      }
    } catch (err) {
      console.error('Auth error:', err);
      setError('Something went wrong. Try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold text-center mb-4 text-blue-500">
        Login
      </h2>

      <button
        onClick={handleIIlogin}
        className="mt-4 w-full bg-gray-800 text-white py-2 rounded"
      >
        Login with Internet Identity
      </button>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

    </div>
  );
};

export default LoginPage;
