import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../config.ts';
import '../styles/UserLists.css';

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

const handleView = (id: string) => {
  navigate(`/userprofile/${id}`);
};

  return (
    <div className='user-lists-container'>
      <div className='user-topbar'>
        <button onClick={() => navigate('/dashboard')} className='user-back-button'>← Back</button>
        <h2>User List</h2>
      </div>
      <table border={1} cellPadding={8} className='user-table'>
        <thead>
  <tr>
    <th>Profile</th>
    <th>Email</th>
    <th>Role</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
  {users.map((u) => (
    <tr key={u.id}>
      <td><button onClick={() => handleView(u.id)} className='user-view-button'>
          View
        </button></td>
      <td>{u.email}</td>
      <td>{u.role}</td>
      <td>
        <button
          onClick={() => handleDelete(u.id)} className='user-delete-button'>
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

export default UserLists;
