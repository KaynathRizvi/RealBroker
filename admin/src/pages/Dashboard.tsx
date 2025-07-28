// admin/pages/Dashboard.tsx
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h2>Dashboard</h2>
      </div>

      <div style={styles.cardContainer}>
        <div style={styles.card} onClick={() => navigate('/users')}>
          <h3>Users</h3>
        </div>
        <div style={styles.card} onClick={() => navigate('/properties')}>
          <h3>Properties</h3>
        </div>
        <div style={styles.card} onClick={handleLogout}>
          <h3>Logout</h3>
        </div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    padding: '2rem',
    background: '#f9f9f9',
    height: '100vh',
  },
  header: {
    marginBottom: '1rem',
  },
  cardContainer: {
    display: 'flex',
    gap: '1rem',
  },
  card: {
    padding: '2rem',
    background: '#fff',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    width: '150px',
    textAlign: 'center',
  },
};

export default Dashboard;
