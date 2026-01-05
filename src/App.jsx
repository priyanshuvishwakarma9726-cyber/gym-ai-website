
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AIWorkout from './pages/AIWorkout';
import AIDiet from './pages/AIDiet';
import Sidebar from './components/Sidebar';

// Layout Component (SaaS Structure)
const Layout = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    // Public Layout (Simpler, Centered)
    return <div style={{ height: '100vh', display: 'flex', flexDirection: 'column' }}>{children}</div>;
  }

  // Private SaaS Layout
  return (
    <div className="app-layout">
      <Sidebar />
      <div className="main-content">
        {children}
      </div>
    </div>
  );
};

// Home Redirect
const HomeRedirect = () => {
  const { user } = useAuth();
  if (user) return <Navigate to="/dashboard" />;
  return <Navigate to="/login" />;
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <GameProvider>
          <Layout>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<HomeRedirect />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />

              {/* Protected SaaS App Routes */}
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/ai-workout" element={<ProtectedRoute><AIWorkout /></ProtectedRoute>} />
              <Route path="/ai-diet" element={<ProtectedRoute><AIDiet /></ProtectedRoute>} />

              {/* Placeholders for future phases */}
              <Route path="/progress" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/insights" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/settings" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            </Routes>
          </Layout>
        </GameProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
