
import React, { useState } from 'react';

const BMICalculator = () => {
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
    const [result, setResult] = useState(null);

    const calculateBMI = (e) => {
        e.preventDefault();
        if (!height || !weight) return;

        const heightInMeters = height / 100;
        const bmiValue = (weight / (heightInMeters * heightInMeters)).toFixed(1);

        let category = '';
        let color = '';

        if (bmiValue < 18.5) {
            category = 'Underweight';
            color = '#3498db'; // Blue
        } else if (bmiValue >= 18.5 && bmiValue <= 24.9) {
            category = 'Normal';
            color = '#2ecc71'; // Green
        } else if (bmiValue >= 25 && bmiValue <= 29.9) {
            category = 'Overweight';
            color = '#f1c40f'; // Yellow
        } else {
            category = 'Obese';
            color = '#e74c3c'; // Red
        }

        setResult({ bmi: bmiValue, category, color });
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', color: 'white', maxWidth: '400px' }}>
            <h3 style={{ marginBottom: '1.5rem', textAlign: 'center', color: 'var(--primary)' }}>BMI Calculator</h3>

            <form onSubmit={calculateBMI} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                    <label style={{ fontSize: '0.9rem', color: '#ccc' }}>Height (cm)</label>
                    <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="e.g. 175"
                        style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px' }}
                        required
                    />
                </div>

                <div>
                    <label style={{ fontSize: '0.9rem', color: '#ccc' }}>Weight (kg)</label>
                    <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="e.g. 70"
                        style={{ width: '100%', padding: '0.8rem', marginTop: '0.5rem', background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', borderRadius: '4px' }}
                        required
                    />
                </div>

                <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem' }}>Calculate</button>
            </form>

            {result && (
                <div style={{ marginTop: '2rem', textAlign: 'center', paddingTop: '1rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                    <div style={{ fontSize: '3rem', fontWeight: '800' }}>{result.bmi}</div>
                    <div style={{ color: result.color, fontSize: '1.2rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '1px' }}>
                        {result.category}
                    </div>
                </div>
            )}
        </div>
    );
};

export default BMICalculator;
