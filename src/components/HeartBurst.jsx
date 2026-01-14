import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './HeartBurst.css';

const HeartBurst = ({ count = 30 }) => {
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        // Generate random particles radiating from center
        const newParticles = Array.from({ length: count }, (_, i) => {
            const angle = (i / count) * Math.PI * 2;
            const velocity = 200 + Math.random() * 300;
            const size = 15 + Math.random() * 25;

            return {
                id: i,
                angle,
                velocity,
                size,
                x: Math.cos(angle) * velocity,
                y: Math.sin(angle) * velocity,
                rotation: Math.random() * 360,
                delay: Math.random() * 0.2,
            };
        });

        setParticles(newParticles);
    }, [count]);

    return (
        <div className="heart-burst-container">
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="heart-particle"
                    initial={{
                        x: 0,
                        y: 0,
                        scale: 0,
                        rotate: 0,
                        opacity: 1
                    }}
                    animate={{
                        x: particle.x,
                        y: particle.y,
                        scale: [0, 1.5, 0],
                        rotate: particle.rotation,
                        opacity: [0, 1, 0]
                    }}
                    transition={{
                        duration: 1.5,
                        delay: particle.delay,
                        ease: "easeOut"
                    }}
                    style={{
                        fontSize: `${particle.size}px`,
                    }}
                >
                    💕
                </motion.div>
            ))}
        </div>
    );
};

export default HeartBurst;
