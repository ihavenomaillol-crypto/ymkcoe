import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { Atom, Compass, Calculator, Library, Award, Target, Eye, GraduationCap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export type FEDeptContent = {
  name: string;
  short: string;
  about: string[];
  vision: string;
  mission: string[];
};

type Props = { dept: FEDeptContent };

export function FEScienceReveal({ dept }: Props) {
  const sectionRef = useRef<HTMLElement>(null);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [isScanning, setIsScanning] = useState(false);
  
  // Check if section is 50% in viewport
  const isInView = useInView(sectionRef, { amount: 0.5 });
  const prevIsInView = useRef(isInView);

  useEffect(() => {
    if (isInView && !prevIsInView.current) {
      if (!isUnlocked) triggerUnlock();
    } else if (!isInView && prevIsInView.current) {
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
    }, 1200);
  };

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[100vh] bg-[#090507] border-b border-rose-900/30 overflow-hidden flex flex-col items-center justify-center pt-24 pb-12"
    >
      {/* Tech/Science Background */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <img 
          src="/fe_header_bg.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-45 blur-[2px] scale-105" 
          onError={(e) => {
            // Fallback if image download fails
            (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=1000";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090507] via-[#090507]/80 to-[#090507]/95" />
        
        {/* Ambient Glowing Orbs */}
        <div className="absolute top-[20%] left-[10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] rounded-full bg-rose-500/10 blur-[120px] mix-blend-screen animate-pulse" />
        <div className="absolute bottom-[10%] right-[10%] w-[40vw] h-[40vw] max-w-[500px] max-h-[500px] rounded-full bg-pink-500/10 blur-[100px] mix-blend-screen" />
        
        {/* STEM Drafting Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff07_1px,transparent_1px),linear-gradient(to_bottom,#ffffff07_1px,transparent_1px)] bg-[size:3.5rem_3.5rem]" />
      </div>

      {/* Header Pill & Scroll Hint */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="bg-rose-950/80 border border-rose-500/30 text-rose-400 px-6 py-2 rounded-full font-mono text-sm uppercase tracking-widest font-bold flex items-center gap-2 shadow-[0_0_15px_rgba(244,63,94,0.2)]">
          FE — Foundational STEM Sandbox
        </div>
        <div className="mt-4 text-rose-500/50 font-mono text-xs tracking-widest animate-pulse flex flex-col items-center">
          SCROLL TO FORMULATE BLUEPRINT
          <div className="w-[1px] h-8 bg-gradient-to-b from-rose-500/50 to-transparent mt-2" />
        </div>
      </div>

      {/* Lab Sandbox Container */}
      <div className="relative w-full max-w-5xl h-[80vh] min-h-[600px] border-4 border-slate-800 rounded-2xl shadow-2xl bg-[#0a0a0c] overflow-hidden z-10 mx-4 flex items-center justify-center">
        
        {/* Content (Revealed when unlocked) */}
        <div className={`absolute inset-0 overflow-hidden transition-opacity duration-1000 ${isUnlocked ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 bg-background z-0" />
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#e11d4808_1px,transparent_1px),linear-gradient(to_bottom,#e11d4808_1px,transparent_1px)] bg-[size:28px_28px] z-0" />
          <div className="absolute left-0 right-0 top-0 z-0 m-auto h-[350px] w-[350px] rounded-full bg-rose-500 opacity-20 blur-[120px]" />
          
          <div className="absolute inset-0 p-8 md:p-12 overflow-y-auto custom-scrollbar z-10">
            <div className="flex items-center gap-3 font-bold tracking-widest text-muted-foreground text-sm mb-8 border-b border-border pb-4">
              <Atom className="w-5 h-5 text-rose-500 animate-spin" style={{ animationDuration: '6s' }} />
              STEM BLUEPRINT CONFIG
            </div>

            <h2 className="text-4xl md:text-5xl font-black mb-8 text-foreground tracking-tight drop-shadow-sm uppercase">
              First Year Foundation
            </h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Vision & Mission */}
              <div className="lg:col-span-7 space-y-8">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2.5 text-primary">
                    <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500"><Eye className="w-5 h-5" /></div>
                    Vision Statement
                  </h3>
                  <p className="text-muted-foreground leading-relaxed pl-12">
                    {dept.vision}
                  </p>
                </div>

                <div className="space-y-4">
                  <h3 className="text-xl font-bold flex items-center gap-2.5 text-primary">
                    <div className="p-2 rounded-lg bg-rose-500/10 text-rose-500"><Target className="w-5 h-5" /></div>
                    Mission Mandates
                  </h3>
                  <div className="space-y-3 pl-12">
                    {dept.mission.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-3">
                        <div className="w-5 h-5 rounded-full bg-rose-500/10 text-rose-500 text-xs font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                          {idx + 1}
                        </div>
                        <p className="text-muted-foreground leading-relaxed text-sm">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Highlights */}
              <div className="lg:col-span-5 bg-muted/30 border border-border p-6 rounded-2xl space-y-6">
                <h4 className="text-sm font-bold text-foreground uppercase tracking-widest border-b border-border pb-2 flex items-center gap-2">
                  <Library className="w-4 h-4 text-rose-500" />
                  Key Highlights
                </h4>
                <div className="space-y-4">
                  {dept.about.map((highlight, idx) => (
                    <div key={idx} className="flex gap-3">
                      <div className="w-2 h-2 rounded-full bg-rose-500 mt-2 shrink-0" />
                      <p className="text-muted-foreground text-sm leading-relaxed">{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scan UI / Interactive Lock Screen (Active when locked) */}
        <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-1000 z-20 ${isUnlocked ? 'translate-y-full opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'}`}>
          <div className="absolute inset-0 bg-[#0a0a0c]/90 backdrop-blur-md" />
          
          <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-md">
            {/* Hologram Circle */}
            <div className="relative w-36 h-36 rounded-full border-2 border-dashed border-rose-500/40 flex items-center justify-center mb-8 group cursor-pointer hover:border-rose-500 transition-colors duration-300" onClick={triggerUnlock}>
              
              {/* Spinning Ring */}
              <motion.div 
                className="absolute inset-0 rounded-full border border-rose-500/30"
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 8, ease: "linear" }}
              />

              {/* Glowing Center Spot */}
              <div className="absolute inset-4 rounded-full bg-rose-500/5 filter blur-md" />

              {/* Rotating Icons */}
              <div className="absolute inset-0 flex items-center justify-center text-rose-500">
                {isScanning ? (
                  <Atom className="w-12 h-12 animate-spin" />
                ) : (
                  <Compass className="w-12 h-12 animate-bounce" />
                )}
              </div>
              
              {/* Scanline bar */}
              {isScanning && (
                <motion.div 
                  className="absolute left-0 right-0 h-0.5 bg-rose-500 shadow-[0_0_10px_#f43f5e]"
                  initial={{ top: "10%" }}
                  animate={{ top: "90%" }}
                  transition={{ repeat: Infinity, duration: 1, repeatType: "reverse", ease: "easeInOut" }}
                />
              )}
            </div>

            <h3 className="text-2xl font-extrabold text-white mb-2 uppercase tracking-wide">
              {isScanning ? "Synthesizing Lab Blueprint..." : "STEM Blueprint Locked"}
            </h3>
            <p className="text-xs font-mono text-rose-500/80 mb-6 uppercase tracking-wider">
              {isScanning ? "Evaluating mathematical constants & core physics parameters" : "Click node or scroll down to initiate formulation"}
            </p>

            <Button 
              onClick={triggerUnlock}
              disabled={isScanning}
              className="bg-rose-600 hover:bg-rose-500 text-white font-semibold rounded-full px-6 py-5 shadow-lg shadow-rose-950/40 border border-rose-400/20 text-xs uppercase tracking-widest flex items-center gap-2 group transition-all"
            >
              {isScanning ? "Formulating..." : "Formulate Blueprint"}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
