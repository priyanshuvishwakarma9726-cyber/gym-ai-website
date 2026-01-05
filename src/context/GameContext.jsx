
import React, { createContext, useContext, useState, useEffect } from 'react';

const GameContext = createContext();

export const useGame = () => useContext(GameContext);

export const GameProvider = ({ children }) => {
    // --- STATE ---
    const [xp, setXp] = useState(() => parseInt(localStorage.getItem('gym_ai_xp')) || 0);
    const [level, setLevel] = useState(() => parseInt(localStorage.getItem('gym_ai_level')) || 1);
    const [streak, setStreak] = useState(() => parseInt(localStorage.getItem('gym_ai_streak')) || 0);
    const [water, setWater] = useState(() => parseInt(localStorage.getItem('gym_ai_water')) || 0);
    const [sleep, setSleep] = useState(() => parseInt(localStorage.getItem('gym_ai_sleep')) || 0); // hours

    // Settings
    const [settings, setSettings] = useState(() => JSON.parse(localStorage.getItem('gym_ai_settings')) || {
        sound: true,
        vibration: true,
        darkMode: true
    });

    // --- EFFECTS ---
    useEffect(() => {
        localStorage.setItem('gym_ai_xp', xp);
        localStorage.setItem('gym_ai_level', level);
        localStorage.setItem('gym_ai_streak', streak);
        localStorage.setItem('gym_ai_water', water);
        localStorage.setItem('gym_ai_sleep', sleep);
        localStorage.setItem('gym_ai_settings', JSON.stringify(settings));
    }, [xp, level, streak, water, sleep, settings]);

    // --- ACTIONS ---
    const addXp = (amount) => {
        const newXp = xp + amount;
        setXp(newXp);
        // Simple Level Up Logic: Every 100 XP
        if (newXp >= level * 100) {
            setLevel(l => l + 1);
            alert(`🎉 LEVEL UP! You are now Level ${level + 1}`);
        }
    };

    const toggleSetting = (key) => {
        setSettings(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const logWater = () => {
        setWater(w => w + 1);
        addXp(10);
        if (settings.vibration && navigator.vibrate) navigator.vibrate(50);
    };

    const logSleep = () => {
        setSleep(s => (s >= 12 ? 0 : s + 1));
        if (settings.vibration && navigator.vibrate) navigator.vibrate(50);
    };

    const completeWorkout = () => {
        setStreak(s => s + 1);
        addXp(50);
        alert("🔥 WORKOUT COMPLETE! +50 XP");
    };

    const resetJourney = () => {
        if (confirm("Are you sure? This will wipe your progress.")) {
            localStorage.clear();
            window.location.reload();
        }
    };

    return (
        <GameContext.Provider value={{
            xp, level, streak, water, sleep, settings,
            addXp, toggleSetting, logWater, logSleep, completeWorkout, resetJourney
        }}>
            {children}
        </GameContext.Provider>
    );
};
