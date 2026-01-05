
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const AITrainingSession = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(0);
    const [formData, setFormData] = useState({
        goal: '',
        experience: '',
        time: '',
        equipment: ''
    });
    const [result, setResult] = useState(null);
    const [typedText, setTypedText] = useState('');

    // AI Intro Text
    const fullIntro = "Hey there. I'm Gym AI. Give me 60 seconds, and I will engineer the perfect workout plan for your body.";

    useEffect(() => {
        if (step === 0) {
            let i = 0;
            const timer = setInterval(() => {
                setTypedText(fullIntro.slice(0, i + 1));
                i++;
                if (i > fullIntro.length) clearInterval(timer);
            }, 35);
            return () => clearInterval(timer);
        }
    }, [step]);

    const handleSelect = (key, value) => {
        // Haptic Feedback
        if (navigator.vibrate) navigator.vibrate(15);

        setFormData(prev => ({ ...prev, [key]: value }));

        // Use a small delay for better UX flow
        setTimeout(() => setStep(prev => prev + 1), 250);
    };

    // Auto-trigger API at step 5
    useEffect(() => {
        if (step === 5) {
            const fetchData = async () => {
                try {
                    // Min wait time for "Thinking" animation (2.5s)
                    const minWait = new Promise(resolve => setTimeout(resolve, 2500));

                    const apiCall = fetch('/api/start-training', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(formData)
                    }).then(res => res.json());

                    const [_, data] = await Promise.all([minWait, apiCall]);
                    setResult(data);
                    setStep(6);
                } catch (e) {
                    console.error(e);
                    alert('Connection Error. Please restart.');
                    setStep(0);
                }
            };
            fetchData();
        }
    }, [step]);

    // UI Variants for Framer Motion
    const slideVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } },
        exit: { opacity: 0, x: -50, transition: { duration: 0.3 } }
    };

    return (
        <div style={{
            position: 'fixed',
            top: 0, left: 0, width: '100vw', height: '100%',
            background: 'radial-gradient(circle at 50% 10%, #1a1a1a, #000000)',
            color: 'white',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden'
        }}>
            {/* Background Particles (CSS only for now for perf) */}
            <div className="float-anim" style={{
                position: 'absolute', top: '-10%', right: '-10%',
                width: '300px', height: '300px',
                background: 'rgba(252, 163, 17, 0.08)',
                filter: 'blur(80px)', borderRadius: '50%',
                zIndex: -1
            }} />

            {/* Header */}
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
                <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)', letterSpacing: '1px' }}>GYM.AI</div>
                <button
                    onClick={() => navigate('/')}
                    style={{ padding: '8px 16px', background: 'rgba(255,255,255,0.1)', borderRadius: '20px', fontSize: '0.8rem', color: 'rgba(255,255,255,0.8)' }}>
                    Close
                </button>
            </div>

            {/* Main Content Area */}
            <div style={{ flex: 1, position: 'relative', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '24px' }}>
                <AnimatePresence mode="wait">

                    {/* STEP 0: INTRO */}
                    {step === 0 && (
                        <motion.div key="intro"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>

                            <motion.div
                                animate={{ scale: [1, 1.1, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                                style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'var(--primary)', boxShadow: '0 0 40px rgba(252, 163, 17, 0.4)', marginBottom: '30px' }}
                            />

                            <h1 style={{ fontSize: '2.4rem', marginBottom: '20px', lineHeight: 1.1 }}>AI TRAINER</h1>
                            <p style={{ fontSize: '1.1rem', minHeight: '80px', maxWidth: '300px' }}>
                                {typedText}<span className="blink">|</span>
                            </p>

                            <motion.button
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setStep(1)}
                                style={{
                                    marginTop: '40px',
                                    background: 'white', color: 'black',
                                    padding: '18px 40px', borderRadius: '50px',
                                    fontSize: '1.1rem', fontWeight: 700,
                                    boxShadow: '0 10px 30px rgba(255,255,255,0.1)'
                                }}>
                                Start Session
                            </motion.button>
                        </motion.div>
                    )}

                    {/* QUESTIONS */}
                    {step === 1 && <QuestionView key="q1"
                        idx="01" total="04" question="What is your main goal?"
                        options={['Lose Fat', 'Build Muscle', 'Get Stronger', 'Endurance']}
                        onSelect={(v) => handleSelect('goal', v)} variants={slideVariants} />}

                    {step === 2 && <QuestionView key="q2"
                        idx="02" total="04" question="Your experience level?"
                        options={['Beginner', 'Intermediate', 'Advanced']}
                        onSelect={(v) => handleSelect('experience', v)} variants={slideVariants} />}

                    {step === 3 && <QuestionView key="q3"
                        idx="03" total="04" question="Daily time available?"
                        options={['20 Mins', '30 Mins', '45 Mins', '60+ Mins']}
                        onSelect={(v) => handleSelect('time', v)} variants={slideVariants} />}

                    {step === 4 && <QuestionView key="q4"
                        idx="04" total="04" question="Access to equipment?"
                        options={['Full Gym', 'Home (Dumbbells)', 'Bodyweight Only']}
                        onSelect={(v) => handleSelect('equipment', v)} variants={slideVariants} />}

                    {/* STEP 5: ANALYZING */}
                    {step === 5 && (
                        <motion.div key="analyzing"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            style={{ textAlign: 'center', width: '100%' }}>

                            <h2 style={{ fontSize: '2rem', marginBottom: '10px' }}>ANALYZING...</h2>
                            <p style={{ color: '#666', marginBottom: '40px' }}>Calculating metabolic demands & workload.</p>

                            <div style={{ width: '100%', height: '4px', background: '#222', borderRadius: '2px', overflow: 'hidden' }}>
                                <motion.div
                                    initial={{ width: '0%' }}
                                    animate={{ width: '100%' }}
                                    transition={{ duration: 2.5, ease: "easeInOut" }}
                                    style={{ height: '100%', background: 'var(--primary)' }}
                                />
                            </div>

                            <motion.div
                                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                                style={{ marginTop: '30px', fontStyle: 'italic', color: '#444' }}>
                                "Consistency is key."
                            </motion.div>
                        </motion.div>
                    )}

                    {/* STEP 6: RESULT */}
                    {step === 6 && result && (
                        <motion.div key="result"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            style={{ height: '100%', overflowY: 'auto', paddingBottom: '30px' }}>

                            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                                <div style={{ fontSize: '0.8rem', color: 'var(--primary)', letterSpacing: '2px', fontWeight: 700 }}>PLAN READY</div>
                                <h1 style={{ fontSize: '2.2rem', marginTop: '10px' }}>{result.overview.strategy}</h1>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginBottom: '30px' }}>
                                <MetricCard label="Estimated Result" value={result.timeline.visibleResults} delay={0.1} />
                                <MetricCard label="Frequency" value={result.timeline.frequency} delay={0.2} />
                            </div>

                            <motion.h3 initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} style={{ marginBottom: '15px' }}>Weekly Split</motion.h3>

                            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                {Object.entries(result.schedule).sort().map(([day, details], i) => (
                                    <motion.div
                                        key={day}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 + (i * 0.1) }}
                                        className="glass-panel"
                                        style={{ padding: '16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--primary)', fontWeight: 700 }}>{day}</div>
                                            <div style={{ fontSize: '1rem', fontWeight: 600 }}>{details.focus}</div>
                                        </div>
                                        {/* Simple Chevron SVG */}
                                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                                    </motion.div>
                                ))}
                            </div>

                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 1 }}
                                style={{ marginTop: '40px', textAlign: 'center' }}>
                                <button
                                    onClick={() => navigate('/dashboard')}
                                    style={{
                                        background: 'var(--primary)', color: 'black',
                                        width: '100%', padding: '18px', borderRadius: '16px',
                                        fontSize: '1.1rem', fontWeight: 700
                                    }}>
                                    Save Plan to Dashboard
                                </button>
                            </motion.div>
                        </motion.div>
                    )}

                </AnimatePresence>
            </div>

            {/* Progress dots at bottom */}
            {step > 0 && step < 5 && (
                <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', paddingBottom: '30px' }}>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} style={{
                            width: '8px', height: '8px', borderRadius: '50%',
                            background: step >= i ? 'var(--primary)' : 'rgba(255,255,255,0.1)',
                            transition: 'all 0.3s'
                        }} />
                    ))}
                </div>
            )}
        </div>
    );
};

