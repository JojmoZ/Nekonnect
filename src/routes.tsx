import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { path: '/login', element: <Login /> },
            { path: '/register', element: <Register /> },
        ],
    },
]);

export default router;