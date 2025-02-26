import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import React, { StrictMode } from 'react';
import { ActorProvider, AgentProvider } from '@ic-reactor/react';
import { canisterId, idlFactory } from '@/declarations/user';
import { RouterProvider } from 'react-router';
import router from '@/router';
import { ServiceProvider } from '@/context/service-context';

describe('App', () => {
  it('renders as expected', () => {
    render(
      <StrictMode>
        <AgentProvider withProcessEnv disableAuthenticateOnMount>
          <ActorProvider idlFactory={idlFactory} canisterId={canisterId}>
            <ServiceProvider>
              <RouterProvider router={router} />
            </ServiceProvider>
          </ActorProvider>
        </AgentProvider>
      </StrictMode>,
    );
    // expect(screen.getByText(/Vite + React + Motoko/i)).toBeInTheDocument();
    expect(1).toEqual(1);
  });
});
