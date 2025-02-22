import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Actor, HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { idlFactory } from '../declarations/backend';

const RegisterPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<any | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    try {
      // Use an anonymous identity in local development
      const agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });

      // Fetch latest root key (needed for local development)
      await agent.fetchRootKey();

      // Create backend actor
      const backend = Actor.createActor(idlFactory, {
        agent,
        canisterId: 'bkyz2-fmaaa-aaaaa-qaaaq-cai', // Your backend canister ID
      });

      // Call the register function in the backend
      const response = await backend.register(username, password);

      if (response === 'User registered successfully!') {
        setSuccess(response);
        setTimeout(() => navigate('/login'), 2000);
      } else {
        setError(response);
      }
    } catch (err) {
      setError('Registration failed.');
      console.error('Error:', err);
    }
  };


  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <h2 className="text-2xl font-semibold text-center mb-4 text-blue-500">
        Register
      </h2>
      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label htmlFor="username">Username</label>
          <input
            className="text-black"
            id="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button type="submit" className="w-full">
          Register
        </button>
      </form>
      {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
      {success && <p className="mt-4 text-green-500 text-center">{success}</p>}
      <p className="mt-4 text-center">
        Already have an account?{' '}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login here
        </Link>
      </p>
    </div>
  );
};

export default RegisterPage;
