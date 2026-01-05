
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
            // Use Vercel Serverless Function endpoint
            const res = await fetch('/api/workout', {
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
        <div className="page-container">
            <h1 style={{ marginBottom: '10px' }}>AI Planner</h1>
            <p style={{ marginBottom: '30px' }}>Generate free customized plans for your fitness journey.</p>

            {/* Tabs */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '30px' }}>
                <button
                    onClick={() => setActiveTab('workout')}
                    className={activeTab === 'workout' ? 'btn-primary' : 'btn-secondary'}
                >
                    Workout Plan
                </button>
                <button
                    onClick={() => setActiveTab('diet')}
                    className={activeTab === 'diet' ? 'btn-primary' : 'btn-secondary'}
                >
                    Diet Plan
                </button>
            </div>

            {activeTab === 'workout' ? (
                <div style={{ display: 'grid', gap: '20px' }}>
                    {/* Form Section */}
                    <div className="glass-card">
                        <h3 style={{ marginBottom: '20px', color: 'var(--primary)' }}>Workout Parameters</h3>
                        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ fontSize: '0.9rem', marginBottom: '5px', display: 'block' }}>Age</label>
                                    <input name="age" type="number" value={formData.age} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.9rem', marginBottom: '5px', display: 'block' }}>Gender</label>
                                    <select name="gender" value={formData.gender} onChange={handleChange}>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                    </select>
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                <div>
                                    <label style={{ fontSize: '0.9rem', marginBottom: '5px', display: 'block' }}>Weight (kg)</label>
                                    <input name="weight" type="number" value={formData.weight} onChange={handleChange} required />
                                </div>
                                <div>
                                    <label style={{ fontSize: '0.9rem', marginBottom: '5px', display: 'block' }}>Goal</label>
                                    <select name="goal" value={formData.goal} onChange={handleChange}>
                                        <option value="fat loss">Fat Loss</option>
                                        <option value="muscle gain">Muscle Gain</option>
                                        <option value="strength">Strength</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label style={{ fontSize: '0.9rem', marginBottom: '5px', display: 'block' }}>Experience</label>
                                <select name="experience" value={formData.experience} onChange={handleChange}>
                                    <option value="beginner">Beginner</option>
                                    <option value="intermediate">Intermediate</option>
                                    <option value="advanced">Advanced</option>
                                </select>
                            </div>

                            <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '10px' }}>
                                {loading ? 'Generating...' : 'Generate Plan'}
                            </button>
                        </form>

                        {/* Tools Section */}
                        <div style={{ marginTop: '30px', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px' }}>
                            <BMICalculator />
                        </div>
                    </div>

                    {/* Results Section */}
                    <div>
                        {plan ? (
                            <div className="glass-card">
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
                        ) : null}
                    </div>
                </div>
            ) : (
                <DietPlanner />
            )}
        </div>
    );
};


export default Planner;
