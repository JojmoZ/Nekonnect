import { Actor, HttpAgent } from '@dfinity/agent';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { idlFactory, canisterId } from '../declarations/backend';
interface LoginPageProps {
  username: any;
  setUsername: (username: any) => void;
}

const TempPage: React.FC<LoginPageProps> = ({ username, setUsername }) => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      const agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });
      await agent.fetchRootKey();

      const backend = Actor.createActor(idlFactory, { agent, canisterId });

      await backend.logout();
      setUsername(null); // Clear user in frontend state
      navigate('/login');
    } catch (err) {
      console.error('Logout Error:', err);
    }
  };

  return (
    <div>
      <h1>Welcome, {username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default TempPage;
