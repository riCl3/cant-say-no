import React, { useEffect, useState } from 'react';
import './HeartRain.css';

const HeartRain = ({ active = true }) => {
    const [hearts, setHearts] = useState([]);

    useEffect(() => {
        if (!active) {
            setHearts([]);
            return;
        }

        const interval = setInterval(() => {
            setHearts(prev => {
                // Limit max hearts to 20 for performance
                if (prev.length >= 20) return prev;

                const newHeart = {
                    id: Date.now() + Math.random(),
                    left: Math.random() * 100,
                    size: Math.random() * 20 + 15,
                    duration: Math.random() * 2 + 2,
                    delay: Math.random() * 0.5
                };

                return [...prev, newHeart];
            });
        }, 300); // Reduced frequency from 150ms to 300ms

        // Cleanup old hearts
        const cleanupInterval = setInterval(() => {
            const now = Date.now();
            setHearts(prev => prev.filter(h => (now - h.id) < 5000));
        }, 1000);

        return () => {
            clearInterval(interval);
            clearInterval(cleanupInterval);
        };
    }, [active]);

    if (!active) return null;

    return (
        <div className="heart-rain-container">
            {hearts.map(heart => (
                <div
                    key={heart.id}
                    className="falling-heart"
                    style={{
                        left: `${heart.left}%`,
                        fontSize: `${heart.size}px`,
                        animationDuration: `${heart.duration}s`,
                        animationDelay: `${heart.delay}s`
                    }}
                >
                    ❤️
                </div>
            ))}
        </div>
    );
};

export default HeartRain;
