
import React, { useState } from 'react';

const AIDiet = () => {
    const [generating, setGenerating] = useState(false);
    const [plan, setPlan] = useState(null);

    const handleGenerate = () => {
        setGenerating(true);
        setTimeout(() => {
            setPlan(true);
            setGenerating(false);
        }, 1500);
    };

    return (
        <div className="page-scroll">
            <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <div>
                        <h1>AI Nutrition Intelligence</h1>
                        <p>Optimized meal planning based on caloric needs and preferences.</p>
                    </div>
                </div>

                {/* KPI Bar */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
                    <NutriCard label="Daily Caloric Target" value="2,450 kcal" />
                    <NutriCard label="Protein" value="180g" />
                    <NutriCard label="Carbs" value="250g" />
                    <NutriCard label="Fats" value="80g" />
                </div>

                {/* Configuration Card */}
                <div className="card" style={{ marginBottom: '32px' }}>
                    <h3>Dietary Configuration</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 500 }}>Goal</label>
                            <select className="input">
                                <option>Fat Loss (Deficit)</option>
                                <option>Maintenance</option>
                                <option>Muscle Gain (Surplus)</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 500 }}>Preference</label>
                            <select className="input">
                                <option>Omnivore</option>
                                <option>Vegetarian</option>
                                <option>Vegan</option>
                                <option>Keto</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 500 }}>Meals / Day</label>
                            <select className="input">
                                <option>3 Meals</option>
                                <option>4 Meals</option>
                                <option>5 Meals</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <button className="btn btn-primary" onClick={handleGenerate} disabled={generating}>
                            {generating ? 'Analyzing Macros...' : 'Generate Meal Plan'}
                        </button>
                    </div>
                </div>

                {/* Results Table */}
                {plan && (
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div>
                                <h3>Proposed Meal Structure</h3>
                                <div style={{ fontSize: '12px', color: 'var(--c-text-sec)' }}>High protein focus with moderate carbs.</div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="btn btn-outline">Export PDF</button>
                                <button className="btn btn-primary">Save Plan</button>
                            </div>
                        </div>

                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Meal</th>
                                    <th>Suggestion</th>
                                    <th>Calories</th>
                                    <th>Protein</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Breakfast</td>
                                    <td>Oatmeal with Whey Protein & Berries</td>
                                    <td>450</td>
                                    <td>35g</td>
                                    <td><button className="btn btn-outline" style={{ padding: '2px 8px', fontSize: '11px' }}>Swap</button></td>
                                </tr>
                                <tr>
                                    <td>Lunch</td>
                                    <td>Grilled Chicken Breast with Quinoa</td>
                                    <td>650</td>
                                    <td>45g</td>
                                    <td><button className="btn btn-outline" style={{ padding: '2px 8px', fontSize: '11px' }}>Swap</button></td>
                                </tr>
                                <tr>
                                    <td>Snack</td>
                                    <td>Greek Yogurt + Almonds</td>
                                    <td>250</td>
                                    <td>15g</td>
                                    <td><button className="btn btn-outline" style={{ padding: '2px 8px', fontSize: '11px' }}>Swap</button></td>
                                </tr>
                                <tr>
                                    <td>Dinner</td>
                                    <td>Salmon Fillet with Asparagus</td>
                                    <td>550</td>
                                    <td>40g</td>
                                    <td><button className="btn btn-outline" style={{ padding: '2px 8px', fontSize: '11px' }}>Swap</button></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

const NutriCard = ({ label, value }) => (
    <div className="card" style={{ padding: '16px', textAlign: 'center' }}>
        <div style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--c-text-sec)', marginBottom: '4px' }}>{label}</div>
        <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--c-text-main)' }}>{value}</div>
    </div>
);

export default AIDiet;
