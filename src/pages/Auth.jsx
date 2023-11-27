import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// Sample authentication functions (replace with actual authentication logic)
const loginCheck = async (username, password) => {
  // Simulate a login request to the server
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Replace with actual authentication logic
      if (username === 'user1' && password === '123') {
        resolve({ username: 'user1', token: 'exampleToken' });
      } else {
        reject(new Error('Invalid credentials'));
      }
    }, 1000);
  });
};

// React component for User Authentication
const Auth = () => {
  // Const for navigation
  const navigate = useNavigate();

  // State for form input values
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // State for error handling
  const [error, setError] = useState(null);

  // State for indicating if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const user = await loginCheck(username, password);
      // Replace with actual authentication logic and token handling
      console.log('Login successful:', user);
      setIsLoggedIn(true);
      setError(null);
      navigate('/Admin');
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div className="pt-8 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        {isLoggedIn ? (
          <div>
            <p className="text-xl font-semibold mb-4">Welcome, {username}!</p>
            {/* Include logout functionality here */}
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block text-sm font-semibold">Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full border p-2 rounded-md"
            />
            <label className="block text-sm font-semibold">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded-md"
            />
            <button
              type="submit"
              className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 focus:outline-none"
            >
              Login
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
        )}
      </div>
    </div>
  );
};

export default Auth;
