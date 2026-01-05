
import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => {
    return (
        <div className="app-shell" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '24px'
        }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Welcome Back</h1>
                    <p style={{ color: 'var(--text-secondary)' }}>Enter your credentials to access your personal trainer.</p>
                </div>
                <AuthForm type="login" />
            </div>
        </div>
    );
};

export default Login;
