import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Lock, Unlock, Shield, Activity, Cpu, Fingerprint } from "lucide-react";

export type ITDeptContent = {
  name: string;
  short: string;
  about: string[];
  vision: string;
  mission: string[];
};

type Props = { dept: ITDeptContent };

export function ITVaultReveal({ dept }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  
  // Check if section is 50% in the viewport
  const isInView = useInView(sectionRef, { amount: 0.5 });
  const prevIsInView = useRef(isInView);

  // Auto-toggle vault based on scroll intersection edges
  useEffect(() => {
    if (isInView && !prevIsInView.current) {
      // Scrolled into perfect viewport -> scan and unlock
      if (!isUnlocked) triggerUnlock();
    } else if (!isInView && prevIsInView.current) {
      // Scrolled away -> lock instantly
      setIsUnlocked(false);
    }
    prevIsInView.current = isInView;
  }, [isInView]);

  const triggerUnlock = () => {
    if (isUnlocked) {
      setIsUnlocked(false);
      return;
    }
    
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setIsUnlocked(true);
    }, 1200); // Fake scan delay
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[100vh] bg-[#050505] border-b border-orange-900/30 overflow-hidden flex flex-col items-center justify-center pt-24 pb-12"
    >
      {/* Tech Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/it_header_bg.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-40 blur-sm scale-105 mix-blend-luminosity" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-[#050505]/90" />
        
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-orange-500/10 blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-blue-500/10 blur-[100px] mix-blend-screen" />
        
        {/* Large Tech Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* Department Overview Pill & Scroll Indicator */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="bg-orange-950/80 border border-orange-500/30 text-orange-400 px-6 py-2 rounded-full font-mono text-sm uppercase tracking-widest font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(249,115,22,0.2)]">
          IT — Department Overview
        </div>
        <div className="mt-4 text-orange-500/50 font-mono text-xs tracking-widest animate-pulse flex flex-col items-center">
          SCROLL DOWN TO DECRYPT
          <div className="w-[1px] h-8 bg-gradient-to-b from-orange-500/50 to-transparent mt-2" />
        </div>
      </div>

      {/* Vault Container */}
      <div className="relative w-full max-w-5xl h-[80vh] min-h-[600px] border-4 border-slate-800 rounded-lg shadow-2xl bg-[#0a0a0a] overflow-hidden z-10 mx-4 flex items-center justify-center">
        
        {/* Content Inside Vault (Revealed when open) */}
        <div className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-background z-0" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080801a_1px,transparent_1px),linear-gradient(to_bottom,#8080801a_1px,transparent_1px)] bg-[size:24px_24px] z-0" />
          <div className="absolute left-0 right-0 top-0 z-0 m-auto h-[310px] w-[310px] rounded-full bg-orange-500 opacity-20 blur-[100px]" />
          
          <div className="absolute inset-0 p-8 md:p-12 overflow-y-auto custom-scrollbar z-10">
            <div className="flex items-center gap-3 font-bold tracking-widest text-muted-foreground text-sm mb-8 border-b border-border pb-4">
              <Shield className="w-5 h-5 text-orange-500" />
              CLASSIFIED IT SPECS
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-8 text-foreground tracking-tight drop-shadow-sm uppercase">
              Department Overview
            </h2>
            
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow mb-10 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              <div className="flex items-center gap-3 text-orange-600 dark:text-orange-500 mb-6 font-bold uppercase tracking-wider text-sm relative z-10">
                <Cpu className="w-6 h-6" /> Department Specs
              </div>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
                {dept.about.map((spec, i) => (
                  <li key={i} className="flex gap-4 items-start text-muted-foreground">
                    <div className="w-2.5 h-2.5 mt-2 rounded-full bg-orange-500 shrink-0 shadow-sm" />
                    <span className="leading-relaxed font-medium">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex items-center gap-3 text-orange-600 dark:text-orange-500 mb-5 font-bold uppercase tracking-wider text-sm relative z-10">
                  <Activity className="w-6 h-6" /> Vision
                </div>
                <p className="text-muted-foreground leading-relaxed text-lg font-medium relative z-10">
                  "{dept.vision}"
                </p>
              </div>
              <div className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/0 via-orange-500/0 to-orange-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                <div className="flex items-center gap-3 text-orange-600 dark:text-orange-500 mb-5 font-bold uppercase tracking-wider text-sm relative z-10">
                  <Shield className="w-6 h-6" /> Mission
                </div>
                <ul className="space-y-4 relative z-10">
                  {dept.mission.map((m, i) => (
                    <li key={i} className="flex gap-4 text-muted-foreground">
                      <span className="text-orange-600 dark:text-orange-500 font-black text-lg">M{i+1}</span> 
                      <span className="leading-relaxed font-medium">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Vault Doors */}
        <motion.div 
          className="absolute inset-y-0 left-0 w-1/2 bg-slate-900 border-r-2 border-slate-700 z-20 flex justify-end items-center overflow-hidden"
          initial={{ boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
          animate={{ 
            x: isUnlocked ? "-100%" : "0%",
            boxShadow: isUnlocked ? "10px 0px 30px rgba(0,0,0,0.8)" : "0px 0px 0px rgba(0,0,0,0)"
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Left Door Details */}
          <div className="absolute left-4 top-4 bottom-4 w-12 border-2 border-slate-800 rounded opacity-50 flex flex-col justify-between py-8">
             {[...Array(6)].map((_, i) => <div key={i} className="w-full h-4 bg-slate-800" />)}
          </div>
          <div className="h-64 w-2 bg-slate-700 mr-2 rounded-full" />
        </motion.div>

        <motion.div 
          className="absolute inset-y-0 right-0 w-1/2 bg-slate-900 border-l-2 border-slate-700 z-20 flex justify-start items-center overflow-hidden"
          initial={{ boxShadow: "0px 0px 0px rgba(0,0,0,0)" }}
          animate={{ 
            x: isUnlocked ? "100%" : "0%",
            boxShadow: isUnlocked ? "-10px 0px 30px rgba(0,0,0,0.8)" : "0px 0px 0px rgba(0,0,0,0)"
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          {/* Right Door Details */}
          <div className="absolute right-4 top-4 bottom-4 w-12 border-2 border-slate-800 rounded opacity-50 flex flex-col justify-between py-8">
             {[...Array(6)].map((_, i) => <div key={i} className="w-full h-4 bg-slate-800" />)}
          </div>
          <div className="h-64 w-2 bg-slate-700 ml-2 rounded-full" />
        </motion.div>

        {/* Center Scanner / Lock Mechanism */}
        <AnimatePresence>
          {!isUnlocked && (
            <motion.div 
              className="absolute z-30 flex flex-col items-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.5 }}
            >
              <button 
                onClick={triggerUnlock}
                className={`relative w-32 h-32 rounded-full border-4 flex items-center justify-center transition-all duration-300 group
                  ${isScanning 
                    ? 'border-orange-500 bg-orange-500/20 shadow-[0_0_30px_rgba(249,115,22,0.6)]' 
                    : 'border-slate-700 bg-slate-800 hover:border-orange-500/50 hover:bg-slate-700'
                  }`}
              >
                {/* IVM Logo (Replacing Fingerprint) */}
                <div className={`w-16 h-16 rounded-full bg-white flex items-center justify-center p-2 transition-all duration-300 ${isScanning ? 'shadow-[0_0_20px_rgba(249,115,22,0.8)] scale-110 border-2 border-orange-400' : 'opacity-60 grayscale group-hover:grayscale-0 group-hover:opacity-100'}`}>
                  <img src="/ymkcoe_logo.png" alt="IVM Logo" className="w-full h-full object-contain" />
                </div>
                
                {/* Scanning Laser Line */}
                {isScanning && (
                  <motion.div 
                    className="absolute inset-x-4 h-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,1)]"
                    animate={{ top: ["20%", "80%", "20%"] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </button>
              
              <div className={`mt-6 font-mono text-lg font-bold tracking-widest ${isScanning ? 'text-orange-500' : 'text-slate-500'}`}>
                {isScanning ? 'DECRYPTING...' : 'LOCKED'}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Manual Lock Button (Visible when unlocked) */}
        <AnimatePresence>
          {isUnlocked && (
            <motion.button
              onClick={() => setIsUnlocked(false)}
              className="absolute bottom-6 right-6 z-30 bg-slate-900 border border-slate-700 text-slate-400 px-4 py-2 rounded-lg font-mono text-sm flex items-center gap-2 hover:bg-slate-800 hover:text-white transition-all shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 1 }}
            >
              <Lock className="w-4 h-4" /> RE-ENGAGE LOCK
            </motion.button>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
}
