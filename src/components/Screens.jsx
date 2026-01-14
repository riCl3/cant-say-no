import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RunawayButton from './RunawayButton';
import Confetti from 'react-confetti';
import HeartBurst from './HeartBurst';
import HeartRain from './HeartRain';
import LoveNotes from './LoveNotes';
import TearDrops from './TearDrops';
import Fireworks from './Fireworks';
import LoveLetter from './LoveLetter';

const containerVariants = {
    hidden: {
        opacity: 0,
        scale: 0.85,
        y: 30
    },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            type: 'spring',
            stiffness: 100,
            damping: 15,
            mass: 0.8,
            duration: 0.6
        }
    },
    exit: {
        opacity: 0,
        scale: 0.9,
        y: -20,
        transition: {
            duration: 0.35,
            ease: [0.4, 0, 0.2, 1]
        }
    }
};

export const InputScreen = React.memo(({ onSetUserName, gif }) => {
    const [inputValue, setInputValue] = useState("");
    const [displayedText, setDisplayedText] = useState("");
    const fullText = "Will you put your name please?";

    useEffect(() => {
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < fullText.length) {
                setDisplayedText(fullText.substring(0, index + 1));
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, 80);

        return () => clearInterval(typeInterval);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (inputValue.trim()) {
            onSetUserName(inputValue.trim());
        }
    };

    return (
        <motion.div
            className="container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="gif-container">
                <img src={gif} alt="Cute Bear" />
            </div>
            <h1 className="typewriter">
                {displayedText}
                {displayedText.length < fullText.length && <span className="cursor-blink">||</span>}
            </h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your lovely name..."
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    autoFocus
                />
                <div className="btn-wrapper">
                    <img
                        className="btn-character character-submit"
                        src="https://media.tenor.com/O6Sj9-3V_5wAAAAC/peach-cat-peach.gif"
                        alt="Cute waving cat"
                    />
                    <button type="submit" className="btn">Submit</button>
                </div>
            </form>
            <div className="signature">Made with ❤️ by Soumya</div>
        </motion.div>
    );
});

export const QuestionScreen = React.memo(({ userName, onAccept, onReject, gif }) => {
    const [showHeartRain, setShowHeartRain] = useState(false);
    const [showLoveNotes, setShowLoveNotes] = useState(false);

    return (
        <motion.div
            className="container"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <HeartRain active={showHeartRain} />
            <LoveNotes active={showLoveNotes} />
            <div className="gif-container">
                <img src={gif} alt="Cute GIF" />
            </div>
            <h1>Hey {userName}, I really like you.</h1>
            <p>
                <span className="fall-char" style={{ animationDelay: '0s' }}>D</span>
                <span className="fall-char" style={{ animationDelay: '0.1s' }}>o</span>
                {' '}
                <span className="fall-char" style={{ animationDelay: '0.2s' }}>y</span>
                <span className="fall-char" style={{ animationDelay: '0.3s' }}>o</span>
                <span className="fall-char" style={{ animationDelay: '0.4s' }}>u</span>
                {' '}
                <span className="fall-char" style={{ animationDelay: '0.5s' }}>l</span>
                <span className="fall-char" style={{ animationDelay: '0.6s' }}>i</span>
                <span className="fall-char" style={{ animationDelay: '0.7s' }}>k</span>
                <span className="fall-char" style={{ animationDelay: '0.8s' }}>e</span>
                {' '}
                <span className="fall-char" style={{ animationDelay: '0.9s' }}>m</span>
                <span className="fall-char" style={{ animationDelay: '1.0s' }}>e</span>
                <span className="fall-char fall-question" style={{ animationDelay: '1.1s' }}>?</span>
            </p>
            <div className="btn-group">
                <div className="btn-wrapper">
                    <img
                        className="btn-character character-yes"
                        src="https://media.tenor.com/N2oCsO3tT10AAAAC/peach-goma-cute.gif"
                        alt="Cute pointing bear"
                    />
                    <button
                        className="btn"
                        onClick={onAccept}
                        onMouseEnter={() => {
                            setShowHeartRain(true);
                            setShowLoveNotes(true);
                        }}
                        onMouseLeave={() => {
                            setShowHeartRain(false);
                            setShowLoveNotes(false);
                        }}
                    >
                        Yes
                    </button>
                </div>
                <div className="btn-wrapper">
                    <img
                        className="btn-character character-no"
                        src="https://media.tenor.com/Qv3yg0mW_oUAAAAd/peach-cat-cute-cat.gif"
                        alt="Cute blocking cat"
                    />
                    <RunawayButton text="No" onClick={onReject} runAway={false} />
                </div>
            </div>
        </motion.div>
    );
});

