
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import ProgressTracker from '../components/ProgressTracker';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const { xp, streak, water, sleep, logWater, logSleep } = useGame();
    const navigate = useNavigate();

    return (
        <div className="app-shell" style={{ padding: '24px' }}>
            {/* Header */}
            <header style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                    <h1 style={{ fontSize: '1.8rem', marginBottom: '4px' }}>Hello, {user?.user_metadata?.display_name || 'Athlete'}</h1>
                    <div style={{ color: 'var(--primary)', fontWeight: 700 }}>{xp} XP <span style={{ color: '#666', fontWeight: 400 }}>• Level {Math.floor(xp / 100) + 1}</span></div>
                </div>
                <div onClick={() => navigate('/profile')} style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), var(--accent))', cursor: 'pointer' }}></div>
            </header>

            {/* Daily Motivation */}
            <div className="card-premium" style={{ marginBottom: '24px', background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(0,0,0,0))' }}>
                <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '8px', color: '#a78bfa' }}>Daily Focus</div>
                <div style={{ fontSize: '1.1rem', fontWeight: 500, fontStyle: 'italic', lineHeight: 1.4 }}>"The only bad workout is the one that didn't happen."</div>
            </div>

            {/* Stats Grid */}
            <div className="grid-2" style={{ marginBottom: '24px' }}>
                <div className="card-premium" style={{ border: '1px solid #4ade80' }}>
                    <div style={{ fontSize: '2rem', fontWeight: 800 }}>{streak} <span style={{ fontSize: '1rem', fontWeight: 500 }}>Days</span></div>
                    <div style={{ fontSize: '0.85rem', color: '#4ade80' }}>🔥 Streak</div>
                </div>
                <div className="card-premium" onClick={() => navigate('/workout')} style={{ cursor: 'pointer', border: '1px solid var(--primary)', background: 'rgba(124, 58, 237, 0.1)' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white', marginBottom: '4px' }}>Start</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--primary)', fontWeight: 600 }}>Quick Session →</div>
                </div>
            </div>

            {/* Trackers */}
            <div className="grid-2" style={{ marginBottom: '32px' }}>
                <div className="card-premium" onClick={logWater} style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>💧</div>
                    <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{water} <span style={{ fontSize: '0.9rem', fontWeight: 400 }}>Glasses</span></div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tap to log</div>
                </div>
                <div className="card-premium" onClick={logSleep} style={{ cursor: 'pointer', textAlign: 'center' }}>
                    <div style={{ fontSize: '2rem', marginBottom: '8px' }}>😴</div>
                    <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>{sleep}h <span style={{ fontSize: '0.9rem', fontWeight: 400 }}>Sleep</span></div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Tap to edit</div>
                </div>
            </div>

            {/* Progress Section */}
            <section style={{ marginBottom: '100px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h2 style={{ fontSize: '1.2rem' }}>Body Stats</h2>
                    <button onClick={() => navigate('/planner')} className="btn-ghost" style={{ width: 'auto', padding: '6px 12px', fontSize: '0.8rem' }}>Update</button>
                </div>
                <div className="card-premium" style={{ padding: '0', overflow: 'hidden' }}>
                    <ProgressTracker />
                </div>
            </section>
        </div>
    );
};

export default Dashboard;
