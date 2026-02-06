import React, { useRef, useState, useEffect } from 'react';
import { CommandDeckHero } from './CommandDeckHero';
import { ArrivalCutscene } from './transitions/ArrivalCutscene';
import { DashboardSection } from './dashboard/DashboardSection';

export const MainContent: React.FC = () => {
  // Initialize state from URL params OR Pathname first, then storage
  const [viewState, setViewState] = useState<'command' | 'cutscene' | 'dashboard'>(() => {
    try {
      const searchParams = new URLSearchParams(window.location.search);
      const viewParam = searchParams.get('view');
      const path = window.location.pathname;

      // Handle direct path access or query param
      if (viewParam === 'dashboard' || path.includes('/dashboard')) return 'dashboard';
      if (viewParam === 'cutscene') return 'cutscene';
      if (viewParam === 'command') return 'command';

      const saved = sessionStorage.getItem('niral_main_view');
      if (saved === 'cutscene') return 'dashboard'; // Don't re-run cutscene on reload
      return (saved as 'command' | 'dashboard') || 'command';
    } catch (e) {
      return 'command';
    }
  });

  const dashboardRef = useRef<HTMLDivElement>(null);

  // Sync state to URL and Session Storage
  useEffect(() => {
    try {
      sessionStorage.setItem('niral_main_view', viewState);
      
      // Update URL without reloading
      const url = new URL(window.location.href);
      
      if (viewState === 'command') {
         // Clear params when on command deck
         url.searchParams.delete('view');
         url.searchParams.delete('category');
         url.searchParams.delete('eventId');
         
         // If we are on /dashboard path, reset to root
         if (window.location.pathname.includes('/dashboard')) {
             window.history.pushState({ view: 'command' }, '', '/');
             return;
         }
      } else {
         url.searchParams.set('view', viewState);
      }
      
      // Update history state
      // We check if the state actually needs updating to avoid redundant history entries
      const currentViewParam = new URLSearchParams(window.location.search).get('view');
      if (currentViewParam !== viewState) {
          window.history.pushState({ view: viewState }, '', url.toString());
      }

    } catch (e) {
      console.warn('Navigation update failed');
    }
  }, [viewState]);

  // Handle Browser Back/Forward Buttons
  useEffect(() => {
    const handlePopState = () => {
      const searchParams = new URLSearchParams(window.location.search);
      const view = searchParams.get('view') as any;
      const path = window.location.pathname;
      
      if (view) {
          setViewState(view);
      } else if (path.includes('/dashboard')) {
          setViewState('dashboard');
      } else {
          setViewState('command');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleCutsceneComplete = () => {
    setViewState('dashboard');
    setTimeout(() => {
      dashboardRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  return (
    <div className="bg-black text-white overflow-x-hidden">
      {viewState === 'command' && (
         <CommandDeckHero onInitiateDrop={() => setViewState('cutscene')} />
      )}

      {viewState === 'cutscene' && <ArrivalCutscene onComplete={handleCutsceneComplete} />}
      
      {viewState === 'dashboard' && (
        <div ref={dashboardRef}>
           <DashboardSection onBackToHome={() => {
              setViewState('command');
           }} />
        </div>
      )}
    </div>
  );
};