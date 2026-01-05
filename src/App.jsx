
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Planner from './pages/Planner';
import AdminDashboard from './pages/AdminDashboard';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import AdminRoute from './components/AdminRoute';
import WhatsAppButton from './components/WhatsAppButton';
import './index.css';
import heroImage from './assets/hero.png';


const Home = () => {
  const [backendStatus, setBackendStatus] = useState('Checking...');
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    // Check Vercel Function Health
    fetch('/api/health')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'active') {
          setBackendStatus('System Optimal');
          setIsOnline(true);
        } else {
          setBackendStatus('System Issues');
        }
      })
      .catch(err => setBackendStatus('Backend Offline'));
  }, []);

  return (
    <main style={{ padding: '4rem', maxWidth: '1200px', margin: '0 auto', marginTop: '6rem' }}>
      <h1 style={{ fontSize: '5rem', fontWeight: '800', marginBottom: '1.5rem', lineHeight: '1.1' }}>
        AI FITNESS <br />
        <span style={{ color: 'var(--primary)' }}>GYM</span>
      </h1>
      <p style={{ fontSize: '1.2rem', maxWidth: '600px', marginBottom: '3rem', color: '#ccc' }}>
        Experience the future of fitness with our AI-powered training programs.
        Personalized workouts, real-time tracking, and next-level results.
      </p>

      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button className="btn-primary">Start Training</button>
        <div className="glass-panel" style={{ padding: '0.8rem 1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: isOnline ? '#0f0' : '#f00', display: 'inline-block', boxShadow: isOnline ? '0 0 10px #0f0' : 'none' }}></span>
          <span style={{ fontSize: '0.9rem', color: '#eee' }}>Status: {backendStatus}</span>
        </div>
      </div>
    </main>
  );
};

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: '100vh', position: 'relative' }}>
          {/* Background Image / Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `url(${heroImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: -1,
            opacity: 0.6
          }}></div>

          {/* Gradient Overlay */}
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'linear-gradient(to bottom, rgba(5,5,5,0.2) 0%, rgba(5,5,5,1) 90%)',
            zIndex: -1
          }}></div>

          <Navbar />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin" element={
              <AdminRoute>
                <AdminDashboard />
              </AdminRoute>
            } />
          </Routes>
          <WhatsAppButton />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
