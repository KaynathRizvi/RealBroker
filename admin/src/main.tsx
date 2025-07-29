// src/main.tsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import UserLists from './pages/UserLists';
import PropertyLists from './pages/PropertyLists';
import ForgotPassword from './ForgotPassword';
import ResetPassword from './ResetPassword';
import AdminUserProfile from './pages/UserProfile';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<UserLists />} />
      <Route path="/properties" element={<PropertyLists />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/userprofile/:id" element={<AdminUserProfile />} />
    </Routes>
  </BrowserRouter>
);
