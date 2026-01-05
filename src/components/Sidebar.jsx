
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { signOut } = useAuth();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <aside style={{
            width: 'var(--sidebar-width)',
            height: '100vh',
            background: 'var(--bg-sidebar)',
            color: 'var(--text-sidebar)',
            display: 'flex',
            flexDirection: 'column',
            position: 'fixed',
            left: 0, top: 0,
            borderRight: '1px solid #334155'
        }}>
            {/* Brand */}
            <div style={{ height: '64px', display: 'flex', alignItems: 'center', padding: '0 24px', borderBottom: '1px solid #334155' }}>
                <div style={{ width: '24px', height: '24px', background: 'var(--primary)', borderRadius: '4px', marginRight: '12px' }}></div>
                <span style={{ fontSize: '1.2rem', fontWeight: 700, color: 'white', letterSpacing: '0.5px' }}>GYM.AI</span>
            </div>

            {/* Menu */}
            <nav style={{ flex: 1, padding: '24px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                <MenuItem to="/dashboard" icon="📊" label="Dashboard" />
                <MenuItem to="/start" icon="⚡️" label="Start Training" />
                <MenuItem to="/planner" icon="📝" label="Diet Planner" />
                <MenuItem to="/workout" icon="🏋️" label="Live Session" />
                <MenuItem to="/challenges" icon="🏆" label="Challenges" />
                <MenuItem to="/profile" icon="👤" label="Members / Profile" />

                <div style={{ marginTop: '24px', paddingLeft: '12px', fontSize: '0.75rem', textTransform: 'uppercase', color: '#64748b', fontWeight: 600, letterSpacing: '1px' }}>System</div>
                <MenuItem to="/reports" icon="📈" label="Reports" />
                <MenuItem to="/admin" icon="⚙️" label="Settings" />
            </nav>

            {/* Footer / User */}
            <div style={{ padding: '24px', borderTop: '1px solid #334155' }}>
                <button
                    onClick={handleLogout}
                    style={{
                        width: '100%', display: 'flex', alignItems: 'center', gap: '10px',
                        background: 'rgba(255,255,255,0.05)', border: 'none', color: '#cbd5e1',
                        padding: '12px', borderRadius: '6px', cursor: 'pointer', transition: '0.2s'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
                    onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                >
                    <span>🚪</span> Logout
                </button>
            </div>
        </aside>
    );
};

const MenuItem = ({ to, icon, label }) => (
    <NavLink
        to={to}
        style={({ isActive }) => ({
            display: 'flex', alignItems: 'center', gap: '12px',
            padding: '12px 16px', borderRadius: '6px',
            textDecoration: 'none',
            color: isActive ? 'white' : 'var(--text-sidebar)',
            background: isActive ? 'var(--primary)' : 'transparent',
            fontSize: '0.95rem', fontWeight: 500,
            transition: 'all 0.2s'
        })}
    >
        <span>{icon}</span> {label}
    </NavLink>
);

export default Sidebar;
