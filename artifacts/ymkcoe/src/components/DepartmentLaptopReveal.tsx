import { useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export type DepartmentLaptopContent = {
  short: string;
  name: string;
  color: string;
  about: string[];
  vision: string;
  mission: string[];
};

const accentMap: Record<string, { ring: string; glow: string; badge: string; screen: string }> = {
  blue: {
    ring: "ring-blue-500/30",
    glow: "shadow-blue-500/20",
    badge: "bg-blue-500/15 text-blue-700",
    screen: "from-blue-950 via-slate-900 to-slate-950",
  },
  violet: {
    ring: "ring-violet-500/30",
    glow: "shadow-violet-500/20",
    badge: "bg-violet-500/15 text-violet-700",
    screen: "from-violet-950 via-slate-900 to-slate-950",
  },
  emerald: {
    ring: "ring-emerald-500/30",
    glow: "shadow-emerald-500/20",
    badge: "bg-emerald-500/15 text-emerald-700",
    screen: "from-emerald-950 via-slate-900 to-slate-950",
  },
  orange: {
    ring: "ring-orange-500/30",
    glow: "shadow-orange-500/20",
    badge: "bg-orange-500/15 text-orange-700",
    screen: "from-orange-950 via-slate-900 to-slate-950",
  },
};

type DepartmentLaptopRevealProps = {
  dept: DepartmentLaptopContent;
};

export function DepartmentLaptopReveal({ dept }: DepartmentLaptopRevealProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollRootRef = useRef<HTMLElement | null>(null);
  const [ready, setReady] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const reduceMotion = useReducedMotion();
  const accent = accentMap[dept.color] ?? accentMap.blue;

  useEffect(() => {
    scrollRootRef.current = document.querySelector("main");
    setReady(true);
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const disable3D = reduceMotion || isMobile;

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    container: scrollRootRef,
    offset: ["start 0.9", "end 0.25"],
  });

  const lidRotate = useTransform(
    scrollYProgress,
    [0, 0.45, 1],
    disable3D ? [-15, -15, -15] : [-96, -28, -28],
  );
  const screenOpacity = useTransform(
    scrollYProgress,
    [0, disable3D ? 0 : 0.22, 0.45],
    [0, 1, 1],
  );
  const contentY = useTransform(
    scrollYProgress,
    [0.2, 0.45],
    disable3D ? [0, 0] : [18, 0],
  );
  const hintOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  return (
    <section
      ref={sectionRef}
      id="dept-about"
      data-scroll-reveal
      className="relative bg-muted/20 border-y border-border"
      style={{ minHeight: disable3D ? "auto" : "160vh" }}
    >
      <div className={disable3D ? "flex min-h-[50vh] items-center justify-center px-4 py-12" : "sticky top-0 flex min-h-[85vh] items-center justify-center px-4 py-16"}>
        <div className="w-full max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-10">
            <span className={`inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest ${accent.badge}`}>
              {dept.short}
            </span>
            <h2 className="mt-3 text-2xl md:text-3xl font-bold text-primary tracking-tight">
              Department Overview
            </h2>
            <motion.p
              style={{ opacity: ready && !disable3D ? hintOpacity : 0 }}
              className="mt-2 text-sm text-muted-foreground hidden md:block"
            >
              Scroll
            </motion.p>
          </div>

          <div
            className="mx-auto w-full max-w-2xl"
            style={{ perspective: "1400px", perspectiveOrigin: "50% 40%" }}
          >
            <div className="relative mx-auto w-full max-w-xl" style={{ transformStyle: "preserve-3d" }}>
              {/* Lid + screen */}
              <motion.div
                className="relative z-10 origin-bottom"
                style={{
                  rotateX: ready ? lidRotate : -96,
                  transformStyle: "preserve-3d",
                  transformPerspective: 1200,
                }}
              >
                <div
                  className={`relative overflow-hidden rounded-t-xl border border-slate-700/80 bg-slate-900 shadow-2xl ${accent.glow} ring-1 ${accent.ring}`}
                  style={{ height: "clamp(220px, 42vw, 320px)" }}
                >
                  <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-2 border-b border-white/10 bg-black/40 px-4 py-2.5 backdrop-blur-sm">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400/90" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/90" />
                    <span className="ml-2 truncate text-[10px] font-medium text-white/50">
                      {dept.name}
                    </span>
                  </div>

                  <motion.div
                    style={{
                      opacity: ready ? screenOpacity : 1,
                      y: ready ? contentY : 0,
                    }}
                    className={`absolute inset-0 top-10 overflow-y-auto bg-gradient-to-br ${accent.screen} px-4 pb-4 pt-3 md:px-5`}
                  >
                    <div className="space-y-4 text-left">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1.5">
                          About the Department
                        </p>
                        <ul className="space-y-1.5">
                          {dept.about.map((point) => (
                            <li key={point} className="flex gap-2 text-[11px] leading-relaxed text-slate-300 md:text-xs">
                              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="grid gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1">
                            Vision
                          </p>
                          <p className="text-[11px] leading-relaxed text-slate-300 md:text-xs">{dept.vision}</p>
                        </div>
                        <div className="rounded-lg border border-white/10 bg-white/5 p-3">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-accent mb-1">
                            Mission
                          </p>
                          <ul className="space-y-1">
                            {dept.mission.map((item, i) => (
                              <li key={item} className="text-[11px] leading-relaxed text-slate-300 md:text-xs">
                                <span className="font-semibold text-white/70">M{i + 1}.</span> {item}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <div className="pointer-events-none absolute inset-0 rounded-t-xl bg-gradient-to-b from-white/10 via-transparent to-black/30" />
                </div>
              </motion.div>

              {/* Hinge */}
              <div className="relative z-0 mx-4 h-1.5 rounded-full bg-gradient-to-r from-slate-600 via-slate-400 to-slate-600 shadow-inner" />

              {/* Base / keyboard */}
              <div className="relative z-0 -mt-0.5 rounded-b-2xl border border-slate-600/80 bg-gradient-to-b from-slate-700 to-slate-800 px-6 pb-5 pt-4 shadow-xl">
                <div className="mx-auto mb-3 h-1 w-16 rounded-full bg-slate-500/50" />
                <div className="grid grid-cols-6 gap-1 opacity-40">
                  {Array.from({ length: 18 }).map((_, i) => (
                    <div key={i} className="h-1.5 rounded-sm bg-slate-500/60" />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
