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
            const newHeart = {
                id: Date.now() + Math.random(),
                left: Math.random() * 100,
                size: Math.random() * 20 + 15,
                duration: Math.random() * 2 + 2,
                delay: Math.random() * 0.5
            };

            setHearts(prev => [...prev, newHeart]);

            // Remove heart after animation completes
            setTimeout(() => {
                setHearts(prev => prev.filter(h => h.id !== newHeart.id));
            }, (newHeart.duration + newHeart.delay) * 1000);
        }, 150);

        return () => clearInterval(interval);
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
