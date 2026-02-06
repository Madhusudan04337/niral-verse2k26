import React, { useState, useEffect } from 'react';
import { WelcomeScreen } from './components/WelcomeScreen';
import { MainContent } from './components/MainContent';
import { GrainOverlay, CustomCursor } from './components/UIEffects';

export default function App() {
  // 1. Asset 404 Guard:
  // If the browser requests a file (like a .jpg or .pdf) that doesn't exist, 
  // the server usually serves index.html (this app). 
  // We detect this and show a proper error instead of the Welcome Screen.
  const isAsset404 = /\.(jpg|jpeg|png|gif|pdf|svg|webp)$/i.test(window.location.pathname);

  const [hasEntered, setHasEntered] = useState(() => {
    try {
      if (isAsset404) return false; // Don't init state if we are crashing to 404

      // 2. Check URL Parameters OR Pathname for Deep Linking
      const searchParams = new URLSearchParams(window.location.search);
      const viewParam = searchParams.get('view');
      const path = window.location.pathname;
      
      // Support ?view=dashboard OR /dashboard
      if (viewParam === 'dashboard' || viewParam === 'cutscene' || path.includes('/dashboard')) {
        return true;
      }

      // 3. Fallback: Session Storage (Reloads)
      const entered = sessionStorage.getItem('niral_verse_entered') === 'true';
      const sessionView = sessionStorage.getItem('niral_main_view');
      
      if (entered && (sessionView === 'dashboard' || sessionView === 'cutscene')) {
        return true;
      }
      return false;
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

  // Render 404 Screen for missing assets
  if (isAsset404) {
     return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white font-mono p-6 text-center">
           <div className="border border-red-500/50 bg-red-900/10 p-8 rounded-lg max-w-lg">
             <h1 className="text-4xl font-bold text-red-500 mb-4 tracking-widest">SYSTEM ERROR: 404</h1>
             <p className="text-gray-300 mb-6 text-lg">
                ASSET NOT FOUND
             </p>
             <div className="bg-black/50 p-4 rounded border border-white/10 text-left mb-6 font-mono text-sm break-all">
                <span className="text-gray-500">REQUESTED PATH:</span><br/>
                <span className="text-cyan-400">{window.location.pathname}</span>
             </div>
             <p className="text-xs text-gray-500 uppercase tracking-widest">
                Please verify the file exists in the /public/assets folder.
             </p>
           </div>
        </div>
     );
  }

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