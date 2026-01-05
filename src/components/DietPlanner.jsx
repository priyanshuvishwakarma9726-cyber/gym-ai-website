
import React, { useState } from 'react';

const DietPlanner = () => {
    const [formData, setFormData] = useState({
        goal: 'fat loss',
        bmi: '',
        preference: 'veg',
        mealsPerDay: '3'
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
            const res = await fetch('/api/diet', {
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', color: 'white' }}>
            {/* Form Section */}
            <div className="glass-panel" style={{ padding: '2rem' }}>
                <h3 style={{ marginBottom: '1.5rem', color: 'var(--primary)' }}>Diet Preferences</h3>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div>
                        <label>Current Goal</label>
                        <select name="goal" value={formData.goal} onChange={handleChange}
                            style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', background: '#333', border: 'none', color: 'white' }}>
                            <option value="fat loss">Fat Loss</option>
                            <option value="muscle gain">Muscle Gain</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>
                    <div>
                        <label>Current BMI (optional for calorie tuning)</label>
                        <input name="bmi" type="number" step="0.1" value={formData.bmi} onChange={handleChange} placeholder="e.g. 24.5"
                            style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white' }} />
                    </div>
                    <div>
                        <label>Food Preference</label>
                        <select name="preference" value={formData.preference} onChange={handleChange}
                            style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', background: '#333', border: 'none', color: 'white' }}>
                            <option value="veg">Vegetarian</option>
                            <option value="non-veg">Non-Vegetarian</option>
                        </select>
                    </div>
                    <div>
                        <label>Meals Per Day</label>
                        <select name="mealsPerDay" value={formData.mealsPerDay} onChange={handleChange}
                            style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', background: '#333', border: 'none', color: 'white' }}>
                            <option value="3">3 Meals</option>
                            <option value="4">4 Meals (incl. snack)</option>
                            <option value="5">5 Meals (incl. 2 snacks)</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-primary" disabled={loading} style={{ marginTop: '1rem' }}>
                        {loading ? 'Generating...' : 'Generate Diet'}
                    </button>
                </form>
            </div>

            {/* Results Section */}
            <div>
                {plan ? (
                    <div className="glass-panel" style={{ padding: '2rem', height: '100%', overflowY: 'auto' }}>
                        <h3 style={{ color: 'var(--primary)', marginBottom: '1rem' }}>Your Diet Plan</h3>
                        <p style={{ marginBottom: '1.5rem', fontSize: '0.9rem' }}>{plan.summary}</p>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                            {plan.meals.map((meal, idx) => (
                                <div key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1rem' }}>
                                    <h4 style={{ color: '#fff' }}>{meal.meal}</h4>
                                    <div style={{ paddingLeft: '0rem', marginTop: '0.5rem', color: '#ccc', display: 'flex', justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: '600', color: 'white' }}>{meal.name}</span>
                                        <span style={{ fontSize: '0.8rem', background: 'rgba(255,255,255,0.1)', padding: '2px 8px', borderRadius: '4px' }}>
                                            {meal.calories} kcal / {meal.protein} protein
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px dashed rgba(255,255,255,0.1)', borderRadius: '16px' }}>
                        <p style={{ color: '#666' }}>Diet plan will appear here...</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DietPlanner;
