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
import LoanDetailPage from './pages/(public)/loan-detail';
import MainLayout from '@/pages/main-layout';
import TransactionHistoryPage from './pages/(private)/transaction-history';
import LoginPage from './pages/LoginPage';
import UserPage from './pages/UserPage';
import Landing from '@/pages/(public)/landing';
import App from '@/pages/(public)/Main'
import ProfilePage from './pages/(private)/profile-page';

const router = createBrowserRouter([
  {
    element: <AuthRedirect />,
    children: [
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Landing />,
      },
      {
        path: '/create',
        element: <CreateLoanPostPage />,
      },
      {
        path: '/edit-profile',
        element: <EditProfilePage />,
      },
      {
        path: '/chat',
        element: <ChatPage />,
      },
      {
        path: '/temp2',
        element: <TempPage />,
      },
      {
        path: '/post-verification',
        element: <PostVerificationPage />,
      },
      {
        path: '/post/:id',
        element: <LoanDetailPage />,
      },
      {
        path: '/transaction-history',
        element: <TransactionHistoryPage />,
      },
      {
        path:"/temp",
        element: <UserPage/>
      },
      {
        path: "/temp2",
        element: <TempPage/>
      },
      {
        path:"/temp",
        element: <UserPage/>
      },
      {
        path: "/profile",
        element: <ProfilePage />
      }
    ],
  },
  {
    path: '*',
    loader: () => redirect('/login'),
  },
]);

export default router;