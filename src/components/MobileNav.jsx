
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';

const MobileNav = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const tabs = [
        { id: 'home', icon: '🏠', label: 'Home', path: '/dashboard' },
        { id: 'challenges', icon: '⚔️', label: 'Quest', path: '/challenges' },
        { id: 'start', icon: '⚡️', label: 'Train', path: '/start', primary: true },
        { id: 'workout', icon: '🏋️', label: 'Gym', path: '/workout' },
        { id: 'profile', icon: '👤', label: 'Profile', path: '/profile' },
    ];

    return (
        <div style={{
            position: 'fixed', bottom: 0, left: 0, width: '100%',
            background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--glass-border)',
            paddingBottom: 'env(safe-area-inset-bottom)',
            display: 'flex', justifyContent: 'space-around', alignItems: 'center',
            zIndex: 1000, height: '80px'
        }}>
            {tabs.map((tab) => {
                const isActive = location.pathname === tab.path;

                if (tab.primary) {
                    return (
                        <motion.button
                            key={tab.id}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => navigate(tab.path)}
                            style={{
                                width: '60px', height: '60px', borderRadius: '50%',
                                background: 'var(--primary)', border: 'none',
                                display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                boxShadow: '0 8px 20px var(--primary-glow)',
                                marginBottom: '20px', fontSize: '1.5rem', color: 'white'
                            }}
                        >
                            {tab.icon}
                        </motion.button>
                    );
                }

                return (
                    <button
                        key={tab.id}
                        onClick={() => navigate(tab.path)}
                        style={{
                            background: 'none', border: 'none',
                            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px',
                            color: isActive ? 'white' : 'var(--text-dim)',
                            padding: '10px'
                        }}
                    >
                        <span style={{ fontSize: '1.4rem' }}>{tab.icon}</span>
                        <span style={{ fontSize: '0.7rem', fontWeight: 500 }}>{tab.label}</span>
                    </button>
                );
            })}
        </div>
    );
};

export default MobileNav;
