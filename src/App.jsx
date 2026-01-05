
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import Planner from './pages/Planner';
import Pricing from './pages/Pricing';
import Contact from './pages/Contact';
import AdminDashboard from './pages/AdminDashboard';
import AdminRoute from './components/AdminRoute';
import AITrainingSession from './pages/AITrainingSession';
import WhatsAppButton from './components/WhatsAppButton';
import { motion } from 'framer-motion';

// Home Page Component
const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="page-container" style={{ paddingBottom: '120px', textAlign: 'center' }}>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{ marginTop: '4rem', marginBottom: '4rem' }}>

        <div style={{
          display: 'inline-block', padding: '6px 12px', borderRadius: '20px',
          background: 'rgba(139, 92, 246, 0.1)', color: 'var(--primary)',
          fontSize: '0.8rem', fontWeight: 600, marginBottom: '20px'
        }}>
          ✨ V 2.0 IS LIVE
        </div>

        <h1 style={{ fontSize: 'clamp(3rem, 10vw, 5rem)', lineHeight: 1.1, marginBottom: '24px' }}>
          TRAIN <span className="text-gradient">SMARTER.</span>
        </h1>

        <p style={{ fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 40px auto' }}>
          The world's first <span style={{ color: 'white' }}>100% Free AI Trainer</span>.
          Generate professional workout & diet plans in seconds.
        </p>

        <div style={{ maxWidth: '300px', margin: '0 auto' }}>
          <button
            className="btn-primary"
            onClick={() => navigate('/start')}
            style={{ padding: '20px', fontSize: '1.2rem', boxShadow: '0 10px 30px rgba(139, 92, 246, 0.3)' }}>
            Start AI Session
          </button>
          <p style={{ fontSize: '0.8rem', marginTop: '16px', color: '#666' }}>No credit card required</p>
        </div>
      </motion.div>

      {/* Feature Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', textAlign: 'left' }}>
        <FeatureCard
          icon="⚡️" title="Instant Plans"
          desc="Get a full weekly routine in under 60 seconds based on your goal."
        />
        <FeatureCard
          icon="🥗" title="Smart Diet"
          desc="Nutrition tailored to your body type and food preferences."
        />
        <FeatureCard
          icon="📈" title="Progress Tracking"
          desc="Visualize your gains with beautiful automated charts."
        />
      </div>

    </main>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="glass-card">
    <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{icon}</div>
    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px', color: 'white' }}>{title}</h3>
    <p style={{ fontSize: '0.9rem' }}>{desc}</p>
  </div>
);

// Main App Structure
function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ minHeight: '100vh', position: 'relative' }}>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
            <Route path="/start" element={<AITrainingSession />} />
          </Routes>
          <WhatsAppButton />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
