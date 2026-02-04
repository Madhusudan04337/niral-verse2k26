import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

export const GrainOverlay: React.FC = () => (
  <div 
    className="fixed inset-0 pointer-events-none z-[9000] opacity-[0.05] mix-blend-overlay"
    style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
    }}
  />
);

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const followerRef = useRef<HTMLDivElement>(null);
  const isHiddenRef = useRef(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const cursor = cursorRef.current;
    const follower = followerRef.current;
    
    if (!cursor || !follower) return;

    // Initial positioning hidden
    gsap.set(cursor, { xPercent: -50, yPercent: -50, scale: 0 });
    gsap.set(follower, { xPercent: -50, yPercent: -50, scale: 0 });

    const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const mouse = { x: pos.x, y: pos.y };
    const speed = 0.15; // Follower lag factor

    const xSet = gsap.quickSetter(cursor, "x", "px");
    const ySet = gsap.quickSetter(cursor, "y", "px");
    const fXSet = gsap.quickSetter(follower, "x", "px");
    const fYSet = gsap.quickSetter(follower, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
       mouse.x = e.clientX;
       mouse.y = e.clientY;

       const target = e.target as HTMLElement;
       const isNormalCursorZone = target.closest('.normal-cursor-zone');

       if (isNormalCursorZone) {
           if (!isHiddenRef.current) {
               // Hide custom cursor elements
               gsap.to([cursor, follower], { opacity: 0, scale: 0, duration: 0.2, overwrite: true });
               isHiddenRef.current = true;
           }
           return;
       }

       // Show custom cursor (restore if hidden)
       if (isHiddenRef.current) {
           gsap.to([cursor, follower], { opacity: 1, scale: 1, duration: 0.2, overwrite: true });
           isHiddenRef.current = false;
       }
       
       // Instant move for dot
       xSet(mouse.x);
       ySet(mouse.y);

       // Reveal on first move if not already revealed/hidden
       if (!cursor.dataset.revealed) {
           gsap.to(cursor, { scale: 1, duration: 0.3, overwrite: 'auto' });
           gsap.to(follower, { scale: 1, duration: 0.3, overwrite: 'auto' });
           cursor.dataset.revealed = "true";
       }
    };

    const loop = () => {
      // Smooth follow logic
      const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
      pos.x += (mouse.x - pos.x) * dt;
      pos.y += (mouse.y - pos.y) * dt;
      fXSet(pos.x);
      fYSet(pos.y);
    };

    window.addEventListener("mousemove", onMouseMove);
    gsap.ticker.add(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(loop);
    };
  }, []);

  return (
    <>
      {/* Inner dot: reduced from w-2 h-2 to w-1.5 h-1.5 */}
      <div ref={cursorRef} className="fixed top-0 left-0 w-1.5 h-1.5 bg-cyan-400 rounded-full pointer-events-none z-[10000] mix-blend-difference hidden md:block" />
      {/* Outer ring: reduced from w-12 h-12 to w-8 h-8 */}
      <div ref={followerRef} className="fixed top-0 left-0 w-8 h-8 border border-cyan-500/50 rounded-full pointer-events-none z-[9999] hidden md:block transition-colors duration-300" />
    </>
  );
};