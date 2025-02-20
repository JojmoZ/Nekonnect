import { useEffect, useState } from 'react';
// import { HttpAgent, Actor } from '@dfinity/agent';
import type { _SERVICE } from '../src/declarations/backend/backend.did';
// import { idlFactory as motoko_backend_idl } from '../src/declarations/backend';
// import { canisterId as motoko_backend_id } from '../src/declarations/backend';
import { backend } from '../src/declarations/backend'

function App() {
  const [greeting, setGreeting] = useState<string>('');

  const fetchGreeting = async () => {
    const response = await backend.greet('Developer')
    setGreeting(response);
  };

  useEffect(() => {
    fetchGreeting();
  }, []);

  return (
    <div className="App">
      <h1>Hello</h1>
      <h1>{greeting}</h1>
    </div>
  );
}

export default App;
