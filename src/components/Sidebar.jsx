
import React from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
    const { signOut } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    return (
        <aside style={{
            width: 'var(--sidebar-w)',
            background: 'var(--c-sidebar)',
            display: 'flex', flexDirection: 'column',
            borderRight: '1px solid var(--c-sidebar)',
            color: '#94a3b8'
        }}>
            {/* Brand */}
            <div style={{ height: '60px', display: 'flex', alignItems: 'center', padding: '0 20px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                <div style={{ width: '20px', height: '20px', background: 'var(--c-accent)', borderRadius: '4px', marginRight: '10px' }} />
                <span style={{ fontSize: '16px', fontWeight: 700, color: 'white', letterSpacing: '0.5px' }}>GYM.OS</span>
            </div>

            {/* Nav */}
            <div style={{ flex: 1, padding: '20px 0', overflowY: 'auto' }}>
                <SectionLabel>Core Modules</SectionLabel>
                <NavItem to="/dashboard" icon="●" label="Overview" active={location.pathname === '/dashboard'} />
                <NavItem to="/ai-workout" icon="●" label="AI Workout" active={location.pathname === '/ai-workout'} />
                <NavItem to="/ai-diet" icon="●" label="AI Diet" active={location.pathname === '/ai-diet'} />

                <SectionLabel>Analytics</SectionLabel>
                <NavItem to="/progress" icon="●" label="Progress" active={location.pathname === '/progress'} />
                <NavItem to="/insights" icon="●" label="AI Insights" active={location.pathname === '/insights'} />

                <SectionLabel>System</SectionLabel>
                <NavItem to="/profile" icon="●" label="Profile" active={location.pathname === '/profile'} />
                <NavItem to="/settings" icon="●" label="Settings" active={location.pathname === '/settings'} />
            </div>

            {/* Footer */}
            <div style={{ padding: '20px', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                <button
                    onClick={() => { signOut(); navigate('/login'); }}
                    style={{
                        width: '100%', background: 'rgba(255,255,255,0.05)', border: 'none',
                        color: 'white', padding: '10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px'
                    }}>
                    Sign Out
                </button>
            </div>
        </aside>
    );
};

const SectionLabel = ({ children }) => (
    <div style={{ padding: '0 20px', margin: '16px 0 8px 0', fontSize: '11px', textTransform: 'uppercase', color: '#475569', fontWeight: 700, letterSpacing: '1px' }}>
        {children}
    </div>
);

const NavItem = ({ to, icon, label, active }) => (
    <NavLink to={to} style={{ textDecoration: 'none' }}>
        <div style={{
            padding: '10px 20px',
            display: 'flex', alignItems: 'center', gap: '12px',
            color: active ? 'white' : '#94a3b8',
            background: active ? 'rgba(255,255,255,0.08)' : 'transparent',
            borderLeft: active ? '3px solid var(--c-accent)' : '3px solid transparent',
            fontSize: '13px', fontWeight: 500,
            transition: 'all 0.2s'
        }}>
            <span style={{ fontSize: '10px', color: active ? 'var(--c-accent)' : '#475569' }}>{icon}</span>
            {label}
        </div>
    </NavLink>
);

export default Sidebar;
