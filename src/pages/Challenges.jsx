
import React from 'react';
import { useGame } from '../context/GameContext';
import { motion } from 'framer-motion';

const Challenges = () => {
    const { addXp } = useGame();

    const challenges = [
        { title: "7-Day Abs", reward: "100 XP", days: 7, color: "#f472b6" },
        { title: "30-Day Beast", reward: "500 XP", days: 30, color: "#ef4444" },
        { title: "Early Bird", reward: "50 XP", days: 1, color: "#fbbf24" }
    ];

    return (
        <div className="app-shell" style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Challenges</h1>
            <p style={{ marginBottom: '32px' }}>Push your limits. Earn rewards.</p>

            <div className="stack-gap">
                {challenges.map((c, i) => (
                    <motion.div
                        key={i}
                        whileTap={{ scale: 0.98 }}
                        className="card-premium"
                        style={{ borderLeft: `4px solid ${c.color}` }}
                    >
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div>
                                <h3 style={{ fontSize: '1.2rem', marginBottom: '4px' }}>{c.title}</h3>
                                <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)' }}>{c.days} Days • {c.reward}</div>
                            </div>
                            <button
                                onClick={() => { alert(`Joined ${c.title}!`); addXp(10); }}
                                className="btn-ghost"
                                style={{ width: 'auto', padding: '8px 16px', fontSize: '0.8rem' }}>
                                JOIN
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

export default Challenges;
