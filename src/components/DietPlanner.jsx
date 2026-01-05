
import React, { useState } from 'react';
import { motion } from 'framer-motion';

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
        <div style={{ display: 'grid', gap: '24px' }}>
            {/* Input Card */}
            <div className="card-premium">
                <h3 style={{ marginBottom: '20px', color: 'var(--accent)' }}>Nutrition Parameters</h3>
                <form onSubmit={handleSubmit} className="stack-gap">
                    <div>
                        <label className="text-label">Goal</label>
                        <select name="goal" className="input-field" value={formData.goal} onChange={handleChange}>
                            <option value="fat loss">Fat Loss</option>
                            <option value="muscle gain">Muscle Gain</option>
                            <option value="maintenance">Maintenance</option>
                        </select>
                    </div>

                    <div className="grid-2">
                        <div>
                            <label className="text-label">BMI (Optional)</label>
                            <input name="bmi" type="number" step="0.1" className="input-field" placeholder="e.g. 22.5" value={formData.bmi} onChange={handleChange} />
                        </div>
                        <div>
                            <label className="text-label">Preference</label>
                            <select name="preference" className="input-field" value={formData.preference} onChange={handleChange}>
                                <option value="veg">Vegetarian</option>
                                <option value="non-veg">Non-Veg</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="text-label">Meals Per Day</label>
                        <select name="mealsPerDay" className="input-field" value={formData.mealsPerDay} onChange={handleChange}>
                            <option value="3">3 Meals</option>
                            <option value="4">4 Meals (+ Snack)</option>
                            <option value="5">5 Meals (+ 2 Snacks)</option>
                        </select>
                    </div>

                    <button type="submit" className="btn-hero" disabled={loading} style={{ marginTop: '10px' }}>
                        {loading ? 'Generating Diet...' : 'Design Nutrition Plan'}
                    </button>
                </form>
            </div>

            {/* Results Card */}
            {plan && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card-premium" style={{ border: '1px solid var(--accent)' }}>
                    <div style={{ textAlign: 'center', marginBottom: '24px' }}>
                        <div className="text-label" style={{ color: 'var(--accent)' }}>RECOMMENDED PLAN</div>
                        <h2 style={{ fontSize: '1.8rem', lineHeight: 1.2 }}>{plan.summary}</h2>
                    </div>

                    <div className="stack-gap">
                        {plan.meals.map((meal, idx) => (
                            <div key={idx} style={{
                                background: 'rgba(255,255,255,0.05)',
                                padding: '16px', borderRadius: '16px',
                                display: 'flex', alignItems: 'center', gap: '16px'
                            }}>
                                <div style={{
                                    width: '40px', height: '40px', borderRadius: '12px',
                                    background: 'rgba(6, 182, 212, 0.2)', color: 'var(--accent)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700
                                }}>{idx + 1}</div>
                                <div>
                                    <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>{meal.meal}</div>
                                    <div style={{ fontSize: '1.1rem', fontWeight: 600 }}>{meal.name}</div>
                                    <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>{meal.calories} kcal • {meal.protein} protein</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            )}
        </div>
    );
};

export default DietPlanner;
