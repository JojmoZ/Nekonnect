import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface LoginPageProps {
  setUsername: (username: string) => void;
}


const LoginPage: React.FC<LoginPageProps> = ({setUsername}) => {
   const [username, setLocalUsername] = useState<string>('');
   const [password, setPassword] = useState<string>('');
   const [error, setError] = useState<string>('');
   const navigate = useNavigate();

   const encryptPassword = async (password: string): Promise<string | null> => {
     try {
       const response = await fetch('http://localhost:8000/encrypt', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ password }),
       });

       const data = await response.json();
       return data.encrypted_password;
     } catch (err) {
       setError('Failed to connect to Rust encryption service.');
       return null;
     }
   };

   const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
     e.preventDefault();

     const encryptedPassword = await encryptPassword(password);
     if (!encryptedPassword) return;

     try {
       const response = await fetch('http://localhost:8080/api/login', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ username, password: encryptedPassword }),
       });

       const data = await response.json();

       if (response.ok) {
         setUsername(username);
         navigate('/chat');
       } else {
         setError(data.error || 'Login failed.');
       }
     } catch (err) {
       setError('Failed to connect to Go backend.');
     }
   };

   return (
     <div className="flex items-center justify-center h-screen bg-gray-100">
           <h2 className="text-2xl font-semibold text-center mb-4 text-blue-500">
             Login
           </h2>
           <form onSubmit={handleLogin} className="space-y-4">
             <div>
               <label htmlFor="username">Username</label>
               <input
                 className="text-black"
                 id="username"
                 type="text"
                 value={username}
                 onChange={(e) => setLocalUsername(e.target.value)}
                 required
               />
             </div>
             <div>
               <label htmlFor="password">Password</label>
               <input
                 className="text-black"
                 id="password"
                 type="password"
                 value={password}
                 onChange={(e) => setPassword(e.target.value)}
                 required
               />
             </div>
             <button type="submit" className="w-full">
               Login
             </button>
           </form>
           {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
           <p className="mt-4 text-center">
             Don’t have an account?{' '}
             <Link to="/register" className="text-blue-500 hover:underline">
               Register here
             </Link>
           </p>
     </div>
   );
};

export default LoginPage;
