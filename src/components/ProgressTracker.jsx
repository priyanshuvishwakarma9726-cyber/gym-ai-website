
import React, { useState, useEffect } from 'react';
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
import { supabase } from '../lib/supabaseClient';
import { useAuth } from '../context/AuthContext';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const ProgressTracker = () => {
    const { user } = useAuth();
    const [logs, setLogs] = useState([]);
    const [formData, setFormData] = useState({
        weight: '',
        chest: '',
        waist: '',
        hips: '',
        date: new Date().toISOString().split('T')[0]
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user) fetchLogs();
    }, [user]);

    const fetchLogs = async () => {
        try {
            const { data, error } = await supabase
                .from('progress_logs')
                .select('*')
                .eq('user_id', user.id)
                .order('date', { ascending: true });

            if (error) throw error;
            setLogs(data || []);
        } catch (error) {
            console.error('Error fetching logs:', error.message);
        }
    };

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase
                .from('progress_logs')
                .insert([{
                    user_id: user.id,
                    weight: formData.weight,
                    chest: formData.chest || null,
                    waist: formData.waist || null,
                    hips: formData.hips || null,
                    date: formData.date
                }]);

            if (error) throw error;

            // Refresh logs and reset form
            fetchLogs();
            setFormData({
                weight: '',
                chest: '',
                waist: '',
                hips: '',
                date: new Date().toISOString().split('T')[0]
            });
        } catch (error) {
            alert('Error saving progress: ' + error.message);
        }
        setLoading(false);
    };

    // Chart Data Preparation
    const chartData = {
        labels: logs.map(log => new Date(log.date).toLocaleDateString()),
        datasets: [
            {
                label: 'Weight (kg)',
                data: logs.map(log => log.weight),
                borderColor: '#fca311',
                backgroundColor: 'rgba(252, 163, 17, 0.5)',
                tension: 0.3,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
                labels: { color: 'white' }
            },
            title: {
                display: true,
                text: 'Weight Progress Over Time',
                color: 'white'
            },
        },
        scales: {
            y: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255,255,255,0.1)' }
            },
            x: {
                ticks: { color: 'white' },
                grid: { color: 'rgba(255,255,255,0.1)' }
            }
        }
    };

    return (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem', marginTop: '2rem' }}>
            {/* Input Form */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Log Measurements</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label style={{ display: 'block', color: '#ccc', fontSize: '0.9rem' }}>Date</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: '#ccc', fontSize: '0.9rem' }}>Weight (kg)</label>
                        <input
                            type="number"
                            name="weight"
                            step="0.1"
                            value={formData.weight}
                            onChange={handleChange}
                            required
                            style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px' }}
                        />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: '#ccc', fontSize: '0.9rem' }}>Chest (cm) - Optional</label>
                        <input type="number" name="chest" value={formData.chest} onChange={handleChange}
                            style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px' }} />
                    </div>
                    <div>
                        <label style={{ display: 'block', color: '#ccc', fontSize: '0.9rem' }}>Waist (cm) - Optional</label>
                        <input type="number" name="waist" value={formData.waist} onChange={handleChange}
                            style={{ width: '100%', padding: '0.8rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px' }} />
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? 'Saving...' : 'Add Log'}
                    </button>
                </form>
            </div>

            {/* Chart Section */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
                {logs.length > 0 ? (
                    <Line options={options} data={chartData} />
                ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <p style={{ color: '#666' }}>No data logged. Add your first entry!</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProgressTracker;
