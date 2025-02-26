import { useState, useEffect } from 'react';
import { ServiceProvider } from './context/service-context';
import { Router } from './pages/router';



function App() {

  return (
    <ServiceProvider>
      <Router />
    </ServiceProvider>
  );
}

export default App;