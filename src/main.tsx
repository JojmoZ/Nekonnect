import { ActorProvider, AgentProvider } from '@ic-reactor/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { userCanisterId, idlFactory } from './services/base.service'

import './index.scss';
import { ServiceProvider } from './context/service-context';
import { RouterProvider } from 'react-router';
import router from '@/router';
import { Toaster } from 'sonner';
import { LayoutProvider } from './context/layout-context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <AgentProvider withProcessEnv>
    <ActorProvider idlFactory={idlFactory} canisterId={userCanisterId}>
      <LayoutProvider>
        <ServiceProvider>
          <RouterProvider router={router} />
          <Toaster richColors />
        </ServiceProvider>
      </LayoutProvider>
    </ActorProvider>
  </AgentProvider>
  // </React.StrictMode>,
);
