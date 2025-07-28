import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const navigate = useNavigate();

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
    <div style={styles.container}>
      <h2>Reset Your Password</h2>

      <input
        type="password"
        placeholder="New Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={styles.input}
      />

      <input
        type="password"
        placeholder="Confirm Password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        style={styles.input}
      />

      {message && <p style={styles.message}>{message}</p>}

      <button onClick={handleReset} style={styles.button}>
        Reset Password
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 400,
    margin: '60px auto',
    padding: 20,
    textAlign: 'center',
    border: '1px solid #ccc',
    borderRadius: 10,
    backgroundColor: '#fff',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    border: '1px solid #ccc',
    borderRadius: 6,
    fontSize: 14,
  },
  button: {
    width: '100%',
    padding: 12,
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    fontWeight: 'bold',
    cursor: 'pointer',
  },
  message: {
    color: '#d00',
    marginBottom: 10,
  },
};

export default ResetPassword;
