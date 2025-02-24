import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Actor, HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { idlFactory, canisterId } from '../declarations/user';
import { UserService } from '@/services/user.service';

interface LoginPageProps {
  setUsername: (username: string) => void;
}

// const II_URL = 'https://identity.ic0.app'; // Mainnet Internet Identity URL
const II_URL = `http://rdmx6-jaaaa-aaaaa-aaadq-cai.localhost:4943/`

const userService = new UserService();

const LoginPage: React.FC<LoginPageProps> = ({ setUsername }) => {
  const [username, setLocalUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleTraditionalLogin = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();
    setError(null);

    try {
      const agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });
      await agent.fetchRootKey();

      const backend = Actor.createActor(idlFactory, { agent, canisterId });

      // Call login function
      const response: any = await backend.login(username, password);

      if (response === 'Login successful!') {
        // Fetch user session
        const loggedInUser: any | null = await backend.getLoggedInUser();
        if (loggedInUser) {
          setUsername(loggedInUser);
          localStorage.setItem('username', loggedInUser);
          navigate('/temp'); // Redirect after successful login
        } else {
          setError('Login failed. Please try again.');
        }
      } else {
        setError(response);
      }
    } catch (err) {
      console.error('Login Error:', err);
      setError('Login failed.');
    }
  };


  // 🔹 Handle Internet Identity Login
  const handleIIlogin = async () => {
    try {
      await userService.ensureInitialized();
      const response = await userService.login();
      console.log(response)
      navigate("/edit-profile")

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

      <form onSubmit={handleTraditionalLogin} className="space-y-4">
        <div>
          <label htmlFor="username">Username</label>
          <input
            className="text-black"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setLocalUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            className="text-black"
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded"
        >
          Login
        </button>
      </form>

      <button
        onClick={handleIIlogin}
        className="mt-4 w-full bg-gray-800 text-white py-2 rounded"
      >
        Login with Internet Identity
      </button>

      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}

      <p className="mt-4 text-center">
        Don’t have an account?{' '}
        <Link to="/register" className="text-blue-500 hover:underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
