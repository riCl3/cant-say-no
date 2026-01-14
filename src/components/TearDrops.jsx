import React, { useEffect, useState } from 'react';
import './TearDrops.css';

const TearDrops = ({ active = true }) => {
    const [tears, setTears] = useState([]);

    useEffect(() => {
        if (!active) {
            setTears([]);
            return;
        }

        const interval = setInterval(() => {
            const newTear = {
                id: Date.now() + Math.random(),
                left: Math.random() * 20 + 40, // Center area
                duration: Math.random() * 1.5 + 1,
                delay: Math.random() * 0.5
            };

            setTears(prev => [...prev, newTear]);

            setTimeout(() => {
                setTears(prev => prev.filter(t => t.id !== newTear.id));
            }, (newTear.duration + newTear.delay) * 1000);
        }, 300);

        return () => clearInterval(interval);
    }, [active]);

    if (!active) return null;

    return (
        <div className="teardrops-container">
            {tears.map(tear => (
                <div
                    key={tear.id}
                    className="teardrop"
                    style={{
                        left: `${tear.left}%`,
                        animationDuration: `${tear.duration}s`,
                        animationDelay: `${tear.delay}s`
                    }}
                >
                    💧
                </div>
            ))}
        </div>
    );
};

export default TearDrops;
