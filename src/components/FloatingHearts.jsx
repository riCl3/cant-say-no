import React from 'react';
import './FloatingHearts.css';

const FloatingHearts = React.memo(({ count = 15 }) => {
    const hearts = React.useMemo(() => Array.from({ length: count }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 8,
        duration: 8 + Math.random() * 6,
        size: 10 + Math.random() * 20,
        opacity: 0.3 + Math.random() * 0.4,
    })), [count]);

    return (
        <div className="floating-hearts-container">
            {hearts.map((heart) => (
                <div
                    key={heart.id}
                    className="floating-heart"
                    style={{
                        left: `${heart.left}%`,
                        animationDelay: `${heart.delay}s`,
                        animationDuration: `${heart.duration}s`,
                        fontSize: `${heart.size}px`,
                        opacity: heart.opacity,
                    }}
                >
                    ❤️
                </div>
            ))}
        </div>
    );
});

export default FloatingHearts;
