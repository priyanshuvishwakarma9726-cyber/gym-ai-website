
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
import MobileNav from './components/MobileNav';
import { motion } from 'framer-motion';

// Home Page Component
const Home = () => {
  const navigate = useNavigate();

  return (
    <main className="app-shell" style={{ paddingBottom: '120px', textAlign: 'center' }}>

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
        style={{ marginTop: '4rem', marginBottom: '4rem', padding: '0 20px' }}>

        <div style={{
          display: 'inline-block', padding: '6px 12px', borderRadius: '20px',
          background: 'rgba(124, 58, 237, 0.15)', color: 'var(--primary-light)',
          fontSize: '0.8rem', fontWeight: 600, marginBottom: '20px', border: '1px solid rgba(124, 58, 237, 0.3)'
        }}>
          V 2.0 LIVE
        </div>

        <h1 style={{ fontSize: 'clamp(3rem, 12vw, 4.5rem)', lineHeight: 1.1, marginBottom: '24px', letterSpacing: '-2px' }}>
          TRAIN <span className="text-gradient">SMARTER.</span>
        </h1>

        <p style={{ fontSize: '1.1rem', maxWidth: '400px', margin: '0 auto 40px auto', color: 'var(--text-secondary)' }}>
          The world's first <span style={{ color: 'white' }}>100% Free AI Trainer</span>.
          Generate professional workout & diet plans in seconds.
        </p>

        <div style={{ maxWidth: '300px', margin: '0 auto' }}>
          <button
            className="btn-hero"
            onClick={() => navigate('/start')}
            style={{ padding: '20px', fontSize: '1.2rem' }}>
            Start AI Session
          </button>
          <p style={{ fontSize: '0.8rem', marginTop: '16px', color: 'var(--text-dim)' }}>No credit card required</p>
        </div>
      </motion.div>

      {/* Feature Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px', textAlign: 'left', padding: '0 20px' }}>
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
  <div className="card-premium">
    <div style={{ fontSize: '2rem', marginBottom: '16px' }}>{icon}</div>
    <h3 style={{ fontSize: '1.3rem', marginBottom: '8px', color: 'white' }}>{title}</h3>
    <p style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{desc}</p>
  </div>
);

// Main App Structure
import Workout from './pages/Workout';
import Challenges from './pages/Challenges';
import Profile from './pages/Profile';
import { GameProvider } from './context/GameContext';

// ... (keep Home component same)

function App() {
  return (
    <Router>
      <AuthProvider>
        <GameProvider>
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
              <Route path="/workout" element={<Workout />} />
              <Route path="/challenges" element={<Challenges />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
            <MobileNav />
            <WhatsAppButton />
          </div>
        </GameProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
