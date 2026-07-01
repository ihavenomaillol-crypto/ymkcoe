import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronRight } from "lucide-react";

const CODE_SNIPPETS = [
  "const data = await res.json();",
  "function init() { start(); }",
  "if (user.auth) { login(); }",
  "import { memo } from 'react';",
  "useEffect(() => { ... }, []);",
  "export default App;",
  "while (true) { break; }",
  "class Model extends Base {",
  "return <View>{children}</View>;",
  "try { execute(); } catch (e) {}",
  "const [state, setState] = useState();"
];

type FacultyCardProps = {
  name: string;
  designation: string;
  imageSrc: string;
  themeRing: string;
  badgeText: string;
};

export function FacultyCard({ name, designation, imageSrc, themeRing, badgeText }: FacultyCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const [phase, setPhase] = useState<"idle" | "scrambling" | "revealing" | "resolved">("idle");
  const [displayText, setDisplayText] = useState("");
  const scrambleInterval = useRef<NodeJS.Timeout | null>(null);

  // Generate a random grid for pixelation effect over the whole card
  const cols = 6;
  const rows = 8;
  const pixels = Array.from({ length: cols * rows }).map((_, i) => ({
    id: i,
    delay: Math.random() * 0.5,
  }));

  useEffect(() => {
    if (inView) {
      setPhase("scrambling");
      let ticks = 0;
      const maxTicks = 15; // Scramble duration

      scrambleInterval.current = setInterval(() => {
        ticks++;
        if (ticks >= maxTicks) {
          clearInterval(scrambleInterval.current!);
          setPhase("revealing");
          setTimeout(() => setPhase("resolved"), 700);
        } else {
          // Pick a random code snippet for the center
          const newText = CODE_SNIPPETS[Math.floor(Math.random() * CODE_SNIPPETS.length)];
          setDisplayText(newText);
        }
      }, 40);
    } else {
      if (scrambleInterval.current) clearInterval(scrambleInterval.current);
      setPhase("idle");
      setDisplayText("");
    }

    return () => {
      if (scrambleInterval.current) clearInterval(scrambleInterval.current);
    };
  }, [inView]);

  return (
    <div 
      ref={ref}
      className="group cursor-pointer relative rounded-[24px] bg-[#0A0F1A] border border-white/5 shadow-2xl overflow-hidden flex flex-col items-center justify-end p-6 transition-all duration-300 hover:border-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] w-full min-h-[380px]"
    >
      {/* 
        ====================================================
        ACTUAL CARD CONTENT (Layer 0) 
        ====================================================
      */}
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img 
          src={imageSrc} 
          alt={name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1A] via-[#0A0F1A]/80 to-transparent/10" />
      </div>

      <div className="relative z-0 w-full text-center pb-4 transition-transform duration-300 group-hover:-translate-y-2 px-1 w-full overflow-hidden">
        {/* Bottom: Name and Designation */}
        <div className="space-y-1.5 w-full text-center">
          <h3 className="font-extrabold text-white text-base md:text-lg tracking-tight leading-tight drop-shadow-lg whitespace-nowrap overflow-hidden text-ellipsis w-full">
            {name}
          </h3>
          <p className={`text-[9px] md:text-[10px] font-bold tracking-[0.15em] md:tracking-[0.2em] uppercase ${badgeText} drop-shadow-md whitespace-nowrap overflow-hidden text-ellipsis`}>
            {designation}
          </p>
        </div>
      </div>

      {/* 
        ====================================================
        DECRYPTION OVERLAY (Layer 1)
        ====================================================
      */}
      <div className="absolute inset-0 z-10 pointer-events-none grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)`, gridTemplateRows: `repeat(${rows}, 1fr)` }}>
        {pixels.map((p) => (
          <div
            key={p.id}
            className="bg-[#0A0F1A] w-full h-full transition-opacity duration-300 ease-linear"
            style={{
              opacity: (phase === "revealing" || phase === "resolved") ? 0 : 1,
              transitionDelay: `${p.delay}s`
            }}
          />
        ))}
      </div>

      {/* 
        ====================================================
        SCRAMBLED TEXT OVERLAY (Layer 2)
        ====================================================
      */}
      <AnimatePresence>
        {(phase === "idle" || phase === "scrambling") && (
          <motion.div 
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
          >
            <span className={`text-sm md:text-base font-mono font-bold tracking-tight bg-gradient-to-r ${themeRing} bg-clip-text text-transparent filter drop-shadow-[0_0_12px_rgba(99,102,241,0.5)] opacity-80 px-4 text-center break-all`}>
              {displayText}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
