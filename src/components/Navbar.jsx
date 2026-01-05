
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <nav style={{
            position: 'sticky', top: 0, zIndex: 100,
            background: 'rgba(5, 5, 7, 0.8)', padding: '15px 20px',
            backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(255,255,255,0.05)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center'
        }}>
            {/* Brand */}
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', background: 'var(--primary)', borderRadius: '6px', transform: 'rotate(45deg)' }}></div>
                <span style={{ fontSize: '1.2rem', fontWeight: 800, color: 'white', letterSpacing: '-0.5px' }}>GYM.AI</span>
            </Link>

            {/* Links (Desktop visible, simple scroll on mobile) */}
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center', overflowX: 'auto', paddingLeft: '20px' }}>
                {!user ? (
                    <>
                        <Link to="/login" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.9rem' }}>Login</Link>
                        <Link to="/signup" className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.85rem' }}>Join</Link>
                    </>
                ) : (
                    <>
                        <Link to="/dashboard" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.9rem' }}>Dashboard</Link>
                        {user.role === 'admin' && <Link to="/admin" style={{ color: '#ccc', textDecoration: 'none', fontSize: '0.9rem' }}>Admin</Link>}
                        <button onClick={handleLogout} style={{ background: 'none', border: 'none', color: '#ff4444', cursor: 'pointer', fontSize: '0.9rem' }}>
                            Logout
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
