// admin/pages/LoginPage.tsx
import React, { useState } from 'react';
import { SERVER_URL } from '../../config.ts';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch(`${SERVER_URL}/api/admin/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem('token', data.token);
        navigate('/dashboard'); // ✅ redirect after success
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };

  return (
    <div className='login-container'>
      <form onSubmit={handleLogin} className='login-form'>
        <h1 className='login-header'>Admin Login</h1>
        
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='login-input'
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className='login-input'
        />

        {errorMessage && <p className='login-error'>{errorMessage}</p>}

        <button type="submit" className='login-button'>Login</button>
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
