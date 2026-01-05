
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const Navbar = () => {
    const { user, signOut } = useAuth();

    return (
        <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '2rem 4rem', alignItems: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: 'var(--primary)', letterSpacing: '1px' }}>GYM.AI</h2>
            </Link>
            <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                <Link to="/" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>Home</Link>
                <Link to="/planner" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>AI Planner</Link>
                <Link to="/pricing" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>Pricing</Link>
                <Link to="/contact" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>Contact</Link>
                {user ? (
                    <>
                        {user.role === 'admin' && <Link to="/admin" style={{ color: 'var(--primary)', textDecoration: 'none', fontWeight: '800' }}>ADMIN</Link>}
                        <Link to="/dashboard" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>Dashboard</Link>
                        <button onClick={signOut} style={{ background: 'transparent', border: '1px solid var(--primary)', color: 'var(--primary)', padding: '8px 16px', borderRadius: '4px', cursor: 'pointer' }}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login" style={{ color: 'white', textDecoration: 'none', fontWeight: '600' }}>Login</Link>
                        <Link to="/signup" className="btn-primary" style={{ textDecoration: 'none', padding: '10px 20px', fontSize: '0.9rem' }}>Sign Up</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
