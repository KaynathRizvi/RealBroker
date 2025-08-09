import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../config';
import './styles/ForgotPassword.css';

// Component for admin to request a password reset email
const ForgotPassword = () => {
  // State to store email input
  const [email, setEmail] = useState('');

  // State to hold error messages for UI display
  const [errorMessage, setErrorMessage] = useState('');

  // State to hold success messages for UI display
  const [successMessage, setSuccessMessage] = useState('');

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Function to handle reset email request
  const handleReset = async () => {
    try {
      // Make POST request to backend forgot-password endpoint with email in body
      const res = await fetch(`${SERVER_URL}/api/admin/forgot-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      // Parse response JSON
      const data = await res.json();

      if (!res.ok) {
        // If response status not ok, show error message and clear success message
        setErrorMessage(data.message || 'Something went wrong');
        setSuccessMessage('');
      } else {
        // On success, clear error and show success message
        setErrorMessage('');
        setSuccessMessage(data.message || 'Check your email for reset link');
      }
    } catch (err) {
      // Handle network errors with user-friendly message
      setErrorMessage('Network error. Please try again.');
      setSuccessMessage('');
    }
  };

  return (
    <div className='forgot-pass-container'>
      {/* Header instructing user */}
      <h2 className='forgot-pass-header'>Enter your email to reset password</h2>

      {/* Email input field */}
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        className='forgot-pass-input'
      />

      {/* Display error or success messages */}
      {errorMessage && <p className='forgot-pass-error'>{errorMessage}</p>}
      {successMessage && <p className='forgot-pass-success'>{successMessage}</p>}

      {/* Button to trigger password reset email */}
      <button className='forgot-pass-button' onClick={handleReset}>
        Send Reset Email
      </button>

      {/* Button to navigate back to login page */}
      <button className='forgot-pass-secondary-button' onClick={() => navigate('/')}>
        Go Back to Login
      </button>
    </div>
  );
};

export default ForgotPassword;