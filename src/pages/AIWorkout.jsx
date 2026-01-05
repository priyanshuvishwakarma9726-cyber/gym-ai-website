
import React, { useState } from 'react';

const AIWorkout = () => {
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
                        <h1>AI Workout Intelligence</h1>
                        <p>Generate periodized training blocks based on your physiology.</p>
                    </div>
                </div>

                {/* Configuration Card */}
                <div className="card" style={{ marginBottom: '32px' }}>
                    <h3>Configuration Parameters</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginBottom: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 500 }}>Primary Goal</label>
                            <select className="input">
                                <option>Hypertrophy (Muscle Gain)</option>
                                <option>Strength (Powerlifting)</option>
                                <option>Endurance (Cardiovascular)</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 500 }}>Experience Level</label>
                            <select className="input">
                                <option>Intermediate (1-2 years)</option>
                                <option>Beginner (0-1 year)</option>
                                <option>Advanced (3+ years)</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '12px', fontWeight: 500 }}>Frequency</label>
                            <select className="input">
                                <option>4 Days / Week</option>
                                <option>3 Days / Week</option>
                                <option>5 Days / Week</option>
                                <option>6 Days / Week</option>
                            </select>
                        </div>
                    </div>
                    <div style={{ textAlign: 'right' }}>
                        <button className="btn btn-primary" onClick={handleGenerate} disabled={generating}>
                            {generating ? 'Processing...' : 'Generate New Block'}
                        </button>
                    </div>
                </div>

                {/* Results Table */}
                {plan && (
                    <div className="card">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                            <div>
                                <h3>Generated Microcycle: Weeks 1-4</h3>
                                <div style={{ fontSize: '12px', color: 'var(--c-text-sec)' }}>Based on linear periodization model.</div>
                            </div>
                            <div style={{ display: 'flex', gap: '8px' }}>
                                <button className="btn btn-outline">Edit</button>
                                <button className="btn btn-primary">Save to Calendar</button>
                            </div>
                        </div>

                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Day</th>
                                    <th>Focus</th>
                                    <th>Key Exercises</th>
                                    <th>Volume Load</th>
                                    <th>AI Notes</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td>Monday</td>
                                    <td><span className="badge badge-blue">Upper Push</span></td>
                                    <td>Bench Press, OHP, Dips</td>
                                    <td>High (12 sets)</td>
                                    <td>Focus on eccentric control (3s).</td>
                                </tr>
                                <tr>
                                    <td>Tuesday</td>
                                    <td><span className="badge badge-warning">Lower Body</span></td>
                                    <td>Squat, RDL, Leg Press</td>
                                    <td>High (15 sets)</td>
                                    <td>Keep RPE around 7-8.</td>
                                </tr>
                                <tr>
                                    <td>Wednesday</td>
                                    <td>Rest</td>
                                    <td>Active Recovery</td>
                                    <td>-</td>
                                    <td>Light walking or mobility work.</td>
                                </tr>
                                <tr>
                                    <td>Thursday</td>
                                    <td><span className="badge badge-blue">Upper Pull</span></td>
                                    <td>Pullups, Rows, Curls</td>
                                    <td>Moderate (10 sets)</td>
                                    <td>Focus on peak contraction.</td>
                                </tr>
                                <tr>
                                    <td>Friday</td>
                                    <td><span className="badge badge-blue">Full Body</span></td>
                                    <td>Deadlift, Press, Lunge</td>
                                    <td>High (14 sets)</td>
                                    <td>Complex movements prioritized.</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AIWorkout;
