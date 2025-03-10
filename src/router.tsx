import Home from '@/pages/(public)/home';
import CreateLoanPostPage from '@/pages/(private)/create-loan-post';
import { EditProfilePage } from '@/pages/(private)/edit-profile';
import ProtectedRoute from '@/lib/utils/ProtectedRoute';
import { createBrowserRouter, redirect } from 'react-router-dom';
import TempPage from './pages/TempPage';
import PostVerificationPage from './pages/(private)/post-verification';
import LoanDetailPage from './pages/(public)/loan-detail';
import MainLayout from '@/pages/main-layout';
import TransactionHistoryPage from './pages/(private)/transaction-history';
import UserPage from './pages/UserPage';
import { CreateLoanLanding } from './pages/(public)/create-loan-landing';
import Landing from '@/pages/(public)/landing';
import App from '@/pages/(public)/Main';
import ProfilePage from './pages/(private)/profile-page';
import LoanBrowserPage from './pages/(public)/loan-browser';
import { RouteEnum } from './lib/enum/router-enum';
import { RoleEnum } from './lib/enum/role-enum';
import { GetAdminRole } from './pages/(private)/get-admin-role';
import { ChatProvider } from './context/chat-context';
import TopUpPage from './pages/(private)/top-up';
import UserLoansPage from './pages/(private)/user-loans';
import { GetOwnerRole } from './pages/(private)/get-owner-role';
import AssuranceBrowserPage from './pages/(private)/assurance-browser';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Landing/>
      },
      {
        path: RouteEnum.BORROWER,
        element: <CreateLoanLanding />,
      },
      {
        path: RouteEnum.BROWSE,
        element: <LoanBrowserPage />,
      },
      {
        path: RouteEnum.HOME,
        element: <Home />,
      }, 
      {
        element: <ProtectedRoute role={RoleEnum.ADMIN} />,
        children: [
          {
            path: '/admin',
            element: <App />,
          },
          {
            path: RouteEnum.POST_VERIFICATION,
            element: <PostVerificationPage />,
          },
        ]
      },  {
        element: <ProtectedRoute role={RoleEnum.OWNER} />,
        children: [
          {
            path: '/owner',
            element: <App />,
          },
          {
            path: RouteEnum.ASSURANCES,
            element: <AssuranceBrowserPage/>
          }
        ]
      },
      {
        element: <ProtectedRoute role={RoleEnum.GUEST} />,
        children: [
          {
            path: RouteEnum.CREATE_POST,
            element: <CreateLoanPostPage />,
          },
          {
            path: RouteEnum.GET_ADMIN_ROLE,
            element: <GetAdminRole />,
          },
          {
            path: RouteEnum.GET_OWNER_ROLE,
            element: <GetOwnerRole />,
          },
          {
            path: RouteEnum.EDIT_PROFILE,
            element: <EditProfilePage />,
          },
          {
            path: RouteEnum.POST,
            element: <ChatProvider><LoanDetailPage /></ChatProvider>,
          },
          {
            path: RouteEnum.TRANSACTION_HISTORY,
            element: <TransactionHistoryPage />,
          },
          {
            path: '/temp',
            element: <UserPage />,
          },
          {
            path: '/temp2',
            element: <TempPage />,
          },
          {
            path: RouteEnum.PROFILE,
            element: <ProfilePage />,
          },
          {
            path: RouteEnum.TOP_UP,
            element: <TopUpPage />,
          },
          {
            path: RouteEnum.MY_LOANS,
            element: <UserLoansPage />,
          }
        ]
      },
    ],
  },
  {
    path: '*',
    loader: () => redirect('/'),
  },
]);

export default router;
