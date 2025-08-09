import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../config.ts';
import '../styles/UserLists.css';

// Define User interface for type safety
interface User {
  id: string;
  name: string;
  email: string;
  role: string;
}

// Component to list all users for admin with ability to view profile and delete user
const UserLists: React.FC = () => {
  // State to hold list of users fetched from backend
  const [users, setUsers] = useState<User[]>([]);
  
  // State to track loading status
  const [loading, setLoading] = useState(true);
  
  // State to hold error messages
  const [error, setError] = useState('');
  
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Fetch users when component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await fetch(`${SERVER_URL}/api/admin/users/`, {
          headers: {
            Authorization: `Bearer ${token}`, // Send JWT token for auth
          },
        });

        // Parse JSON response
        const data = await res.json();

        // Set users state with fetched data
        setUsers(data);
      } catch (err: any) {
        // Set error message if fetch fails
        setError('Failed to fetch users');
      } finally {
        // Loading is finished regardless of success or failure
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Show loading indicator while fetching data
  if (loading) return <p>Loading users...</p>;

  // Show error message if fetch failed
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Function to handle user deletion
  const handleDelete = async (id: string) => {
    const token = localStorage.getItem('token');

    try {
      const res = await fetch(`${SERVER_URL}/api/admin/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // JWT for auth
        },
      });

      const data = await res.json();

      // Show alert with message from server
      alert(data.message);

      // If deletion successful, update users state by removing deleted user
      if (res.ok) {
        setUsers(users.filter(user => user.id !== id));
      }
    } catch (err) {
      console.error('Delete failed:', err);
      alert('Failed to delete user');
    }
  };

  // Function to navigate to user's profile page
  const handleView = (id: string) => {
    navigate(`/userprofile/${id}`);
  };

  return (
    <div className='user-lists-container'>
      {/* Top bar with back button and heading */}
      <div className='user-topbar'>
        <button onClick={() => navigate('/dashboard')} className='user-back-button'>← Back</button>
        <h2>User List</h2>
      </div>

      {/* Table to display user info */}
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
          {/* Map over users to create rows */}
          {users.map((u) => (
            <tr key={u.id}>
              {/* Button to view user profile */}
              <td>
                <button onClick={() => handleView(u.id)} className='user-view-button'>
                  View
                </button>
              </td>

              {/* Display user email and role */}
              <td>{u.email}</td>
              <td>{u.role}</td>

              {/* Delete button */}
              <td>
                <button onClick={() => handleDelete(u.id)} className='user-delete-button'>
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