export const PersuasionScreen = React.memo(({ onAccept, onReject, message, gif, noCount = 0 }) => {
    // Dynamic button sizing based on rejection count
    const yesScale = 1 + (noCount * 0.15); // Grows up to 2.5x
    const noScale = Math.max(0.5, 1 - (noCount * 0.08)); // Shrinks to 0.5x

    // Progressive visual effects
    const showTears = noCount >= 4; // Show tears from 5th rejection
    const tiltAngle = noCount >= 2 ? 5 : 0; // Tilt from 3rd rejection
    const grayscale = noCount >= 6 ? 0.5 : 0; // Grayscale from 7th rejection
    const vibrate = noCount >= 8; // Vibrate from 9th rejection
    const zoomGif = noCount >= 9 ? 1.2 : 1; // Zoom GIF on final rejection

    return (
        <motion.div
            className={`container shake ${vibrate ? 'vibrate' : ''}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            style={{
                transform: `rotate(${tiltAngle}deg)`,
                filter: `grayscale(${grayscale})`
            }}
        >
            {showTears && <TearDrops active={true} />}
            <div className="gif-container">
                <img
                    src={gif}
                    alt="Sad GIF"
                    style={{ transform: `scale(${zoomGif})` }}
                />
            </div>
            <h1>{message}</h1>
            <div className="btn-group">
                <div className="btn-wrapper">
                    <img
                        className="btn-character character-yes"
                        src="https://media.tenor.com/N2oCsO3tT10AAAAC/peach-goma-cute.gif"
                        alt="Cute pointing bear"
                    />
                    <button
                        className="btn"
                        onClick={onAccept}
                        style={{ transform: `scale(${yesScale})` }}
                    >
                        Yes
                    </button>
                </div>
                <div className="btn-wrapper">
                    <img
                        className="btn-character character-no"
                        src="https://media.tenor.com/Qv3yg0mW_oUAAAAd/peach-cat-cute-cat.gif"
                        alt="Cute blocking cat"
                    />
                    <RunawayButton
                        text="No"
                        onClick={onReject}
                        runAway={false}
                        scale={noScale}
                    />
                </div>
            </div>
        </motion.div>
    );
});

export const FinalScreen = React.memo(({ onAccept, gif }) => {
    return (
        <motion.div
            className="container final-screen"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <div className="spotlight"></div>
            <div className="pulsing-heart">💖</div>
            <div className="gif-container">
                <img src={gif} alt="Cute Cat" />
            </div>
            <h1>For the last time, do you like me?</h1>
            <div className="btn-group">
                <div className="btn-wrapper">
                    <img
                        className="btn-character character-yes"
                        src="https://media.tenor.com/N2oCsO3tT10AAAAC/peach-goma-cute.gif"
                        alt="Cute pointing bear"
                    />
                    <button className="btn" onClick={onAccept}>Yes</button>
                </div>
                <div className="btn-wrapper">
                    <img
                        className="btn-character character-no"
                        src="https://media.tenor.com/Qv3yg0mW_oUAAAAd/peach-cat-cute-cat.gif"
                        alt="Cute blocking cat"
                    />
                    <RunawayButton text="No" onClick={() => { }} runAway={true} />
                </div>
            </div>
        </motion.div>
    );
});

export const SuccessScreen = React.memo(({ gif }) => {
    return (
        <motion.div
            className="container success-message"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            <Confetti recycle={true} numberOfPieces={300} />
            <HeartBurst count={40} />
            <Fireworks />
            <LoveLetter />
            <div className="gif-container">
                <img src={gif} alt="Celebration GIF" />
            </div>
            <h1 style={{ fontSize: '3.5rem' }}>I knew you loved me! ❤️</h1>
            <p style={{ fontSize: '2rem' }}>🎉 Yay! 🎉</p>
            <p style={{ fontSize: '1.3rem', marginTop: '1rem', opacity: 0.9 }}>✨ Let's make beautiful memories together! ✨</p>
        </motion.div>
    );
});
