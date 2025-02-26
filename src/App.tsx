import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { Actor, HttpAgent } from '@dfinity/agent';
import { AuthClient } from '@dfinity/auth-client';
import { idlFactory, canisterId } from './declarations/user';
import RegisterPage from './pages/RegisterPage';

import TempPage from './pages/TempPage';
import CreateLoanPostPage from './pages/(private)/create-loan-post';
import LoginPage from '@/pages/LoginPage';
import AuthRedirect from '@/lib/utils/AuthRedirect';
import ProtectedRoute from '@/lib/utils/ProtectedRoute';
import { ChatPage } from '@/pages/(private)/chat';
import { EditProfilePage } from './pages/(private)/edit-profile';
import { UserService } from './services/user.service';
import { Principal } from '@dfinity/principal';
import Login from '@/pages/(public)/login';
import Home from '@/pages/(public)/home';

const userService = new UserService()

function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await userService.ensureInitialized()
        const user = await userService.me();
        console.log(user);
        setUsername(user.internetIdentity.toString());
        if (user.internetIdentity.toString() == "") {
          setUsername(null);
        }

      } catch (err) {
        console.error('Error fetching logged-in user:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);


  if (loading) return <p>Loading...</p>; // Prevent rendering while fetching user

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate to={username ? '/temp' : '/login'} replace />
          }
        />
        {/* <Route element={<AuthRedirect isAuthenticated={username !== null} />}> */}
          <Route
            path="/login"
            element={<Home />}
          />
          <Route path="/register" element={<RegisterPage />} />
          <Route
            path="/chat"
            element={<ChatPage setUsername={setUsername} />}
          />
        {/* </Route> */}
        {/* <Route element={<ProtectedRoute isAuthenticated={username !== null} />}> */}
          <Route
            path="/temp"
            element={<ChatPage setUsername={setUsername} />}
            // element={<TempPage username={username} setUsername={setUsername} />}
            // element={<ChatPage />}
          />
          <Route
            path="/create"
            element={<CreateLoanPostPage />}
          />
          <Route
            path="/edit-profile"
            element={<EditProfilePage />}
          />
        {/* </Route> */}
      </Routes>
    </Router>
  );
}

export default App;