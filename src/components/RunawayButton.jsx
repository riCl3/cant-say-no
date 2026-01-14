import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';

const RunawayButton = ({ onClick, text = "No", runAway = true, scale = 1 }) => {
  const [position, setPosition] = useState({ left: 0, top: 0 });
  const [isRunning, setIsRunning] = useState(false);
  const buttonRef = useRef(null);
  const rafRef = useRef(null);
  const lastUpdateRef = useRef(0);
  const initializedRef = useRef(false);

  // Helper to get random position
  const getRandomPosition = () => {
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const padding = 100;

    return {
      left: padding + Math.random() * (viewportWidth - 300),
      top: padding + Math.random() * (viewportHeight - 200)
    };
  };

  // Initialize button to random position immediately when runAway is true
  useEffect(() => {
    if (!runAway || initializedRef.current) return;

    const initializePosition = () => {
      setPosition(getRandomPosition());
      setIsRunning(true);
      initializedRef.current = true;
    };

    // Small delay to ensure button is rendered
    const timer = setTimeout(initializePosition, 50);
    return () => clearTimeout(timer);
  }, [runAway]);

  useEffect(() => {
    if (!runAway) return;

    const handleMouseMove = (e) => {
      // Throttle using requestAnimationFrame (max 60fps)
      if (rafRef.current) return;

      rafRef.current = requestAnimationFrame(() => {
        rafRef.current = null;

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

        // CRITICAL ZONE: Teleport if too close (< 80px)
        if (distance < 80) {
          setPosition(getRandomPosition());
          return;
        }

        // DANGER ZONE: Run away logic (< 350px)
        const dangerZone = 350;
        if (distance >= dangerZone) return;

        // Fast movement
        const moveDistance = 500;

        // Jitter for unpredictability
        const jitter = (Math.random() - 0.5) * 2.5;
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
        const padding = 60;
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const btnWidth = btnRect.width;
        const btnHeight = btnRect.height;

        // Keep button on screen
        newLeft = Math.max(padding, Math.min(newLeft, viewportWidth - btnWidth - padding));
        newTop = Math.max(padding, Math.min(newTop, viewportHeight - btnHeight - padding));

        setPosition({ left: newLeft, top: newTop });
        if (!isRunning) setIsRunning(true);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [runAway, isRunning]);

  // Failsafe: If mouse enters, teleport immediately
  const handleMouseEnter = () => {
    if (runAway) {
      setPosition(getRandomPosition());
    }
  };

  return (
    <motion.button
      ref={buttonRef}
      className={`btn runaway-btn ${isRunning ? 'running' : ''}`}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
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
        stiffness: 600,
        damping: 12,
        mass: 0.3,
        velocity: 5
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
