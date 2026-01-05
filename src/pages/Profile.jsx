
import React from 'react';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const { user, signOut } = useAuth();
    const { xp, level, resetJourney, settings, toggleSetting } = useGame();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await signOut();
        navigate('/login');
    };

    return (
        <div className="app-shell" style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '2.5rem', marginBottom: '8px' }}>Profile</h1>

            {/* User Stats Card */}
            <div className="card-premium" style={{ marginBottom: '24px', textAlign: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(45deg, var(--primary), var(--accent))', margin: '0 auto 16px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2rem', fontWeight: 800 }}>
                    {level}
                </div>
                <h2 style={{ marginBottom: '4px' }}>{user?.user_metadata?.display_name || 'Athlete'}</h2>
                <div style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>Level {level} • {xp} XP</div>
                <button className="btn-ghost" style={{ fontSize: '0.8rem', padding: '8px' }}>Edit Profile</button>
            </div>

            {/* Settings */}
            <div className="card-premium" style={{ marginBottom: '24px' }}>
                <h3 style={{ marginBottom: '16px' }}>Settings</h3>
                <div className="stack-gap">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Sound Effects</span>
                        <div onClick={() => toggleSetting('sound')} style={{ width: '50px', height: '28px', background: settings.sound ? 'var(--primary)' : 'rgba(255,255,255,0.1)', borderRadius: '14px', position: 'relative', cursor: 'pointer', transition: '0.3s' }}>
                            <div style={{ width: '24px', height: '24px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: settings.sound ? '24px' : '2px', transition: '0.3s' }} />
                        </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <span>Haptic Vibration</span>
                        <div onClick={() => toggleSetting('vibration')} style={{ width: '50px', height: '28px', background: settings.vibration ? 'var(--primary)' : 'rgba(255,255,255,0.1)', borderRadius: '14px', position: 'relative', cursor: 'pointer', transition: '0.3s' }}>
                            <div style={{ width: '24px', height: '24px', background: 'white', borderRadius: '50%', position: 'absolute', top: '2px', left: settings.vibration ? '24px' : '2px', transition: '0.3s' }} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Danger Zone */}
            <div className="stack-gap" style={{ marginTop: '40px' }}>
                <button onClick={resetJourney} className="btn-ghost" style={{ color: 'orange', borderColor: 'orange' }}>Reset Journey Data</button>
                <button onClick={handleLogout} className="btn-ghost" style={{ color: 'red', borderColor: 'red' }}>Logout</button>
            </div>
        </div>
    );
};

export default Profile;
