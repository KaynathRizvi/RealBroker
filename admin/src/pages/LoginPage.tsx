import React, { useState } from 'react';
import { SERVER_URL } from '../../config.ts';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'

// Admin login page component
const LoginPage = () => {
  // State to hold email input
  const [email, setEmail] = useState('');
  // State to hold password input
  const [password, setPassword] = useState('');
  // State to hold error messages from login attempts
  const [errorMessage, setErrorMessage] = useState('');
  // React Router hook to navigate programmatically
  const navigate = useNavigate();

  // Handle form submission for login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent default form submit reload

    try {
      // Send POST request to admin login API with email and password
      const res = await fetch(`${SERVER_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      // Parse JSON response
      const data = await res.json();

      if (res.ok) {
        // If login successful, save token to localStorage
        localStorage.setItem('token', data.token);
        // Redirect to admin dashboard
        navigate('/dashboard');
      } else {
        // If login failed, show error message from server or generic
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (err) {
      // Catch network or other errors and alert user
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className='login-container'>
      {/* Login form */}
      <form onSubmit={handleLogin} className='login-form'>
        <h1 className='login-header'>Admin Login</h1>

        {/* Email input */}
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='login-input'
        />

        {/* Password input */}
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='login-input'
        />

        {/* Display error message if login fails */}
        {errorMessage && <p className='login-error'>{errorMessage}</p>}

        {/* Submit button */}
        <button type="submit" className='login-button'>Login</button>

        {/* Link to forgot password page */}
        <div className='forgot-password'>
          <Link to="/forgotpassword" className='forgot-pass-link'>
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginPage;