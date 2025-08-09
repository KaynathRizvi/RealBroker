import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../config';
import '../styles/PropertyLists.css';

// Define the Property interface for type safety
interface Property {
  id: number;
  property_name: string;
  deal_price: number;
  email: string;
  owner_name: string;
}

// Component to list all properties for admin with ability to delete and navigate to details
const PropertyLists: React.FC = () => {
  // State to hold list of properties fetched from backend
  const [properties, setProperties] = useState<Property[]>([]);
  
  // State to track loading status
  const [loading, setLoading] = useState(true);
  
  // State to hold any error messages
  const [error, setError] = useState('');
  
  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  // Function to fetch properties from API with authorization token
  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/api/admin/properties`, {
        headers: {
          Authorization: `Bearer ${token}`, // Send JWT token in header
        },
      });

      // Parse response JSON data
      const data = await res.json();

      // Update state with fetched properties
      setProperties(data);
    } catch (err) {
      console.error(err);
      // Set error message if fetching fails
      setError('Failed to fetch properties');
    } finally {
      // Loading finished regardless of success or failure
      setLoading(false);
    }
  };

  // Function to delete a property by ID
  const deleteProperty = async (id: number) => {
    // Confirm before deleting
    const confirm = window.confirm('Are you sure you want to delete this property?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/api/admin/property/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`, // JWT token for authorization
        },
      });

      const data = await res.json();

      if (res.ok) {
        alert('Property deleted successfully');
        // Optionally refetch or update state to remove deleted property from list
        fetchProperties(); // Refetch updated list after deletion
      } else {
        // Show error message from response or default message
        alert(data.message || 'Failed to delete property');
      }
    } catch (error) {
      alert('Something went wrong');
    }
  };

  // Show loading indicator while fetching properties
  if (loading) return <p>Loading properties...</p>;

  // Show error message if fetch failed
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="property-lists-container">
      {/* Top bar with back button and heading */}
      <div className="property-topbar">
        {/* Navigate back to dashboard */}
        <button onClick={() => navigate('/dashboard')} className="back-button">← Back</button>
        <h2>Property List</h2>
      </div>

      {/* Table to display property info */}
      <table border={1} cellPadding={8} className="property-table">
        <thead>
          <tr>
            <th>Owner's Name</th>
            <th>Property Name</th>
            <th>Price (₹)</th>
            <th>Owner Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* Iterate over properties to create rows */}
          {properties.map((p) => (
            <tr key={p.id}>
              <td>{p.owner_name}</td>
              <td>
                {/* Property name clickable to navigate to detail page */}
                <span 
                  className="property-name-link"
                  onClick={() => navigate(`/property-detail?id=${p.id}`)}
                >
                  {p.property_name}
                </span>
              </td>
              {/* Display deal price or fallback 'N/A' */}
              <td>{p.deal_price ?? 'N/A'}</td>
              <td>{p.email}</td>
              <td>
                {/* Delete button triggers deleteProperty function */}
                <button onClick={() => deleteProperty(p.id)} className="p-delete-button">
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

export default PropertyLists;