
import React from 'react';
import AuthForm from '../components/AuthForm';

const Signup = () => {
    return (
        <div className="app-shell" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px'
        }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Join Gym AI</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Start your transformation journey today. 100% Free.</p>
                </div>
                <AuthForm type="signup" />
            </div>
        </div>
    );
};

export default Signup;
