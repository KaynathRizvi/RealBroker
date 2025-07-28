import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SERVER_URL } from '../../config';

interface Property {
  property_id: number;
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

  const deleteProperty = async (property_id: number) => {
    const confirm = window.confirm('Are you sure you want to delete this property?');
    if (!confirm) return;

    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${SERVER_URL}/api/property/${property_id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.ok) {
        setProperties(prev => prev.filter(p => p.property_id !== property_id));
      } else {
        alert('Failed to delete property');
      }
    } catch (err) {
      alert('Error deleting property');
    }
  };

  if (loading) return <p>Loading properties...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div style={styles.container}>
      <div style={styles.topBar}>
        <button onClick={() => navigate('/dashboard')} style={styles.backButton}>← Back</button>
        <h2>Property List</h2>
      </div>

      <table border={1} cellPadding={8} style={styles.table}>
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
            <tr key={p.property_id}>
              <td>{p.owner_name}</td>
              <td>{p.property_name}</td>
              <td>{p.deal_price ?? 'N/A'}</td>
              <td>{p.email}</td>
              <td>
                <button onClick={() => deleteProperty(p.property_id)} style={styles.deleteButton}>
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
  deleteButton: {
    backgroundColor: '#ff4d4f',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    cursor: 'pointer',
    borderRadius: '4px',
  },
};

export default PropertyLists;
