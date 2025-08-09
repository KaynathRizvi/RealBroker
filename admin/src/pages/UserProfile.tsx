import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../config.ts';
import '../styles/UserProfile.css';

// Define User interface to type the user data fetched from backend
interface User {
  id: string;
  name?: string;
  email: string;
  role: string;
  agency_name?: string;
  contact_number?: string;
  license_number?: string;
  location?: string;
}

// Component to display detailed profile information of a single user for admin view
const UserProfile: React.FC = () => {
  // Extract user ID from URL parameters
  const { id } = useParams();

  // Hook for programmatic navigation
  const navigate = useNavigate();

  // State to hold fetched user data
  const [user, setUser] = useState<User | null>(null);

  // State to hold any error message
  const [error, setError] = useState('');

  // Fetch user data on component mount or when id changes
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');

      try {
        // Fetch user data with JWT authentication
        const res = await fetch(`${SERVER_URL}/api/admin/users/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();

        // If response is not ok, throw error to catch block
        if (!res.ok) throw new Error(data.message || 'Failed to load user');

        // Set user data state
        setUser(data);
      } catch (err: any) {
        // Capture and set error message
        setError(err.message || 'An error occurred');
      }
    };

    fetchUser();
  }, [id]);

  // Render error message if error occurs
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Show loading message until user data is fetched
  if (!user) return <p>Loading user profile...</p>;

  return (
    <div className='user-profile-container'>
      {/* Back button to navigate to user list */}
      <button onClick={() => navigate('/users')} className='back-button'>
        ← Back
      </button>

      {/* Header for user profile page */}
      <h2 className='user-profile-header'>User Profile</h2>

      {/* Container box showing user details */}
      <div className='profile-box'>
        {/* Display each user field with label and value */}
        <div className='user-field'>
          <label>Name:</label>
          <span>{user.name || 'N/A'}</span>
        </div>

        <div className='user-field'>
          <label>Email:</label>
          <span>{user.email}</span>
        </div>

        <div className='user-field'>
          <label>Role:</label>
          <span>{user.role}</span>
        </div>

        <div className='user-field'>
          <label>Agency Name:</label>
          <span>{user.agency_name || 'N/A'}</span>
        </div>

        <div className='user-field'>
          <label>Contact Number:</label>
          <span>{user.contact_number || 'N/A'}</span>
        </div>

        <div className='user-field'>
          <label>License Number:</label>
          <span>{user.license_number || 'N/A'}</span>
        </div>

        <div className='user-field'>
          <label>Location:</label>
          <span>{user.location || 'N/A'}</span>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;