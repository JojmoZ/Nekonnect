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
import CreateLoanPostPage from './pages/(private)/loanpost';
import LoginPage from '@/pages/LoginPage';
import AuthRedirect from '@/lib/utils/AuthRedirect';
import ProtectedRoute from '@/lib/utils/ProtectedRoute';
import { ChatPage } from '@/pages/(private)/chat';
import { RouterProvider } from 'react-router';
import { router } from '@/lib/router/router';



function App() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const authClient = await AuthClient.create();

        if (await authClient.isAuthenticated()) {
          const identity = authClient.getIdentity();
          const principal = identity.getPrincipal().toString();
          setUsername(principal);
          return;
        }

        const agent = new HttpAgent({ host: 'http://127.0.0.1:4943' });
        await agent.fetchRootKey(); // Fetch root key for local dev
        const backend = Actor.createActor(idlFactory, { agent, canisterId });

        const user: any | null = await backend.getLoggedInUser();
        setUsername(user);
      } catch (err) {
        console.error('Error fetching logged-in user:', err);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const isAuthenticated = Boolean(username);

  if (loading) return <p>Loading...</p>; // Prevent rendering while fetching user

  return (
    <RouterProvider router={router}></RouterProvider>
    // <Router>
    //   <Routes>
    //     <Route
    //       path="/"
    //       element={
    //         <Navigate to={isAuthenticated ? '/temp' : '/login'} replace />
    //       }
    //     />
    //     <Route element={<AuthRedirect isAuthenticated={isAuthenticated} />}>
    //       <Route
    //         path="/login"
    //         element={<LoginPage setUsername={setUsername} />}
    //       />
    //       <Route path="/register" element={<RegisterPage />} />
    //       <Route
    //         path="/chat"
    //         element={<ChatPage setUsername={setUsername} />}
    //       />
    //     </Route>
    //     <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
    //       <Route
    //         path="/temp"
    //         element={<ChatPage setUsername={setUsername} />}
    //         // element={<TempPage username={username} setUsername={setUsername} />}
    //         // element={<ChatPage />}
    //       />
    //     </Route>
    //     <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
    //       <Route
    //         path="/create"
    //         element={<CreateLoanPostPage />}
    //       />
    //     </Route>
    //   </Routes>
    // </Router>
  );
}

export default App;