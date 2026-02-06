import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ArrowRight } from 'lucide-react';
import { ParticlesBackground } from './ParticlesBackground';
import { IMAGES } from './assets/images';

interface WelcomeScreenProps {
  onEnter: () => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onEnter }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const logoGroupRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline for orchestrated entrance
      const tl = gsap.timeline();

      // Initial state
      gsap.set(logoGroupRef.current, { scale: 0.8, opacity: 0, y: -20 });
      gsap.set(textRef.current, { opacity: 0, y: 20 });
      gsap.set(buttonRef.current, { y: 30, opacity: 0 });

      // Animations
      tl.to(logoGroupRef.current, {
        duration: 1.5,
        scale: 1,
        opacity: 1,
        y: 0,
        ease: "elastic.out(1, 0.75)",
      })
      .to(textRef.current, {
        duration: 1,
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2.out",
      }, "-=0.8")
      .to(buttonRef.current, {
        duration: 0.8,
        y: 0,
        opacity: 1,
        ease: "back.out(1.7)",
      }, "-=0.5");

    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleButtonClick = () => {
    // Exit animation
    gsap.to(containerRef.current, {
      opacity: 0,
      scale: 1.1,
      filter: "blur(20px)",
      duration: 1,
      ease: "power2.in",
      onComplete: onEnter
    });
  };

  return (
    <section 
      ref={containerRef}
      className="relative w-full min-h-screen flex flex-col items-center justify-center bg-black overflow-hidden py-10"
    >
      {/* Dark Gradient Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#001F3D] via-[#020408] to-black z-0 pointer-events-none fixed" />
      
      {/* Particle Effects Integration */}
      <ParticlesBackground />

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center p-4 md:p-6 text-center w-full max-w-[95%] md:max-w-full">
        
        {/* Logos Row (Single Logo) */}
        <div ref={logoGroupRef} className="flex flex-row items-center justify-center mb-8 md:mb-12 w-full">
            
            {/* Center: Niral Logo (Big) */}
            <div className="relative w-32 h-32 sm:w-52 sm:h-52 md:w-80 md:h-80 flex-shrink-0">
                 {/* Abstract Glow Background behind logo */}
                 <div className="absolute inset-0 bg-orange-500/20 blur-[30px] sm:blur-[50px] rounded-full animate-pulse" />
                 <img 
                    src={IMAGES.LOGOS.NIRAL} 
                    alt="Niral-Verse Logo" 
                    className="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(237,152,95,0.6)] sm:drop-shadow-[0_0_30px_rgba(237,152,95,0.7)] relative z-10"
                 />
            </div>

        </div>

        {/* Main Title and Mission Info */}
        <div ref={textRef} className="mb-8 md:mb-12 flex flex-col items-center max-w-4xl mx-auto w-full">
          {/* Enhanced Glow Text for Title */}
          <h1 className="flex flex-col items-center font-orbitron font-bold text-white tracking-widest select-none leading-none mb-6 md:mb-8">
            <span className="text-sm sm:text-xl md:text-2xl text-cyan-400 mb-2 md:mb-4 tracking-[0.3em] md:tracking-[0.5em] neon-glow font-light opacity-90 block">WELCOME TO</span>
            <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl block drop-shadow-[0_0_30px_rgba(0,240,255,0.4)]">
              NIRAL-VERSE <span className="text-[#ED985F] drop-shadow-[0_0_20px_rgba(237,152,95,0.6)]">2K26</span>
            </span>
          </h1>
          
          <div className="space-y-3 md:space-y-4 max-w-xs sm:max-w-2xl bg-[#001F3D]/30 p-4 md:p-6 rounded-lg border border-[#ED985F]/20 backdrop-blur-md shadow-[0_0_40px_rgba(0,0,0,0.4)] relative overflow-hidden group mx-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#ED985F]/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out pointer-events-none" />
            
            <h2 className="text-[#ED985F] font-mono text-xs md:text-sm lg:text-base tracking-[0.2em] font-bold border-b border-[#ED985F]/30 pb-2 inline-block">
              [ MISSION_OBJECTIVE ]
            </h2>
            <p className="text-gray-300 font-mono text-[10px] sm:text-xs md:text-sm leading-relaxed text-justify md:text-center">
              Niralverse 2K26 marks the powerful return of our flagship event after the grand success of its first edition. Bringing together innovation, creativity, and talent, this second chapter features an exciting lineup of both technical and non-technical events designed to challenge minds and celebrate skills. Get ready to compete, connect, and be part of an experience where ideas ignite and possibilities expand.
            </p>
          </div>
        </div>

        {/* Call to Action */}
        <button
          ref={buttonRef}
          onClick={handleButtonClick}
          className="group relative px-8 py-3 md:px-10 md:py-4 bg-transparent overflow-hidden rounded-full border border-[#ED985F]/50 hover:bg-[#ED985F]/10 transition-all duration-300 shadow-[0_0_20px_rgba(237,152,95,0.15)] hover:shadow-[0_0_35px_rgba(237,152,95,0.4)]"
          aria-label="Enter the Mission"
        >
          <div className="absolute inset-0 w-0 bg-[#ED985F] transition-all duration-[250ms] ease-out group-hover:w-full opacity-20" />
          <span className="relative flex items-center space-x-2 md:space-x-3 text-[#F7B980] font-bold tracking-[0.2em] uppercase group-hover:text-white text-xs md:text-sm lg:text-base">
            <span>Enter the Mission</span>
            <ArrowRight className="w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform" />
          </span>
        </button>

      </div>

      {/* Decorative Overlay Gradients */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-black to-transparent pointer-events-none z-20 fixed" />
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-black to-transparent pointer-events-none z-20 fixed" />
    </section>
  );
};