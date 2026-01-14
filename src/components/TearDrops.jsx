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
            setTears(prev => {
                // Limit max tears to 15 for performance
                if (prev.length >= 15) return prev;

                const newTear = {
                    id: Date.now() + Math.random(),
                    left: Math.random() * 20 + 40, // Center area
                    duration: Math.random() * 1.5 + 1,
                    delay: Math.random() * 0.5
                };

                return [...prev, newTear];
            });
        }, 500); // Reduced frequency from 300ms to 500ms

        // Cleanup old tears
        const cleanupInterval = setInterval(() => {
            const now = Date.now();
            setTears(prev => prev.filter(t => (now - t.id) < 4000));
        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(cleanupInterval);
        };
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
