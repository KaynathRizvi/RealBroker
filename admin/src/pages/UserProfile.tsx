import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../config.ts';
import '../styles/UserProfile.css';

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

const UserProfile: React.FC = () => {
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
    <div className='user-profile-container'>
      <button onClick={() => navigate('/users')} className='back-button'>
        ← Back
      </button>
      <h2 className='user-profile-header'>User Profile</h2>
      <div className='profile-box'>
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
