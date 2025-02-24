import { RouteObject } from "react-router-dom";
import { RouteEnum } from "@utils/enum/route-enum";
import Login from '@pages/(public)/login';
import Register from '@pages/(public)/register';
import { ChatPage } from "@pages/(private)/chat";
import { useState } from "react";

export const ROUTES: RouteObject[] = [
  
  {
    element: <Login />,
    path: RouteEnum.LOGIN,
  },
  {
    element: <Register />,
    path: RouteEnum.REGISTER,
  },
  // {
  //   element: <ChatPage />,
  //   path: RouteEnum.CHAT
  // }
];
