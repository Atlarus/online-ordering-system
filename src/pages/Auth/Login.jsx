import React, { useState } from 'react';
import axios from 'axios';
import DOMPurify from 'dompurify';

// Sample authentication functions (replace with actual authentication logic)
const loginCheck = async (formBusinessID, userID, password) => {

  try {
    const response = await axios.post('http://localhost:5000/business_login', {
      formBusinessID: formBusinessID,
      userID: userID,
      password: password,
    });
    console.log(response);
    // Check the response and take appropriate action
    if (response.data.error) {
      console.error(response.data.error);
      // Handle error, show a message, etc.
    } else {
      // Successful login, proceed with your logic
      
      return response.data.token;
    }
  } catch (error) {
    console.error('Error during login:', error);
    // Handle error, show a message, etc.
  }
};

// React component for User Authentication
const Login = ({ setIsLoggedIn, setBusinessID, setToken }) => {
  // State for form input values
  const [formBusinessID, setFormBusinessID] = useState('');
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  // State for error handling
  const [error, setError] = useState(null);
  const alphanumericRegex = /^[a-zA-Z0-9]+$/;

  // Function to handle form submission
  const handleLogin = async (e) => {
    e.preventDefault();

    const sanitizedFormBusinessID = DOMPurify.sanitize(formBusinessID);
    const sanitizedUserID = DOMPurify.sanitize(userID);

    if (!sanitizedFormBusinessID || !sanitizedUserID || !password) {
      setError('All fields are required.');
      return;
    }

    if (!alphanumericRegex.test(sanitizedFormBusinessID) || !alphanumericRegex.test(sanitizedUserID)) {
      setError('Invalid characters in Business ID or User ID.');
      return;
    }

    try {
      const token = await loginCheck(sanitizedFormBusinessID, sanitizedUserID, password);
      if (token) {
        localStorage.setItem('token', token);
        setToken(token);
        setIsLoggedIn(true);
        setBusinessID(sanitizedFormBusinessID);
        setError(null);
      } else {
        // Set error state when login is not successful
        setError('Login failed. Please check your credentials.');
      }
    } catch (error) {
      // Set error state in case of an exception
      setError(error.response);
    }
  };

  return (
    <div className="pt-8 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block text-sm font-semibold">Business ID:</label>
            <input
              type="text"
              value={formBusinessID}
              onChange={(e) => setFormBusinessID(e.target.value)}
              className="w-full border p-2 rounded-md"
              required
            />

            <label className="block text-sm font-semibold">user ID:</label>
            <input
              type="text"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
              className="w-full border p-2 rounded-md"
              required
            />

            <label className="block text-sm font-semibold">Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border p-2 rounded-md"
              required
            />

            <button
              type="submit"
              className="bg-purple-500 text-white p-2 rounded-md hover:bg-purple-600 focus:outline-none"
            >
              Login
            </button>
            {error && <p className="text-red-500">{error}</p>}
          </form>
      </div>
    </div>
  );
};

export default Login;
