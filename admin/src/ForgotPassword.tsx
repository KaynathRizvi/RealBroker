import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleReset = async () => {
    try {
      const res = await fetch(`${SERVER_URL}/api/auth/forgot-password`, {
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
    <div style={styles.container}>
      <h2 style={styles.title}>Enter your email to reset password</h2>

      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={styles.input}
      />

      {errorMessage && <p style={styles.error}>{errorMessage}</p>}
      {successMessage && <p style={styles.success}>{successMessage}</p>}

      <button style={styles.button} onClick={handleReset}>
        Send Reset Email
      </button>

      <button style={styles.secondaryButton} onClick={() => navigate('/')}>
        Go Back to Login
      </button>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: 400,
    margin: '60px auto',
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 8,
    backgroundColor: '#fff',
    textAlign: 'center',
  },
  title: {
    marginBottom: 20,
    fontSize: 20,
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
    marginBottom: 10,
    backgroundColor: '#000',
    color: '#fff',
    border: 'none',
    borderRadius: 6,
    cursor: 'pointer',
    fontWeight: 'bold',
  },
  secondaryButton: {
    width: '100%',
    padding: 12,
    backgroundColor: '#f4f4f4',
    color: '#000',
    border: '1px solid #ccc',
    borderRadius: 6,
    cursor: 'pointer',
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  success: {
    color: 'green',
    marginBottom: 10,
  },
};

export default ForgotPassword;
