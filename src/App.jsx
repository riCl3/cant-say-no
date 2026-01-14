import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import {
  InputScreen,
  QuestionScreen,
  PersuasionScreen,
  FinalScreen,
  SuccessScreen
} from './components/Screens';
import FloatingHearts from './components/FloatingHearts';
import './App.css';

// Messages for each "No" click - Now with 10 creative/funny steps!
const PERSUASION_STEPS = [
  {
    text: "Wait! Won't you reconsider? 🥺",
    gif: "https://media1.tenor.com/m/AQxYsX3Th2IAAAAd/peach-goma-sad.gif"
  },
  {
    text: "But... but... I made cookies! 🍪",
    gif: "https://media1.tenor.com/m/HrnzpVl5WMUAAAAC/peach-goma.gif"
  },
  {
    text: "I'll let you pick the movie EVERY time! 🎬",
    gif: "https://media1.tenor.com/m/AQxYsX3Th2IAAAAd/peach-goma-sad.gif"
  },
  {
    text: "Think of all the cute dates we could have! 💕",
    gif: "https://media1.tenor.com/m/J3ZgK7SZ0ScAAAAd/peach-goma-love.gif"
  },
  {
    text: "I promise I won't hog the blanket! 🛏️",
    gif: "https://media1.tenor.com/m/HrnzpVl5WMUAAAAC/peach-goma.gif"
  },
  {
    text: "What if I do a little dance? 💃",
    gif: "https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
  },
  {
    text: "I'll even share my snacks! 🍿",
    gif: "https://media1.tenor.com/m/AQxYsX3Th2IAAAAd/peach-goma-sad.gif"
  },
  {
    text: "My heart is literally breaking... 💔",
    gif: "https://media1.tenor.com/m/HrnzpVl5WMUAAAAC/peach-goma.gif"
  },
  {
    text: "The Peach & Goma are crying now... 😭",
    gif: "https://media1.tenor.com/m/AQxYsX3Th2IAAAAd/peach-goma-sad.gif"
  },
  {
    text: "Please... just one chance? 🥹",
    gif: "https://media1.tenor.com/m/J3ZgK7SZ0ScAAAAd/peach-goma-love.gif"
  }
];

function App() {
  const [step, setStep] = useState('input'); // input, question, persuasion, final, success
  const [userName, setUserName] = useState('');
  const [noCount, setNoCount] = useState(0);

  const handleSetUserName = (name) => {
    setUserName(name);
    setStep('question');
  };

  const handleAccept = () => {
    setStep('success');
  };

  const handleReject = () => {
    if (step === 'question') {
      setStep('persuasion');
      setNoCount(0);
    } else if (step === 'persuasion') {
      if (noCount < PERSUASION_STEPS.length - 1) {
        setNoCount(prev => prev + 1);
      } else {
        setStep('final');
      }
    }
  };

  return (
    <div className="app-container">
      <FloatingHearts count={15} />
      <AnimatePresence mode="wait">
        {step === 'input' && (
          <InputScreen
            key="input"
            onSetUserName={handleSetUserName}
            gif="https://media.tenor.com/gUiu1zyxfzYAAAAi/bear-kiss-bear-kisses.gif"
          />
        )}

        {step === 'question' && (
          <QuestionScreen
            key="question"
            userName={userName}
            onAccept={handleAccept}
            onReject={handleReject}
            gif="https://media1.tenor.com/m/J3ZgK7SZ0ScAAAAd/peach-goma-love.gif"
          />
        )}

        {step === 'persuasion' && (
          <PersuasionScreen
            key={`persuasion-${noCount}`} // Key change triggers animation
            message={PERSUASION_STEPS[noCount].text}
            gif={PERSUASION_STEPS[noCount].gif}
            onAccept={handleAccept}
            onReject={handleReject}
            noCount={noCount}
          />
        )}

        {step === 'final' && (
          <FinalScreen
            key="final"
            onAccept={handleAccept}
            gif="https://media1.tenor.com/m/AQxYsX3Th2IAAAAd/peach-goma-sad.gif"
          />
        )}

        {step === 'success' && (
          <SuccessScreen
            key="success"
            userName={userName}
            gif="https://media1.tenor.com/m/J3ZgK7SZ0ScAAAAd/peach-goma-love.gif"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
