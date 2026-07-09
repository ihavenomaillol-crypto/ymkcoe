import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";

const CHARS = "0123456789ABCDEF!@#$%^&*";

type DecryptionAvatarProps = {
  initials: string;
  imageSrc: string;
  themeRing: string;
};

export function DecryptionAvatar({ initials, imageSrc, themeRing }: DecryptionAvatarProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [displayText, setDisplayText] = useState(initials);
  const [phase, setPhase] = useState<"idle" | "scrambling" | "revealing" | "resolved">("idle");
  const scrambleInterval = useRef<NodeJS.Timeout | null>(null);

  // Generate a random 8x8 grid for pixelation effect
  const gridSize = 8;
  const pixels = Array.from({ length: gridSize * gridSize }).map((_, i) => {
    return { id: i, delay: Math.random() * 0.4 };
  });

  useEffect(() => {
    if (inView) {
      // Start Phase: Scrambling
      setPhase("scrambling");
      let ticks = 0;
      const maxTicks = 15; // 15 ticks of scrambling

      scrambleInterval.current = setInterval(() => {
        ticks++;
        if (ticks >= maxTicks) {
          // Move to revealing phase
          clearInterval(scrambleInterval.current!);
          setPhase("revealing");
          setTimeout(() => setPhase("resolved"), 600); // 600ms for pixels to reveal
        } else {
          // Generate random text
          const newText = Array.from({ length: initials.length })
            .map(() => CHARS[Math.floor(Math.random() * CHARS.length)])
            .join("");
          setDisplayText(newText);
        }
      }, 30);
    } else {
      // Reset
      if (scrambleInterval.current) clearInterval(scrambleInterval.current);
      setPhase("idle");
      setDisplayText(initials);
    }

    return () => {
      if (scrambleInterval.current) clearInterval(scrambleInterval.current);
    };
  }, [inView, initials]);

  return (
    <div 
      ref={ref}
      className="relative w-[120px] h-[120px] rounded-2xl flex items-center justify-center p-[3px] mx-auto mt-4"
    >
      {/* Glowing Background Ring */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-tr ${themeRing} opacity-100 blur-[2px]`} />
      
      {/* Inner Container (Mask for shape) */}
      <div className="w-full h-full rounded-2xl bg-[#0a0f24] flex items-center justify-center relative z-10 border border-white/10 overflow-hidden">
        
        {/* Layer 0: The Actual Image */}
        <img 
          src={imageSrc} 
          alt="Faculty" 
          className="absolute inset-0 w-full h-full object-cover z-0" 
        />

        {/* Layer 1: Pixelation Overlay */}
        <div className="absolute inset-0 z-10 grid" style={{ gridTemplateColumns: `repeat(${gridSize}, 1fr)`, gridTemplateRows: `repeat(${gridSize}, 1fr)` }}>
          {pixels.map((p) => (
            <motion.div
              key={p.id}
              className="bg-[#0a0f24] w-full h-full"
              initial={{ opacity: 1 }}
              animate={{ 
                opacity: (phase === "revealing" || phase === "resolved") ? 0 : 1 
              }}
              transition={{ 
                duration: 0.2, 
                delay: (phase === "revealing" || phase === "resolved") ? p.delay : 0, 
                ease: "linear" 
              }}
            />
          ))}
        </div>

        {/* Layer 2: Text / Scrambler */}
        <AnimatePresence>
          {(phase === "idle" || phase === "scrambling") && (
            <motion.span 
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className={`absolute z-20 text-2xl font-black tracking-wider bg-gradient-to-r ${themeRing} bg-clip-text text-transparent filter drop-shadow-[0_0_8px_rgba(99,102,241,0.2)]`}
            >
              {displayText}
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
