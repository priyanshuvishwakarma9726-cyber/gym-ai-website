
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useGame } from '../context/GameContext';

const Workout = () => {
    const navigate = useNavigate();
    const { completeWorkout, settings } = useGame();
    const [timer, setTimer] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [activeExercise, setActiveExercise] = useState(0);

    // Mock Workout (If no plan exists, we use this)
    const exercises = [
        { name: "Jumping Jacks", sets: "2 mins", type: "Warmup" },
        { name: "Push Ups", sets: "3 x 12", type: "Strength" },
        { name: "Squats", sets: "3 x 15", type: "Strength" },
        { name: "Plank", sets: "3 x 60s", type: "Core" },
        { name: "Burpees", sets: "3 x 10", type: "HIIT" }
    ];

    useEffect(() => {
        let interval = null;
        if (isActive) {
            interval = setInterval(() => {
                setTimer(seconds => seconds + 1);
            }, 1000);
        } else if (!isActive && timer !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [isActive, timer]);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handleFinish = () => {
        setIsActive(false);
        completeWorkout();
        navigate('/dashboard');
    };

    const handleNext = () => {
        if (activeExercise < exercises.length - 1) {
            setActiveExercise(prev => prev + 1);
            if (settings.vibration) navigator.vibrate(50);
        } else {
            handleFinish();
        }
    };

    return (
        <div className="app-shell" style={{ padding: '24px', paddingBottom: '100px' }}>
            {/* Header / Timer */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                <div>
                    <div className="text-label" style={{ color: 'var(--primary)' }}>LIVE SESSION</div>
                    <div style={{ fontSize: '2.5rem', fontWeight: 800, fontFamily: 'monospace' }}>
                        {formatTime(timer)}
                    </div>
                </div>
                <button
                    onClick={() => setIsActive(!isActive)}
                    style={{
                        width: '60px', height: '60px', borderRadius: '50%',
                        background: isActive ? '#ef4444' : '#4ade80',
                        border: 'none', color: 'black', fontSize: '1.5rem',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}>
                    {isActive ? '⏸' : '▶'}
                </button>
            </div>

            {/* Current Exercise */}
            <div className="card-premium" style={{ marginBottom: '24px', textAlign: 'center', padding: '40px 20px' }}>
                <motion.div
                    key={activeExercise}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <div className="text-label" style={{ marginBottom: '16px' }}>NOW PERFORMING</div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px', lineHeight: 1.1 }}>{exercises[activeExercise].name}</h1>
                    <div style={{ fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 700 }}>{exercises[activeExercise].sets}</div>
                </motion.div>
            </div>

            {/* Controls */}
            <div className="grid-2" style={{ marginBottom: '32px' }}>
                <button className="btn-ghost" onClick={() => { if (activeExercise > 0) setActiveExercise(p => p - 1) }}>
                    ← Prev
                </button>
                <button className="btn-hero" onClick={handleNext}>
                    {activeExercise === exercises.length - 1 ? 'Finish' : 'Next Exercise →'}
                </button>
            </div>

            {/* Up Next List */}
            <div style={{ opacity: 0.6 }}>
                <div className="text-label">UP NEXT</div>
                {exercises.map((ex, i) => (
                    <div key={i} style={{
                        padding: '16px', borderBottom: '1px solid var(--glass-border)',
                        color: i === activeExercise ? 'var(--primary)' : 'white',
                        fontWeight: i === activeExercise ? 700 : 400
                    }}>
                        {i + 1}. {ex.name}
                    </div>
                ))}
            </div>

        </div>
    );
};

export default Workout;
