// admin/pages/LoginPage.tsx
import React, { useState } from 'react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:3000/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Logged in successfully!');
        setErrorMessage('');
        // You can store token if provided: localStorage.setItem("token", data.token)
        // Redirect to admin dashboard if needed
        // window.location.href = "/admin/dashboard"; 
      } else {
        setErrorMessage(data.message || 'Login failed');
      }
    } catch (err) {
      setErrorMessage('Network error. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleLogin} style={styles.form}>
        <h1 style={styles.title}>Admin Login</h1>
        
        <input
          type="email"
          placeholder="Admin Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Admin Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />

        {errorMessage && <p style={styles.error}>{errorMessage}</p>}

        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

// Basic inline styles
const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f4f4f4',
  },
  form: {
    backgroundColor: '#fff',
    padding: 30,
    borderRadius: 10,
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    minWidth: 300,
  },
  title: {
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    marginBottom: 15,
    borderRadius: 6,
    border: '1px solid #ccc',
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
  error: {
    color: 'red',
    marginBottom: 10,
    fontSize: 13,
    textAlign: 'center',
  },
};

export default LoginPage;
