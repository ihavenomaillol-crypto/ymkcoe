import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Radio, Shield, Cpu, Activity, Zap } from "lucide-react";

export type ENTCDeptContent = {
  name: string;
  short: string;
  about: string[];
  vision: string;
  mission: string[];
};

type Props = { dept: ENTCDeptContent };

export function ENTCCircuitReveal({ dept }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isTurnedOn, setIsTurnedOn] = useState(false);
  
  // Check if section is 50% in the viewport (the "perfect viewport")
  const isInView = useInView(sectionRef, { amount: 0.5 });
  const prevIsInView = useRef(isInView);

  // Auto-toggle switch based on scroll intersection edges
  useEffect(() => {
    if (isInView && !prevIsInView.current) {
      // Scrolled into perfect viewport -> flick ON
      setIsTurnedOn(true);
    } else if (!isInView && prevIsInView.current) {
      // Scrolled away -> flick OFF
      setIsTurnedOn(false);
    }
    prevIsInView.current = isInView;
  }, [isInView]);

  const toggleSwitch = () => {
    setIsTurnedOn(!isTurnedOn);
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[100vh] bg-[#020510] border-b border-emerald-900/30 overflow-hidden flex flex-col justify-center pt-24"
    >
      {/* Blurry Background Image */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/entc_header_bg.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-50 blur-lg scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020510] via-transparent to-[#020510]" />
      </div>
      {/* Department Overview Pill & Scroll Indicator */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 px-6 py-2 rounded-full font-mono text-sm uppercase tracking-widest font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
          {dept.short} — Department Overview
        </div>
        <div className="mt-4 text-emerald-500/60 text-xs uppercase tracking-widest flex flex-col items-center gap-1">
          <span>Scroll down or click switch</span>
          <div className="w-[1px] h-4 bg-emerald-500/50 mt-1 animate-pulse" />
        </div>
      </div>

      <div className="w-full flex flex-col md:flex-row items-center justify-center p-4 py-32 md:p-10 gap-10">
        
        {/* Left Side: Interactive Hardware Switch */}
        <div className="w-full md:w-1/3 flex flex-col items-center justify-center relative z-20">
          
          <div className="mb-12 text-center text-emerald-500 font-mono text-sm tracking-widest uppercase">
            <Radio className="w-6 h-6 mx-auto mb-3 animate-pulse" />
            Main Power System
          </div>

          {/* Switch Plate */}
          <div className="relative w-48 h-72 rounded-3xl bg-slate-900 border-[8px] border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.8),inset_0_5px_15px_rgba(255,255,255,0.05)] flex items-center justify-center">
            
            {/* Screws */}
            <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-slate-700 shadow-inner flex items-center justify-center rotate-45"><div className="w-full h-[1px] bg-slate-900"></div></div>
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-slate-700 shadow-inner flex items-center justify-center -rotate-12"><div className="w-full h-[1px] bg-slate-900"></div></div>
            <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-slate-700 shadow-inner flex items-center justify-center rotate-90"><div className="w-full h-[1px] bg-slate-900"></div></div>
            <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-slate-700 shadow-inner flex items-center justify-center rotate-180"><div className="w-full h-[1px] bg-slate-900"></div></div>

            {/* Labels */}
            <div className="absolute top-8 font-mono font-bold text-slate-500 text-lg tracking-widest uppercase">ON</div>
            <div className="absolute bottom-8 font-mono font-bold text-slate-500 text-lg tracking-widest uppercase">OFF</div>

            {/* Status LED */}
            <div className="absolute top-16 w-3 h-3 rounded-full shadow-inner transition-colors duration-300"
                 style={{
                   backgroundColor: isTurnedOn ? '#10b981' : '#ef4444',
                   boxShadow: isTurnedOn ? '0 0 15px #10b981, inset 0 -2px 5px rgba(0,0,0,0.5)' : '0 0 10px rgba(239,68,68,0.3), inset 0 -2px 5px rgba(0,0,0,0.5)'
                 }}
            />

            {/* The Switch housing */}
            <div className="w-20 h-36 bg-black rounded-lg border border-slate-800 flex items-center justify-center shadow-inner relative overflow-hidden cursor-pointer" onClick={toggleSwitch}>
              {/* Inner track */}
              <div className="w-14 h-32 bg-slate-950 rounded shadow-inner absolute" />
              
              {/* The Toggle */}
              <motion.div 
                className="w-16 h-16 rounded shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_4px_rgba(255,255,255,0.2),inset_0_-5px_15px_rgba(0,0,0,0.5)] absolute z-10 flex flex-col items-center justify-center gap-1 cursor-pointer"
                style={{
                  background: 'linear-gradient(180deg, #334155 0%, #0f172a 100%)',
                }}
                animate={{
                  y: isTurnedOn ? -25 : 25,
                  rotateX: isTurnedOn ? 15 : -15,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                {/* Grip lines */}
                <div className="w-10 h-[2px] bg-slate-900 rounded-full opacity-60"></div>
                <div className="w-10 h-[2px] bg-slate-900 rounded-full opacity-60"></div>
                <div className="w-10 h-[2px] bg-slate-900 rounded-full opacity-60"></div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Right Side: TV OLED Display */}
        <div className="w-full md:w-2/3 h-[500px] md:h-[600px] relative z-20 flex flex-col justify-center">
          <div className="relative w-full h-full rounded-2xl bg-black border-[12px] border-slate-900 shadow-[0_0_100px_rgba(0,0,0,1)] overflow-hidden flex items-center justify-center">
            
            {/* TV Screen Glass Reflection */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 z-30 pointer-events-none" />
            <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-gradient-to-r from-transparent via-white/5 to-transparent rotate-45 z-30 pointer-events-none" />

            {/* TV Content State */}
            <AnimatePresence>
              {!isTurnedOn ? (
                /* OFF State */
                <motion.div 
                  key="off"
                  initial={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-[#0a0a0a] flex items-center justify-center z-20"
                >
                  <div className="w-3 h-3 rounded-full bg-slate-800 animate-pulse opacity-50 shadow-[0_0_10px_rgba(255,255,255,0.1)]" />
                </motion.div>
              ) : (
                /* ON State - TV Turn On Effect & Content */
                <motion.div 
                  key="on"
                  className="absolute inset-0 bg-[#f8fafc] z-10 overflow-hidden flex flex-col"
                  initial={{ 
                    scaleY: 0,
                    opacity: 0
                  }}
                  animate={{ 
                    scaleY: 1,
                    opacity: 1
                  }}
                  transition={{ 
                    duration: 0.4, 
                    ease: "easeOut"
                  }}
                >
                  
                  {/* Top Bar - Channel/Input Info */}
                  <div className="w-full bg-emerald-600 border-b border-emerald-700 px-6 py-3 flex items-center justify-between text-white font-mono text-sm relative z-10 shadow-md">
                    <div className="flex items-center gap-3 font-bold tracking-widest">
                      <img src="/ymkcoe_logo.png" alt="IVM Logo" className="w-5 h-5 object-contain bg-white rounded-full p-[2px]" />
                      YMKCOE TV : ENTC
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-2 font-bold"><div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"/> LIVE</span>
                      <span className="opacity-80">1080p 60Hz</span>
                    </div>
                  </div>

                  {/* Main TV Content Area */}
                  <div className="p-8 md:p-12 h-full overflow-y-auto relative z-10 custom-scrollbar text-slate-800 bg-white">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5, duration: 0.6 }}
                    >
                      <h2 className="text-4xl md:text-5xl font-black mb-6 text-slate-900 tracking-tight drop-shadow-sm uppercase">
                        Department Overview
                      </h2>
                      
                      <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow mb-10">
                        <div className="flex items-center gap-3 text-emerald-600 mb-6 font-bold uppercase tracking-wider text-sm">
                          <Cpu className="w-6 h-6" /> Department Specs
                        </div>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {dept.about.map((spec, i) => (
                            <li key={i} className="flex gap-4 items-start text-slate-600">
                              <div className="w-2.5 h-2.5 mt-2 rounded-full bg-emerald-500 shrink-0 shadow-sm" />
                              <span className="leading-relaxed font-medium">{spec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 text-emerald-600 mb-5 font-bold uppercase tracking-wider text-sm">
                            <Activity className="w-6 h-6" /> Vision
                          </div>
                          <p className="text-slate-600 leading-relaxed text-lg font-medium">
                            "{dept.vision}"
                          </p>
                        </div>
                        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow">
                          <div className="flex items-center gap-3 text-emerald-600 mb-5 font-bold uppercase tracking-wider text-sm">
                            <Shield className="w-6 h-6" /> Mission
                          </div>
                          <ul className="space-y-4">
                            {dept.mission.map((m, i) => (
                              <li key={i} className="flex gap-4 text-slate-600">
                                <span className="text-emerald-600 font-black text-lg">M{i+1}</span> 
                                <span className="leading-relaxed font-medium">{m}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
          </div>
          
          {/* TV Base/Stand */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-48 h-8 bg-gradient-to-b from-slate-800 to-slate-900 border-x border-slate-700 rounded-b-xl shadow-2xl z-0" />
          <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-64 h-3 bg-slate-950 rounded-full blur-md opacity-50 z-0" />
        </div>

      </div>
    </section>
  );
}
