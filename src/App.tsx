import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Actor, HttpAgent } from '@dfinity/agent';
import { idlFactory, canisterId } from './declarations/user';

import RegisterPage from './pages/RegisterPage';
import TempPage from './pages/TempPage';
import LoginPage from './pages/LoginPage';
import AuthRedirect from './utils/AuthRedirect';
import ProtectedRoute from './utils/ProtectedRoute';
import { ChatPage } from './pages/(private)/chat';

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });
      await agent.fetchRootKey(); // Fetch root key for local dev

      const backend = Actor.createActor(idlFactory, { agent, canisterId });

      try {
        const user: any | null = await backend.getLoggedInUser();
        setUsername(user);
      } catch (err) {
        console.error('Error fetching logged-in user:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  const isAuthenticated = Boolean(username);

  if (loading) return <p>Loading...</p>; // Prevent rendering while fetching user

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={isAuthenticated ? '/temp' : '/login'} replace />
          }
        />
        <Route element={<AuthRedirect isAuthenticated={isAuthenticated} />}>
          <Route
            path="/login"
            element={<LoginPage setUsername={setUsername} />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/chat" element={<ChatPage />} />
        </Route>
        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/temp"
            // element={<TempPage username={username} setUsername={setUsername} />}
            element={<ChatPage/>}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;