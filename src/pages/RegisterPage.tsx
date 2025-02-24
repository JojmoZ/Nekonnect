import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Actor, HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { idlFactory, canisterId } from '../declarations/user';

const RegisterPage = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
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
        canisterId: canisterId, // Your backend canister ID
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

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const scan = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append('image', image);

    const response = await fetch('http://localhost:5000/ocr', {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    console.log(data.error);
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
        <div>
          <input
            type="file"
            name=""
            id=""
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="w-full">
          Register
        </button>
      </form>
      <button onClick={scan}>Scan</button>
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
