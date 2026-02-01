import React, { useState } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MainContent } from './components/MainContent';
import { GrainOverlay, CustomCursor } from './components/UIEffects';

export default function App() {
  // Initialize state based on sessionStorage to persist across reloads
  const [hasEntered, setHasEntered] = useState(() => {
    try {
      return sessionStorage.getItem('niral_verse_entered') === 'true';
    } catch (e) {
      return false;
    }
  });

  const handleEnter = () => {
    try {
      sessionStorage.setItem('niral_verse_entered', 'true');
    } catch (e) {
      console.warn('Session storage not available');
    }
    setHasEntered(true);
  };

  return (
    <div className="relative w-full min-h-screen overflow-x-hidden bg-gray-900 text-white selection:bg-cyan-500/30 selection:text-cyan-100">
      <GrainOverlay />
      <CustomCursor />
      
      {!hasEntered ? (
        <WelcomeScreen onEnter={handleEnter} />
      ) : (
        <MainContent />
      )}
    </div>
  );
}