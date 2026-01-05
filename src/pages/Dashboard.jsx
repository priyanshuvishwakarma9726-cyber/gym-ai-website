
import React from 'react';
import { useAuth } from '../context/AuthContext';
import ProgressTracker from '../components/ProgressTracker';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="app-shell" style={{ padding: '24px' }}>
            {/* Header */}
            <header style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Hello, {user?.user_metadata?.display_name || 'Athlete'}</h1>
                    <p>Let's crush some goals today.</p>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), var(--accent))' }}></div>
            </header>

            {/* Daily Motivation (Engagement Phase 1) */}
            <div className="card-premium" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(0,0,0,0))' }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: '#a78bfa' }}>Daily Focus</div>
                <div style={{ fontSize: '1.2rem', fontWeight: 600, fontStyle: 'italic' }}>"Discipline is doing what needs to be done, even if you don't want to do it."</div>
            </div>

            {/* Streak & Quick Actions */}
            <div className="grid-2" style={{ marginBottom: '32px' }}>
                <div className="card-premium" style={{ border: '1px solid #4ade80' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800 }}>3 <span style={{ fontSize: '1rem', fontWeight: 500 }}>Days</span></div>
                    <div style={{ fontSize: '0.85rem', color: '#4ade80' }}>🔥 Current Streak</div>
                </div>
                <div className="card-premium" onClick={() => navigate('/start')} style={{ cursor: 'pointer', border: '1px solid var(--primary)', background: 'rgba(124, 58, 237, 0.1)' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Start</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>Quick Workout →</div>
                </div>
            </div>

            {/* Progress Section */}
            <section>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '16px' }}>Your Progress</h2>
                <div className="card-premium" style={{ padding: '0', overflow: 'hidden' }}>
                    <ProgressTracker />
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
