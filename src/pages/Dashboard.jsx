
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const { user } = useAuth();
    const { xp, streak, water, sleep } = useGame();
    const navigate = useNavigate();

    return (
        <div>
            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1 style={{ marginBottom: '4px' }}>Dashboard Overview</h1>
                    <p style={{ margin: 0 }}>Welcome back, {user?.user_metadata?.display_name || 'Admin'}. Here is what's happening today.</p>
                </div>
                <div style={{ display: 'flex', gap: '12px' }}>
                    <button className="btn-saas-secondary">All Reports</button>
                    <button className="btn-saas-primary" onClick={() => navigate('/start')}>+ New Plan</button>
                </div>
            </div>

            {/* KPI Cards */}
            <div className="grid-4" style={{ marginBottom: '24px' }}>
                <KPICard title="Total XP" value={xp.toLocaleString()} change="+12% vs last week" />
                <KPICard title="Active Streak" value={`${streak} Days`} change="Keep it up!" />
                <KPICard title="Avg Sleep" value={`${sleep} hrs`} change="-1hr vs target" negative />
                <KPICard title="Hydration" value={`${water} Glasses`} change="On track" />
            </div>

            {/* Main Content Areas */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>

                {/* Left Column: Recent Activity / Plan */}
                <div>
                    <div className="card-saas">
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                            <h3>Current Active Plan: Hypertrophy Phase 1</h3>
                            <span style={{ color: 'var(--primary)', fontSize: '0.9rem', cursor: 'pointer' }}>View Full Plan</span>
                        </div>
                        <table className="saas-table">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Focus</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Monday</td>
                                    <td>Chest & Triceps</td>
                                    <td><span style={{ padding: '4px 8px', background: '#dcfce7', color: '#166534', borderRadius: '12px', fontSize: '0.8rem' }}>Complete</span></td>
                                    <td><button style={{ border: 'none', background: 'none', color: '#6b7280', cursor: 'pointer' }}>...</button></td>
                                </tr>
                                <tr>
                                    <td>Tuesday</td>
                                    <td>Back & Biceps</td>
                                    <td><span style={{ padding: '4px 8px', background: '#fef3c7', color: '#92400e', borderRadius: '12px', fontSize: '0.8rem' }}>Pending</span></td>
                                    <td><button className="btn-saas-primary" style={{ padding: '4px 12px', fontSize: '0.8rem' }} onClick={() => navigate('/workout')}>Start</button></td>
                                </tr>
                                <tr>
                                    <td>Wednesday</td>
                                    <td>Rest & Recovery</td>
                                    <td><span style={{ padding: '4px 8px', background: '#f3f4f6', color: '#374151', borderRadius: '12px', fontSize: '0.8rem' }}>Scheduled</span></td>
                                    <td>-</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>

                    <div className="card-saas">
                        <h3>Weekly Analytics</h3>
                        <div style={{ height: '200px', background: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#9ca3af', border: '1px dashed #d1d5db', borderRadius: '6px' }}>
                            Chart Placeholder (Recharts Integration Ready)
                        </div>
                    </div>
                </div>

                {/* Right Column: Insights & Quick Actions */}
                <div>
                    <div className="card-saas">
                        <h3>AI Insights</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                            <div style={{ padding: '12px', background: '#eff6ff', borderRadius: '6px', borderLeft: '4px solid var(--primary)' }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#1e3a8a', marginBottom: '4px' }}>Increase Protein</div>
                                <div style={{ fontSize: '0.85rem', color: '#1e40af' }}>Your recovery score is low. Try adding 20g protein post-workout.</div>
                            </div>
                            <div style={{ padding: '12px', background: '#f0fdf4', borderRadius: '6px', borderLeft: '4px solid var(--accent)' }}>
                                <div style={{ fontSize: '0.9rem', fontWeight: 600, color: '#14532d', marginBottom: '4px' }}>Great Consistency</div>
                                <div style={{ fontSize: '0.85rem', color: '#166534' }}>You've hit the gym 3 days in a row. Momentum is building!</div>
                            </div>
                        </div>
                    </div>

                    <div className="card-saas">
                        <h3>Quick Actions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <button className="btn-saas-secondary" style={{ width: '100%', textAlign: 'left' }}>📅 Log Body Weight</button>
                            <button className="btn-saas-secondary" style={{ width: '100%', textAlign: 'left' }}>🥗 Log Meal</button>
                            <button className="btn-saas-secondary" style={{ width: '100%', textAlign: 'left' }}>🔔 Update Reminders</button>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

const KPICard = ({ title, value, change, negative }) => (
    <div className="card-saas" style={{ marginBottom: 0 }}>
        <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '8px' }}>{title}</div>
        <div style={{ fontSize: '1.8rem', fontWeight: 700, marginBottom: '8px' }}>{value}</div>
        <div style={{ fontSize: '0.85rem', color: negative ? '#ef4444' : 'var(--accent)', fontWeight: 500 }}>{change}</div>
    </div>
);


export default Dashboard;
