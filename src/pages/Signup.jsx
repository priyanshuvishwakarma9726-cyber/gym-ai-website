
import React from 'react';
import AuthForm from '../components/AuthForm';

const Signup = () => {
    return (
        <div style={{
            minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{ width: '100%', maxWidth: '400px' }}>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 style={{ fontSize: '2rem' }}>Join Gym AI</h1>
                    <p>Start your transformation journey today. 100% Free.</p>
                </div>
                <AuthForm type="signup" />
            </div>
        </div>
    );
};

export default Signup;
