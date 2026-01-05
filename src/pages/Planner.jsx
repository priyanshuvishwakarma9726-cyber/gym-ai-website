
import React, { useState } from 'react';
import BMICalculator from '../components/BMICalculator';
import DietPlanner from '../components/DietPlanner';

const Planner = () => {
    const [activeTab, setActiveTab] = useState('workout'); // workout | diet

    const [formData, setFormData] = useState({
        age: '',
        gender: 'male',
        weight: '',
        height: '',
        goal: 'fat loss',
        experience: 'beginner'
    });
    const [plan, setPlan] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await fetch('http://localhost:5000/ai/workout-plan', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });
            const data = await res.json();
            setPlan(data);
        } catch (err) {
            console.error(err);
        }
        setLoading(false);
    };

    return (
        <div style={{ padding: '4rem', maxWidth: '1000px', margin: '0 auto', color: 'white' }}>
            <h1>AI Planner</h1>
            <p style={{ color: '#ccc', marginBottom: '2rem' }}>Generate free customized plans for your fitness journey.</p>

            {/* Tabs */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                <button
                    onClick={() => setActiveTab('workout')}
                    style={{
                        background: activeTab === 'workout' ? 'var(--primary)' : 'transparent',
                        color: activeTab === 'workout' ? 'black' : 'white',
                        border: '1px solid var(--primary)',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Workout Plan
                </button>
                <button
                    onClick={() => setActiveTab('diet')}
                    style={{
                        background: activeTab === 'diet' ? 'var(--primary)' : 'transparent',
                        color: activeTab === 'diet' ? 'black' : 'white',
                        border: '1px solid var(--primary)',
                        padding: '10px 20px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: '600'
                    }}
                >
                    Diet Plan
                </button>
            </div>

            {activeTab === 'workout' ? (
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                    {/* Form Section */}
                    <div className="glass-panel" style={{ padding: '2rem' }}>
                        <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Workout Parameters</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            <div>
                                <label>Age</label>
                                <input name="age" type="number" value={formData.age} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }} />
                            </div>
                            <div>
                                <label>Gender</label>
                                <select name="gender" value={formData.gender} onChange={handleChange}
                                    style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', background: '#333', border: 'none', color: 'white' }}>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </select>
                            </div>
                            <div>
                                <label>Weight (kg)</label>
                                <input name="weight" type="number" value={formData.weight} onChange={handleChange} required
                                    style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }} />
                            </div>
                            <div>
                                <label>Goal</label>
                                <select name="goal" value={formData.goal} onChange={handleChange}
                                    style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', background: '#333', border: 'none', color: 'white' }}>
                                    <option value="fat loss">Fat Loss</option>
                                    <option value="muscle gain">Muscle Gain</option>
                                    <option value="strength">Strength</option>
                                </select>
                            </div>
                            <div>
                                <label>Experience</label>
                                <select name="experience" value={formData.experience} onChange={handleChange}
                                    style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', background: '#333', border: 'none', color: 'white' }}>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
                                {loading ? 'Generating...' : 'Generate Plan'}
                            </button>
                        </form>

                        {/* Tools Section */}
                        <div style={{ marginTop: '2rem' }}>
                            <BMICalculator />
                        </div>
                    </div>

                    {/* Results Section */}
                    <div>
                        {plan ? (
                            <div className="glass-panel" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
                                <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Your Custom Plan</h3>
                                <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>{plan.summary}</p>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {plan.schedule.map((day, idx) => (
                                        <div key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                                            <h4 style={{ color: '#fff' }}>{day.day} - <span style={{ color: 'var(--primary)' }}>{day.focus}</span></h4>
                                            <ul style={{ paddingLeft: '1.2rem', marginTop: '0.5rem', color: '#ccc' }}>
                                                {day.exercises.map((ex, i) => (
                                                    <li key={i}>{ex.name} - {ex.sets} sets x {ex.reps}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '16px' }}>
                                <p style={{ color: '#666' }}>Plan will appear here...</p>
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <DietPlanner />
            )}
        </div>
    );
};


export default Planner;
