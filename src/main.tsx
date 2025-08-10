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
import { ChatProvider } from './context/chat-context';
import { AuthProvider } from './context/auth-context';
import { ThemeProvider } from './components/theme-provider';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <AgentProvider withProcessEnv>
    <ActorProvider idlFactory={idlFactory} canisterId={userCanisterId}>
      <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
        <LayoutProvider>
          <ServiceProvider>
            <LayoutProvider>
              <AuthProvider>
                <RouterProvider router={router} />
                <Toaster richColors />
              </AuthProvider>
            </LayoutProvider>
          </ServiceProvider>
        </LayoutProvider>
      </ThemeProvider>
    </ActorProvider>
  </AgentProvider>,
  // </React.StrictMode>,
);
