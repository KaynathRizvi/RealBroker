import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../config'
import './styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/api/admin/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMessage(data.message || 'Something went wrong');
        setSuccessMessage('');
      } else {
        setErrorMessage('');
        setSuccessMessage(data.message || 'Check your email for reset link');
      }
    } catch (err) {
      setErrorMessage('Network error. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className='forgot-pass-container'>
      <h2 className='forgot-pass-header'>Enter your email to reset password</h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
       className='forgot-pass-input'
      />

      {errorMessage && <p className='forgot-pass-error'>{errorMessage}</p>}
      {successMessage && <p className='forgot-pass-success'>{successMessage}</p>}

      <button className='forgot-pass-button' onClick={handleReset}>
        Send Reset Email
      </button>

      <button className='forgot-pass-secondary-button' onClick={() => navigate('/')}>
        Go Back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;
