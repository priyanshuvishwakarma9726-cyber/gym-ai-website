
import React from 'react';
import AuthForm from '../components/AuthForm';

const Login = () => {
    return (
        <div style={{
            minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '2rem' }}>Welcome Back</h1>
                    <p>Enter your credentials to access your personal trainer.</p>
                </div>
                <AuthForm type="login" />
            </div>
        </div>
    );
};

export default Login;
