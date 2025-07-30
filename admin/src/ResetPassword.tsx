import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { SERVER_URL } from '../config';
import './styles/ResetPassword.css';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    if (password !== confirm) {
      setMessage('Passwords do not match');
      return;
    }

    try {
      const res = await fetch(`${SERVER_URL}/api/admin/reset-password/${token}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ newPassword: password }),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('Password reset successfully');
        setTimeout(() => navigate('/'), 2000);
      } else {
        setMessage(data.message || 'Failed to reset password');
      }
    } catch (error) {
      setMessage('Network error. Please try again.');
    }
  };

  return (
    <div className='reset-pass-container'>
      <h2>Reset Your Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className='reset-pass-input'
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        className='reset-pass-input'
      />

      {message && <p className='reset-pass-message'>{message}</p>}

      <button onClick={handleReset} className='reset-pass-button'>
        Reset Password
      </button>
    </div>
  );
};

export default ResetPassword;
