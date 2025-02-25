import { ActorProvider, AgentProvider } from '@ic-reactor/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { userCanisterId, idlFactory } from './services/base.service'

import './index.scss';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AgentProvider withProcessEnv>
      <ActorProvider idlFactory={idlFactory} canisterId={userCanisterId}>
        <App />
      </ActorProvider>
    </AgentProvider>
  </React.StrictMode>,
);
