import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../config.ts';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const AdminUserProfile: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      try {
        const res = await fetch(`${SERVER_URL}/api/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || 'Failed to load user');
        setUser(data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
      }
    };

    fetchUser();
  }, [id]);

  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!user) return <p>Loading user profile...</p>;

  return (
    <div style={styles.container}>
      <button onClick={() => navigate('/users')} style={styles.backButton}>
        ← Back
      </button>
      <h2 style={styles.title}>User Profile</h2>
      <div style={styles.profileBox}>
        <div style={styles.field}>
          <label>ID:</label>
          <span>{user.id}</span>
        </div>
        <div style={styles.field}>
          <label>Name:</label>
          <span>{user.name || 'N/A'}</span>
        </div>
        <div style={styles.field}>
          <label>Email:</label>
          <span>{user.email}</span>
        </div>
        <div style={styles.field}>
          <label>Role:</label>
          <span>{user.role}</span>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    backgroundColor: '#f4f4f4',
    minHeight: '100vh',
  },
  backButton: {
    marginBottom: '1rem',
    padding: '0.5rem 1rem',
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  title: {
    marginBottom: '1rem',
  },
  profileBox: {
    backgroundColor: '#fff',
    padding: '1.5rem',
    borderRadius: '8px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
    maxWidth: '500px',
  },
  field: {
    marginBottom: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
  },
};

export default AdminUserProfile;
