import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SERVER_URL } from '../config';
import './styles/ResetPassword.css';

// Component for resetting admin password using a token from URL query params
const ResetPassword = () => {
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Hook to access URL search parameters
  const [searchParams] = useSearchParams();

  // Extract the reset token from URL query parameters
  const token = searchParams.get('token');

  // State to hold new password input
  const [password, setPassword] = useState('');

  // State to hold confirm password input
  const [confirm, setConfirm] = useState('');

  // State to display success or error messages
  const [message, setMessage] = useState('');

  // Function to handle password reset submission
  const handleReset = async () => {
    // Check if passwords match; if not, display message and return early
    if (password !== confirm) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      // Make POST request to backend API with new password
      const res = await fetch(`${SERVER_URL}/api/admin/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: password }),
      });

      // Parse response JSON
      const data = await res.json();

      if (res.ok) {
        // On success, show success message
        setMessage('Password reset successfully');
        // Redirect to login page after 2 seconds delay
        setTimeout(() => navigate('/'), 2000);
      } else {
        // On failure, show error message from response or generic message
        setMessage(data.message || 'Failed to reset password');
      }
    } catch (error) {
      // Handle network or other errors with user-friendly message
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className='reset-pass-container'>
      {/* Heading */}
      <h2>Reset Your Password</h2>

      {/* Input for new password */}
      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='reset-pass-input'
      />

      {/* Input for confirm password */}
      <input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className='reset-pass-input'
      />

      {/* Display feedback message */}
      {message && <p className='reset-pass-message'>{message}</p>}

      {/* Button to trigger password reset */}
      <button onClick={handleReset} className='reset-pass-button'>
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;