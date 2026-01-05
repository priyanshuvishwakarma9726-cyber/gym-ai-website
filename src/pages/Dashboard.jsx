
import React from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="page-scroll">
            {/* Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <h1>Executive Dashboard</h1>
                    <p>Real-time overview of your fitness performance.</p>
                </div>
                <div style={{ display: 'flex', gap: '10px' }}>
                    <button className="btn btn-outline">Export Report</button>
                    <button className="btn btn-primary" onClick={() => navigate('/ai-workout')}>+ Generate Plan</button>
                </div>
            </div>

            {/* Widgets */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
                <Widget title="Active Plan" value="Hypertrophy A" sub="Week 3 of 12" />
                <Widget title="Workouts Completed" value="12" sub="+2 this week" active />
                <Widget title="Current Weight" value="78.5 kg" sub="-0.5 kg change" />
                <Widget title="Next Session" value="Leg Day" sub="Scheduled Today" blue />
            </div>

            {/* Main Content Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px' }}>

                {/* Recent Activity Table */}
                <div className="card">
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                        <h3>Recent Training Logs</h3>
                        <button className="btn btn-outline" style={{ padding: '4px 8px', fontSize: '11px' }}>View All</button>
                    </div>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Session</th>
                                <th>Duration</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Oct 24, 2026</td>
                                <td>Pull / Back Focus</td>
                                <td>55 mins</td>
                                <td><span className="badge badge-success">Completed</span></td>
                            </tr>
                            <tr>
                                <td>Oct 22, 2026</td>
                                <td>Push / Chest</td>
                                <td>60 mins</td>
                                <td><span className="badge badge-success">Completed</span></td>
                            </tr>
                            <tr>
                                <td>Oct 20, 2026</td>
                                <td>Legs / Squat</td>
                                <td>45 mins</td>
                                <td><span className="badge badge-success">Completed</span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* AI Suggestions Panel */}
                <div className="card">
                    <div style={{ marginBottom: '20px' }}>
                        <h3>AI Recommendations</h3>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                        <Suggestion
                            title="Increase Intensity"
                            desc="Your last leg session volume was low. Recommend adding 1 set to Squats."
                        />
                        <Suggestion
                            title="Recovery Alert"
                            desc="Sleep data missing. Ensure 7h+ sleep for optimal recovery."
                        />
                        <button className="btn btn-accent" style={{ width: '100%' }}>Run Full Analysis</button>
                    </div>
                </div>

            </div>
        </div>
    );
};

const Widget = ({ title, value, sub, active, blue }) => (
    <div className="card" style={{ borderLeft: active ? '4px solid var(--c-success)' : blue ? '4px solid var(--c-accent)' : '1px solid var(--c-border)' }}>
        <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--c-text-sec)', marginBottom: '8px' }}>{title}</div>
        <div style={{ fontSize: '24px', fontWeight: 700, marginBottom: '4px' }}>{value}</div>
        <div style={{ fontSize: '12px', color: active ? 'var(--c-success)' : 'var(--c-text-sec)' }}>{sub}</div>
    </div>
);

const Suggestion = ({ title, desc }) => (
    <div style={{ padding: '12px', background: '#f8fafc', borderRadius: '6px', border: '1px solid var(--c-border)' }}>
        <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--c-text-main)', marginBottom: '4px' }}>{title}</div>
        <div style={{ fontSize: '12px', color: 'var(--c-text-sec)' }}>{desc}</div>
    </div>
);

export default Dashboard;
