// admin/pages/Dashboard.tsx
import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <div className='dashboard-container'>
      <div className='dashboard-header'>
        <h2>Dashboard</h2>
      </div>

      <div className='card-container'>
        <div className='user-card' onClick={() => navigate('/users')}>
          <h3>Users</h3>
        </div>
        <div className='property-card' onClick={() => navigate('/properties')}>
          <h3>Properties</h3>
        </div>
        <div className='logout-card' onClick={handleLogout}>
          <h3>Logout</h3>
        </div>
      </div>
    </div>
  );
};


export default Dashboard;
