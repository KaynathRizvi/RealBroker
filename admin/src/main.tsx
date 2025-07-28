// src/main.tsx
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import UserLists from './pages/UserLists';
import PropertyLists from './pages/PropertyLists';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/users" element={<UserLists />} />
      <Route path="/properties" element={<PropertyLists />} />
    </Routes>
  </BrowserRouter>
);
