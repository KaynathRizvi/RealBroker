import { useNavigate } from 'react-router-dom';
import '../styles/Dashboard.css'

// Dashboard component - main admin dashboard page
const Dashboard = () => {
  const navigate = useNavigate();

  // Function to handle logout: remove token and redirect to home/login page
  const handleLogout = () => {
    localStorage.removeItem('token');  // Clear saved auth token
    navigate('/');                      // Redirect to home page
  };

  return (
    <div className='dashboard-container'>
      {/* Header section */}
      <div className='dashboard-header'>
        <h2>Dashboard</h2>
      </div>

      {/* Cards for navigation */}
      <div className='card-container'>
        {/* Navigate to Users management page */}
        <div className='user-card' onClick={() => navigate('/users')}>
          <h3>Users</h3>
        </div>

        {/* Navigate to Properties management page */}
        <div className='property-card' onClick={() => navigate('/properties')}>
          <h3>Properties</h3>
        </div>

        {/* Logout card triggers logout function */}
        <div className='logout-card' onClick={handleLogout}>
          <h3>Logout</h3>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;