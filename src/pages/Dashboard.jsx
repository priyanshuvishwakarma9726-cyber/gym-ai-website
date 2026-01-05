
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

            {/* Quick Actions */}
            <div className="grid-2" style={{ marginBottom: '32px' }}>
                <div className="card-premium" onClick={() => navigate('/start')} style={{ cursor: 'pointer', border: '1px solid var(--primary)', background: 'rgba(124, 58, 237, 0.1)' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '12px' }}>💪</div>
                    <div style={{ fontWeight: 700, color: 'white', marginBottom: '4px' }}>New Workout</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>Generate →</div>
                </div>
                <div className="card-premium" onClick={() => navigate('/planner')} style={{ cursor: 'pointer' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '12px' }}>🍏</div>
                    <div style={{ fontWeight: 700, color: 'white', marginBottom: '4px' }}>New Diet</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Create →</div>
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
