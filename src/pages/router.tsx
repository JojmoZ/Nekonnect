import {
    BrowserRouter,
    Routes,
    Route,
    Navigate,
  } from 'react-router-dom';
import { ChatPage } from '@/pages/(private)/chat';
import Home from '@/pages/(public)/home';
import { useService } from '@/context/service-context';
import RegisterPage from './RegisterPage';
import CreateLoanPostPage from './(private)/loanpost';
import { EditProfilePage } from './(private)/edit-profile';
import { useEffect } from 'react';
import ProtectedRoute from '@/lib/utils/ProtectedRoute';
import AuthRedirect from '@/lib/utils/AuthRedirect';
import LoginPage from './LoginPage';

export const Router = () => {

    return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthRedirect />}>
          <Route
            path="/login"
            element={<LoginPage />}
          />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route
            path="/home"
            element={<Home />}
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
        </Route>
        <Route
          path="*"
          element={
            <Navigate to={"/login"} replace />
          }
        />
      </Routes>
    </BrowserRouter>
    );
};