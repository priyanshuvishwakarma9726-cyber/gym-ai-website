import React from 'react';
import { useAuth } from '../context/AuthContext';
import ProgressTracker from '../components/ProgressTracker';

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div style={{ padding: '4rem', color: 'white', maxWidth: '1200px', margin: '0 auto' }}>
            <h1>Welcome Back!</h1>
            <p style={{ marginTop: '1rem', fontSize: '1.2rem', color: '#ccc' }}>
                User: {user.email}
            </p>

            {/* Progress Tracker Section */}
            <h2 style={{ marginTop: '3rem', borderBottom: '1px solid #333', paddingBottom: '0.5rem' }}>Your Progress</h2>
            <ProgressTracker />
        </div>
    );
};

export default Dashboard;
