
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const Pricing = () => {
    const [billing, setBilling] = useState('monthly'); // 'monthly' | 'yearly'

    const handleSubscribe = () => {
        alert("This is a demo. No payment will be charged.");
    };

    return (
        <div className="app-shell" style={{ padding: '24px', textAlign: 'center' }}>
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>

                <h1 style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Pro Access</h1>
                <p style={{ maxWidth: '300px', margin: '0 auto 32px auto' }}>Unlock advanced AI coaching, limitless plans, and priority support.</p>

                {/* Toggle */}
                <div style={{ background: 'var(--surface-1)', padding: '4px', borderRadius: '50px', display: 'inline-flex', marginBottom: '40px', border: '1px solid var(--glass-border)' }}>
                    <button
                        onClick={() => setBilling('monthly')}
                        style={{ padding: '10px 24px', borderRadius: '50px', background: billing === 'monthly' ? 'var(--surface-2)' : 'transparent', color: billing === 'monthly' ? 'white' : 'var(--text-secondary)', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>
                        Monthly
                    </button>
                    <button
                        onClick={() => setBilling('yearly')}
                        style={{ padding: '10px 24px', borderRadius: '50px', background: billing === 'yearly' ? 'var(--surface-2)' : 'transparent', color: billing === 'yearly' ? 'white' : 'var(--text-secondary)', fontWeight: 600, border: 'none', cursor: 'pointer', transition: 'all 0.3s' }}>
                        Yearly <span style={{ fontSize: '0.7rem', color: '#4ade80', marginLeft: '4px' }}>-20%</span>
                    </button>
                </div>

                {/* Card */}
                <div className="card-premium" style={{ border: '1px solid var(--primary)', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '4px', background: 'linear-gradient(90deg, var(--primary), var(--accent))' }}></div>

                    <h2 style={{ fontSize: '1.5rem', marginBottom: '8px' }}>Unlimited AI</h2>
                    <div style={{ fontSize: '3.5rem', fontWeight: 800, marginBottom: '8px', letterSpacing: '-2px' }}>
                        {billing === 'monthly' ? '₹499' : '₹4999'}
                    </div>
                    <p style={{ fontSize: '0.9rem', marginBottom: '32px' }}>{billing === 'monthly' ? 'per month' : 'per year'}</p>

                    <div style={{ textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                        <FeatureItem text="Unlimited AI Workout Plans" />
                        <FeatureItem text="Advanced Diet Macros" />
                        <FeatureItem text="Priority Progress Analytics" />
                        <FeatureItem text="24/7 AI Chat Access" />
                    </div>

                    <button className="btn-hero" onClick={handleSubscribe}>
                        Start 7-Day Free Trial
                    </button>
                    <p style={{ fontSize: '0.75rem', marginTop: '16px', opacity: 0.6 }}>No commitment. Cancel anytime.</p>
                </div>

            </motion.div>
        </div>
    );
};

const FeatureItem = ({ text }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{ width: '20px', height: '20px', background: 'rgba(74, 222, 128, 0.2)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#4ade80', fontSize: '12px' }}>✓</div>
        <span style={{ fontSize: '0.95rem' }}>{text}</span>
    </div>
);

export default Pricing;
