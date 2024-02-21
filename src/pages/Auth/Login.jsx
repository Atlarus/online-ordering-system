import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Sample authentication functions (replace with actual authentication logic)
const loginCheck = async (businessID, userID, password) => {

  try {
    const response = await axios.post('http://localhost:5000/business_login', {
      businessID: businessID,
      userID: userID,
      password: password,
    });

    // Check the response and take appropriate action
    if (response.data.error) {
      console.error(response.data.error);
      // Handle error, show a message, etc.
    } else {
      // Successful login, proceed with your logic
      return true;
    }
  } catch (error) {
    console.error('Error during login:', error);
    // Handle error, show a message, etc.
  }
};

// React component for User Authentication
const Login = ({ loginID, setLoginID, businessID }) => {
  // Const for navigation
  const navigate = useNavigate();

  // State for form input values
  const [userID, setUserID] = useState('');
  const [password, setPassword] = useState('');

  // State for error handling
  const [error, setError] = useState(null);

  // State for indicating if the user is logged in
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Function to handle form submission
const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const user = await loginCheck(businessID, userID, password);
    if(user){
      console.log('Login successful:', user);
      setIsLoggedIn(true);
      setError(null);
      setLoginID(userID);
    } else {
      console.log(error);
    }
  } catch(error) {
    alert(error);
  }
};

  return (
    <div className="pt-8 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-96">
        <h2 className="text-3xl font-bold mb-4">Login</h2>
        {isLoggedIn ? (
          <div>
            <p className="text-xl font-semibold mb-4">Welcome, {userID}!</p>
            {/* Include logout functionality here */}
          </div>
        ) : (
          <form onSubmit={handleLogin} className="space-y-4">
            <label className="block text-sm font-semibold">userID:</label>
            <input
              type="text"
              value={userID}
              onChange={(e) => setUserID(e.target.value)}
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

export default Login;
