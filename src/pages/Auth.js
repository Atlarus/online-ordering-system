// Import necessary dependencies
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
      navigate("/");
    } catch (error) {
      console.error('Login failed:', error.message);
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div>
      {isLoggedIn ? (
        <div>
          <p>Welcome, {username}!</p>
          {/* Include logout functionality here */}
        </div>
      ) : (
        <form onSubmit={handleLogin}>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Login</button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </form>
      )}
    </div>
  );
};

export default Auth;
