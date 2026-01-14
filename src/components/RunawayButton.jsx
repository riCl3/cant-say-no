import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const RunawayButton = ({ onClick, text = "No", runAway = true, scale = 1 }) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    if (!runAway) return;

    const handleMouseMove = (e) => {
      if (!buttonRef.current) return;

      const btnRect = buttonRef.current.getBoundingClientRect();
      const btnCenterX = btnRect.left + btnRect.width / 2;
      const btnCenterY = btnRect.top + btnRect.height / 2;

      const cursorX = e.clientX;
      const cursorY = e.clientY;

      // Calculate distance from cursor to button
      const deltaX = btnCenterX - cursorX;
      const deltaY = btnCenterY - cursorY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      // Run away if cursor gets within 150px
      const dangerZone = 150;

      if (distance < dangerZone) {
        // Normalize direction
        const moveDistance = 350;

        // Add randomness to make it unpredictable
        const jitter = (Math.random() - 0.5) * 1.2;
        const cos = Math.cos(jitter);
        const sin = Math.sin(jitter);
        const rotX = deltaX * cos - deltaY * sin;
        const rotY = deltaX * sin + deltaY * cos;

        const normalizedDist = distance || 1;
        const newDeltaX = (rotX / normalizedDist) * moveDistance;
        const newDeltaY = (rotY / normalizedDist) * moveDistance;

        // Calculate new position
        let newLeft = btnRect.left + newDeltaX;
        let newTop = btnRect.top + newDeltaY;

        // Screen bounds with padding
        const padding = 50;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnWidth = btnRect.width;
        const btnHeight = btnRect.height;

        // Keep button on screen
        newLeft = Math.max(padding, Math.min(newLeft, viewportWidth - btnWidth - padding));
        newTop = Math.max(padding, Math.min(newTop, viewportHeight - btnHeight - padding));

        setPosition({ left: newLeft, top: newTop });
        if (!isRunning) setIsRunning(true);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [runAway, isRunning]);

  return (
    <motion.button
      ref={buttonRef}
      className={`btn runaway-btn ${isRunning ? 'running' : ''}`}
      onClick={onClick}
      style={{
        position: isRunning ? 'fixed' : 'relative',
        zIndex: 1000,
        transform: `scale(${scale})`,
      }}
      animate={isRunning ? {
        left: position.left,
        top: position.top
      } : {}}
      transition={{
        type: "spring",
        stiffness: 800,
        damping: 20,
        mass: 0.3
      }}
    >
      <img
        className="btn-character character-no"
        src="https://media.tenor.com/P59p65U4GZQAAAAi/peach-goma-angry.gif"
        alt="Angry fighting bear"
      />
      {text}
    </motion.button>
  );
};

export default RunawayButton;
