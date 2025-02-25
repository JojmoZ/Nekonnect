import { RouteObject } from "react-router-dom";
import { RouteEnum } from "@/lib/enum/route-enum";
import Login from '@/pages/(public)/login';
import Register from '@/pages/(public)/register';
import { ChatPage } from "@/pages/(private)/chat";
import Home from '@/pages/(public)/home';
import LoanDetail from '@/pages/(public)/loan-detail';

export const ROUTES: RouteObject[] = [
  {
    element: <Login />,
    path: RouteEnum.LOGIN,
  },
  {
    element: <Register />,
    path: RouteEnum.REGISTER,
  },
  {
    element: <Home />,
    path: RouteEnum.HOME
  },
];
