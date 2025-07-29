import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../config.ts';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

const UserLists: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${SERVER_URL}/api/admin/users/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUsers(data);
      } catch (err: any) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <p>Loading users...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const handleDelete = async (id: string) => {
  const token = localStorage.getItem('token');
  try {
    const res = await fetch(`${SERVER_URL}/api/admin/users/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    alert(data.message);
   
    if (res.ok) {
      setUsers(users.filter(user => user.id !== id));
    }
    } catch (err) {
    console.error('Delete failed:', err);
    alert('Failed to delete user');
    }
};

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <button onClick={() => navigate('/dashboard')} style={styles.backButton}>← Back</button>
        <h2>User List</h2>
      </div>
      <table border={1} cellPadding={8} style={styles.table}>
        <thead>
  <tr>
    <th>ID</th>
    <th>Name</th>
    <th>Email</th>
    <th>Role</th>
    <th>Action</th> {/* 👈 New column */}
  </tr>
</thead>
<tbody>
  {users.map((u) => (
    <tr key={u.id}>
      <td>{u.id}</td>
      <td>{u.name}</td>
      <td>{u.email}</td>
      <td>{u.role}</td>
      <td>
        <button
          onClick={() => handleDelete(u.id)}
          style={{ color: 'white', backgroundColor: 'red', padding: '4px 8px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
        >
          Delete
        </button>
      </td>
    </tr>
  ))}
</tbody>
      </table>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    backgroundColor: '#f9f9f9',
    height: '100vh',
  },
  topBar: {
    display: 'flex',
    alignItems: 'center',
    gap: '1rem',
    marginBottom: '2rem',
  },
  backButton: {
    padding: '0.5rem 1rem',
    fontSize: '1rem',
    cursor: 'pointer',
  },
  table: {
    backgroundColor: '#fff',
    borderCollapse: 'collapse',
    width: '100%',
  },
};

export default UserLists;
