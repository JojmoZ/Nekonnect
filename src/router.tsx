import { ChatPage } from '@/pages/(private)/chat';
import Home from '@/pages/(public)/home';
import RegisterPage from '@/pages/RegisterPage';
import CreateLoanPostPage from '@/pages/(private)/create-loan-post';
import { EditProfilePage } from '@/pages/(private)/edit-profile';
import ProtectedRoute from '@/lib/utils/ProtectedRoute';
import AuthRedirect from '@/lib/utils/AuthRedirect';
import Login from '@/pages/(public)/login';
import { createBrowserRouter, redirect } from 'react-router-dom';
import TempPage from './pages/TempPage';
import PostVerificationPage from './pages/(private)/post-verification';

const router = createBrowserRouter([
  {
    element: <AuthRedirect />,
    children: [
      {
        path: "/login",
        element: <Home />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
    ],
  },
  {
    // element: <ProtectedRoute />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/create",
        element: <CreateLoanPostPage />,
      },
      {
        path: "/edit-profile",
        element: <EditProfilePage />,
      },
      {
        path: "/chat",
        element: <ChatPage />,
      },
      {
        path: "/temp2",
        element: <TempPage/>
      },
      {
        path: "/post-verification",
        element: <PostVerificationPage />
      }
    ],
  },
  {
    path: "*",
    loader: () => redirect("/login"),
  },
]);

export default router;