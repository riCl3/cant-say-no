import React, { useEffect, useState } from 'react';
import './LoveNotes.css';

const MESSAGES = [
    "Please? 🥺",
    "💕",
    "You + Me",
    "Say Yes!",
    "🌟",
    "Forever?",
    "😊",
    "💖",
    "Think about it!",
    "✨"
];

const LoveNotes = ({ active = true }) => {
    const [notes, setNotes] = useState([]);

    useEffect(() => {
        if (!active) {
            setNotes([]);
            return;
        }

        const interval = setInterval(() => {
            const newNote = {
                id: Date.now() + Math.random(),
                message: MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
                left: Math.random() * 80 + 10,
                duration: Math.random() * 2 + 3,
                delay: Math.random() * 0.3
            };

            setNotes(prev => [...prev, newNote]);

            setTimeout(() => {
                setNotes(prev => prev.filter(n => n.id !== newNote.id));
            }, (newNote.duration + newNote.delay) * 1000);
        }, 800);

        return () => clearInterval(interval);
    }, [active]);

    if (!active) return null;

    return (
        <div className="love-notes-container">
            {notes.map(note => (
                <div
                    key={note.id}
                    className="love-note"
                    style={{
                        left: `${note.left}%`,
                        animationDuration: `${note.duration}s`,
                        animationDelay: `${note.delay}s`
                    }}
                >
                    {note.message}
                </div>
            ))}
        </div>
    );
};

export default LoveNotes;
