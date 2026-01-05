
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const AuthForm = ({ type }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [msg, setMsg] = useState('');
    const { signIn, signUp } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setMsg('');

        try {
            const { error, data } = type === 'login'
                ? await signIn(email, password)
                : await signUp(email, password);

            if (error) throw error;

            if (type === 'signup') {
                setMsg('Signup successful! Check your email for verification.');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="glass-panel" style={{ padding: '2rem', maxWidth: '400px', margin: '4rem auto', color: 'white' }}>
            <h2 style={{ marginBottom: '1.5rem', textAlign: 'center' }}>{type === 'login' ? 'Login' : 'Sign Up'}</h2>
            {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
            {msg && <div style={{ color: 'green', marginBottom: '1rem' }}>{msg}</div>}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    style={{ padding: '0.8rem', borderRadius: '4px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ padding: '0.8rem', borderRadius: '4px', border: 'none', background: 'rgba(255,255,255,0.1)', color: 'white' }}
                />
                <button type="submit" className="btn-primary" style={{ cursor: 'pointer', marginTop: '1rem' }}>
                    {type === 'login' ? 'Login' : 'Sign Up'}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
