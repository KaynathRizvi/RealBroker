import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../config';
import '../styles/PropertyLists.css';

interface Property {
  id: number;
  property_name: string;
  deal_price: number;
  email: string;
  owner_name: string;
}

const PropertyLists: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/api/admin/properties`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProperties(data);
    } catch (err) {
      console.error(err);
      setError('Failed to fetch properties');
    } finally {
      setLoading(false);
    }
  };

  const deleteProperty = async (id: number) => {
    const confirm = window.confirm('Are you sure you want to delete this property?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/api/admin/property/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
      alert('Property deleted successfully');
      // Optionally refetch the list or update state
    } else {
      alert(data.message || 'Failed to delete property');
    }
  } catch (error) {
    alert('Something went wrong');
  }
};

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="property-lists-container">
      <div className="property-topbar">
        <button onClick={() => navigate('/dashboard')} className="back-button">← Back</button>
        <h2>Property List</h2>
      </div>

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
          {properties.map((p) => (
            <tr key={p.id}>
              <td>{p.owner_name}</td>
              <td>{p.property_name}</td>
              <td>{p.deal_price ?? 'N/A'}</td>
              <td>{p.email}</td>
              <td>
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
