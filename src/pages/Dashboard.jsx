
import React from 'react';
import { useAuth } from '../context/AuthContext';
import ProgressTracker from '../components/ProgressTracker';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="page-container">
            {/* Header */}
            <header style={{ marginBottom: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem' }}>Hello, {user?.user_metadata?.display_name || 'Valid User'}</h1>
                    <p>Let's crush some goals today.</p>
                </div>
                <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), var(--accent))' }}></div>
            </header>

            {/* Quick Actions */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                <div className="glass-card" onClick={() => navigate('/start')} style={{ cursor: 'pointer', borderColor: 'var(--primary)' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>💪</div>
                    <div style={{ fontWeight: 700, color: 'white' }}>New Workout</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)' }}>Generate →</div>
                </div>
                <div className="glass-card" onClick={() => navigate('/planner')} style={{ cursor: 'pointer' }}>
                    <div style={{ fontSize: '1.5rem', marginBottom: '5px' }}>🍏</div>
                    <div style={{ fontWeight: 700, color: 'white' }}>New Diet</div>
                    <div style={{ fontSize: '0.8rem', color: '#ccc' }}>Create →</div>
                </div>
            </div>

            {/* Progress Section */}
            <section>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>Your Progress</h2>
                <div className="glass-card" style={{ padding: '0', overflow: 'hidden' }}>
                    <ProgressTracker />
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
