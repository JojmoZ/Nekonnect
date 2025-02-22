import { RouteObject } from "react-router-dom";
import { RouteEnum } from "@/utils/enum/route-enum";
import Login from '@/pages/(public)/login';
import Register from '@/pages/(public)/register';

export const ROUTES: RouteObject[] = [
  {
    element: <Login />,
    path: RouteEnum.LOGIN,
  },
  {
    element: <Register />,
    path: RouteEnum.REGISTER,
  },
];
