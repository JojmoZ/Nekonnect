import { useQueryCall, useUpdateCall } from '@ic-reactor/react';
import './App.css';
import motokoLogo from './assets/motoko_moving.png';
import motokoShadowLogo from './assets/motoko_shadow.png';
import reactLogo from './assets/react.svg';
import viteLogo from './assets/vite.svg';
import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import RegisterPage from './pages/RegisterPage';
import TempPage from './pages/TempPage';
import LoginPage from './pages/LoginPage';
import AuthRedirect from './utils/AuthRedirect';
import ProtectedRoute from './utils/ProtectedRoute';
function App() {
  const [username, setUsername] = useState<string>(
    localStorage.getItem('username') || '',
  );

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

  const isAuthenticated = Boolean(username);

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
        </Route>

        <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
          <Route
            path="/temp"
            element={<TempPage username={username} setUsername={setUsername} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
