
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabaseClient';
import { motion } from 'framer-motion';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const handleInvite = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Mock Admin Action (In real app, call a cloud function)
        setTimeout(() => {
            setMsg(`Invitation sent to ${email}`);
            setLoading(false);
            setEmail('');
        }, 1000);
    };

    return (
        <div className="app-shell" style={{ padding: '24px' }}>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>

                <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Admin Console</h1>
                <p style={{ marginBottom: '32px' }}>Manage users & system health.</p>

                {/* KPI Cards */}
                <div className="grid-2" style={{ marginBottom: '24px' }}>
                    <div className="card-premium">
                        <div className="text-label">Total Users</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800 }}>1,240</div>
                    </div>
                    <div className="card-premium">
                        <div className="text-label">Active Plans</div>
                        <div style={{ fontSize: '2rem', fontWeight: 800 }}>856</div>
                    </div>
                </div>

                {/* System Status */}
                <div className="card-premium" style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                        <div style={{ fontWeight: 700, fontSize: '1.2rem' }}>System Health</div>
                        <div style={{ color: '#4ade80', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '6px' }}>
                            <span style={{ width: '8px', height: '8px', background: '#4ade80', borderRadius: '50%' }}></span>
                            All Systems Operational
                        </div>
                    </div>
                </div>

                {/* User Mgmt */}
                <div className="card-premium">
                    <h3 style={{ marginBottom: '16px' }}>Invite New Trainer</h3>
                    <form onSubmit={handleInvite}>
                        <div style={{ marginBottom: '16px' }}>
                            <label className="text-label">Email Address</label>
                            <input
                                className="input-field"
                                type="email"
                                placeholder="trainer@gym.ai"
                                value={email}
                                onChange={e => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        {msg && <div style={{ color: '#4ade80', marginBottom: '16px', fontSize: '0.9rem' }}>{msg}</div>}
                        <button className="btn-hero" disabled={loading} style={{ fontSize: '0.9rem', padding: '12px' }}>
                            {loading ? 'Sending...' : 'Send Invitation'}
                        </button>
                    </form>
                </div>

            </motion.div>
        </div>
    );
};

export default AdminDashboard;
