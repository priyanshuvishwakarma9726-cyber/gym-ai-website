
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const AdminDashboard = () => {
    const [members, setMembers] = useState([]);
    const [selectedMember, setSelectedMember] = useState(null);
    const [memberLogs, setMemberLogs] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchMembers();
    }, []);

    useEffect(() => {
        if (selectedMember) {
            fetchMemberStats(selectedMember.id);
        }
    }, [selectedMember]);

    const fetchMembers = async () => {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .order('created_at', { ascending: false });
            if (error) throw error;
            setMembers(data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchMemberStats = async (userId) => {
        try {
            const { data, error } = await supabase
                .from('progress_logs')
                .select('*')
                .eq('user_id', userId)
                .order('date', { ascending: true });
            if (error) throw error;
            setMemberLogs(data || []);
        } catch (error) {
            console.error(error);
        }
    };

    const toggleStatus = async (id, currentStatus) => {
        try {
            const { error } = await supabase
                .from('profiles')
                .update({ is_active: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            // Optimistic update
            setMembers(members.map(m => m.id === id ? { ...m, is_active: !currentStatus } : m));
        } catch (error) {
            alert('Error updating status: ' + error.message);
        }
    };

    const chartData = {
        labels: memberLogs.map(log => new Date(log.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Weight (kg)',
                data: memberLogs.map(log => log.weight),
                borderColor: '#fca311',
                backgroundColor: 'rgba(252, 163, 17, 0.5)',
                tension: 0.3,
            },
        ],
    };

    return (
        <div style={{ padding: '4rem', maxWidth: '1200px', margin: '0 auto', color: 'white' }}>
            <h1 style={{ marginBottom: '2rem' }}>Admin Dashboard</h1>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
                {/* Members List */}
                <div className="glass-panel" style={{ padding: '2rem', maxHeight: '600px', overflowY: 'auto' }}>
                    <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Members ({members.length})</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        {members.map(member => (
                            <div key={member.id} style={{
                                padding: '1rem',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '8px',
                                background: selectedMember?.id === member.id ? 'rgba(252, 163, 17, 0.1)' : 'transparent',
                                cursor: 'pointer',
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center'
                            }} onClick={() => setSelectedMember(member)}>
                                <div>
                                    <div style={{ fontWeight: '600' }}>{member.email}</div>
                                    <div style={{ fontSize: '0.8rem', color: '#ccc' }}>Role: {member.role}</div>
                                    <div style={{ fontSize: '0.8rem', color: member.is_active ? '#2ecc71' : '#e74c3c' }}>
                                        {member.is_active ? 'Active' : 'Inactive'}
                                    </div>
                                </div>
                                <div onClick={(e) => e.stopPropagation()}>
                                    <button
                                        onClick={() => toggleStatus(member.id, member.is_active)}
                                        style={{
                                            background: member.is_active ? '#e74c3c' : '#2ecc71',
                                            border: 'none',
                                            padding: '4px 8px',
                                            borderRadius: '4px',
                                            color: 'white',
                                            cursor: 'pointer',
                                            fontSize: '0.8rem'
                                        }}>
                                        {member.is_active ? 'Deactivate' : 'Activate'}
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Member Details */}
                <div className="glass-panel" style={{ padding: '2rem' }}>
                    {selectedMember ? (
                        <>
                            <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Member Progress</h3>
                            <p style={{ marginBottom: '1.5rem', color: '#ccc' }}>Viewing data for: {selectedMember.email}</p>

                            {memberLogs.length > 0 ? (
                                <Line data={chartData} options={{ responsive: true, plugins: { legend: { labels: { color: 'white' } } }, scales: { y: { ticks: { color: 'white' } }, x: { ticks: { color: 'white' } } } }} />
                            ) : (
                                <p>No progress data found for this user.</p>
                            )}
                        </>
                    ) : (
                        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <p style={{ color: '#666' }}>Select a member to view details.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
