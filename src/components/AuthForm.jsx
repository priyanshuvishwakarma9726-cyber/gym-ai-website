
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

            // If signup is successful and email verification is disabled,
            // Supabase returns a session immediately. We can redirect.
            if (data.session) {
                navigate('/dashboard');
            } else if (type === 'signup' && !data.session) {
                // Edge case: Email verification might still be enabled in settings
                setMsg('Signup successful! Please check if you need to verify your email.');
            } else {
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <div className="card-premium">
            {error && <div style={{ color: '#ef4444', marginBottom: '16px', background: 'rgba(239, 68, 68, 0.1)', padding: '12px', borderRadius: '12px', fontSize: '0.9rem' }}>{error}</div>}
            {msg && <div style={{ color: '#4ade80', marginBottom: '16px' }}>{msg}</div>}
            <form onSubmit={handleSubmit} className="stack-gap" style={{ gap: '20px' }}>
                <div>
                    <label className="text-label">Email Address</label>
                    <input
                        className="input-field"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label className="text-label">Password</label>
                    <input
                        className="input-field"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn-hero" style={{ marginTop: '10px' }}>
                    {type === 'login' ? 'Login' : 'Create Account'}
                </button>
            </form>
        </div>
    );
};

export default AuthForm;