// Sub Components
const QuestionView = ({ idx, total, question, options, onSelect, variants }) => (
    <motion.div
        variants={variants} initial="hidden" animate="visible" exit="exit"
        style={{ width: '100%', maxWidth: '400px', margin: '0 auto' }}>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '20px' }}>
            <h2 style={{ fontSize: '2rem', lineHeight: 1.1 }}>{question}</h2>
            <span style={{ fontSize: '0.9rem', color: '#666', fontFamily: 'monospace' }}>{idx}/{total}</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {options.map((opt, i) => (
                <motion.button
                    key={opt}
                    whileTap={{ scale: 0.98, backgroundColor: 'rgba(252, 163, 17, 0.1)' }}
                    onClick={() => onSelect(opt)}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="glass-panel"
                    style={{
                        padding: '20px', fontSize: '1.1rem', fontWeight: 500,
                        textAlign: 'left', width: '100%',
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center'
                    }}>
                    {opt}
                    <div style={{ width: '20px', height: '20px', borderRadius: '50%', border: '2px solid rgba(255,255,255,0.2)' }} />
                </motion.button>
            ))}
        </div>
    </motion.div>
);

const MetricCard = ({ label, value, delay }) => (
    <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
        className="glass-panel"
        style={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', marginBottom: '5px' }}>{label}</div>
        <div style={{ fontSize: '1.3rem', fontWeight: 700 }}>{value}</div>
    </motion.div>
);

export default AITrainingSession;
