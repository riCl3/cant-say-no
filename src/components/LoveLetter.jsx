import React, { useState, useEffect } from 'react';
import './LoveLetter.css';

const LoveLetter = ({ message = "You make my heart smile! 💕\n\nI promise to always cherish you,\nmake you laugh, and be your\nbest friend forever.\n\nLove always,\nYour biggest fan ❤️" }) => {
    const [stage, setStage] = useState('falling'); // falling, opening, revealed

    useEffect(() => {
        // Start opening after envelope lands
        const openTimer = setTimeout(() => {
            setStage('opening');
        }, 2000);

        // Reveal message after opening animation
        const revealTimer = setTimeout(() => {
            setStage('revealed');
        }, 3500);

        return () => {
            clearTimeout(openTimer);
            clearTimeout(revealTimer);
        };
    }, []);

    return (
        <div className="love-letter-container">
            <div className={`envelope ${stage}`}>
                <div className="envelope-flap"></div>
                <div className="envelope-body"></div>

                {stage !== 'falling' && (
                    <div className={`letter ${stage === 'revealed' ? 'visible' : ''}`}>
                        <div className="letter-content">
                            {message.split('\n').map((line, i) => (
                                <p key={i}>{line}</p>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoveLetter;
