import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, CalendarDays, Clock, Flag, Target, ArrowRight } from "lucide-react";

interface CalendarEvent {
  id: string;
  month: string;
  title: string;
  term: string;
  side: "left" | "right";
  angle: number;
  color: string;
  bg: string;
  gradient: string;
}

const EVENTS: CalendarEvent[] = [
  // ODD SEMESTER
  { id: "e1", month: "July", title: "Commencement of classes", term: "Odd Semester", side: "left", angle: 120, color: "text-amber-500", bg: "bg-amber-500", gradient: "from-amber-500 to-orange-500" },
  { id: "e2", month: "August", title: "Internal Assessment I", term: "Odd Semester", side: "left", angle: 150, color: "text-amber-500", bg: "bg-amber-500", gradient: "from-amber-500 to-orange-500" },
  { id: "e3", month: "September", title: "Mid-semester evaluation", term: "Odd Semester", side: "left", angle: 180, color: "text-amber-500", bg: "bg-amber-500", gradient: "from-amber-500 to-orange-500" },
  { id: "e4", month: "October", title: "Internal Assessment II", term: "Odd Semester", side: "left", angle: 210, color: "text-amber-500", bg: "bg-amber-500", gradient: "from-amber-500 to-orange-500" },
  { id: "e5", month: "November", title: "End-semester examinations", term: "Odd Semester", side: "left", angle: 240, color: "text-amber-500", bg: "bg-amber-500", gradient: "from-amber-500 to-orange-500" },
  
  // EVEN SEMESTER
  { id: "e6", month: "December", title: "Commencement of classes", term: "Even Semester", side: "right", angle: 60, color: "text-blue-500", bg: "bg-blue-500", gradient: "from-blue-500 to-indigo-500" },
  { id: "e7", month: "January", title: "Internal Assessment I", term: "Even Semester", side: "right", angle: 30, color: "text-blue-500", bg: "bg-blue-500", gradient: "from-blue-500 to-indigo-500" },
  { id: "e8", month: "February", title: "Mid-semester evaluation", term: "Even Semester", side: "right", angle: 0, color: "text-blue-500", bg: "bg-blue-500", gradient: "from-blue-500 to-indigo-500" },
  { id: "e9", month: "March", title: "Internal Assessment II", term: "Even Semester", side: "right", angle: 330, color: "text-blue-500", bg: "bg-blue-500", gradient: "from-blue-500 to-indigo-500" },
  { id: "e10", month: "April–May", title: "End-semester examinations", term: "Even Semester", side: "right", angle: 300, color: "text-blue-500", bg: "bg-blue-500", gradient: "from-blue-500 to-indigo-500" },
];

export default function OrbitCalendar() {
  const [activeEvent, setActiveEvent] = useState<CalendarEvent | null>(EVENTS[0]);
  const [isInteracting, setIsInteracting] = useState(false);

  // Automatically cycle through events if the user is not interacting
  useEffect(() => {
    if (isInteracting) return;
    
    const interval = setInterval(() => {
      setActiveEvent(prev => {
        if (!prev) return EVENTS[0];
        const currentIndex = EVENTS.findIndex(e => e.id === prev.id);
        return EVENTS[(currentIndex + 1) % EVENTS.length];
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [isInteracting]);

  // Radius of the circle
  const orbitRadius = 220; 

  const getPosition = (angle: number) => {
    const rad = (angle * Math.PI) / 180;
    // x = r * cos(theta), y = -r * sin(theta) because SVG y goes down
    const x = Math.cos(rad) * orbitRadius;
    const y = -Math.sin(rad) * orbitRadius;
    return { x, y };
  };

  const getIconForEvent = (title: string, colorClass: string) => {
    if (title.toLowerCase().includes("commencement")) return <CalendarDays className={`w-4 h-4 ${colorClass}`} />;
    if (title.toLowerCase().includes("assessment")) return <Clock className={`w-4 h-4 ${colorClass}`} />;
    if (title.toLowerCase().includes("evaluation")) return <Target className={`w-4 h-4 ${colorClass}`} />;
    if (title.toLowerCase().includes("examinations")) return <Flag className={`w-4 h-4 ${colorClass}`} />;
    return <Calendar className={`w-4 h-4 ${colorClass}`} />;
  };

  return (
    <div 
      className="w-full flex justify-center items-center py-12 overflow-hidden bg-slate-50 dark:bg-slate-950/50 rounded-3xl border border-slate-200 dark:border-slate-800"
      onMouseEnter={() => setIsInteracting(true)}
      onMouseLeave={() => setIsInteracting(false)}
    >
      
      {/* Outer Orbit Container */}
      <div className="relative w-[500px] h-[500px] flex justify-center items-center scale-75 sm:scale-90 md:scale-100 transition-transform">
        
        {/* The SVG Rings */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500">
          <defs>
            <linearGradient id="oddGradient" x1="0%" y1="100%" x2="0%" y2="0%">
              <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#f97316" stopOpacity="0.8" />
            </linearGradient>
            <linearGradient id="evenGradient" x1="100%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#6366f1" stopOpacity="0.2" />
            </linearGradient>
          </defs>

          {/* Background Dashed Ring */}
          <circle cx="250" cy="250" r={orbitRadius} fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" className="text-slate-200 dark:text-slate-800" />
          
          {/* Active Left Semicircle (Odd) */}
          <path 
            d={`M 250 ${250 - orbitRadius} A ${orbitRadius} ${orbitRadius} 0 0 0 250 ${250 + orbitRadius}`}
            fill="none" 
            stroke="url(#oddGradient)" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
          
          {/* Active Right Semicircle (Even) */}
          <path 
            d={`M 250 ${250 - orbitRadius} A ${orbitRadius} ${orbitRadius} 0 0 1 250 ${250 + orbitRadius}`}
            fill="none" 
            stroke="url(#evenGradient)" 
            strokeWidth="4" 
            strokeLinecap="round"
          />
        </svg>

        {/* The Center Dashboard Hub */}
        <div 
          className="absolute z-10 w-[260px] h-[260px] rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-md shadow-2xl border-4 border-white dark:border-slate-800 flex flex-col justify-center items-center text-center p-6 overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {activeEvent ? (
              <motion.div
                key={activeEvent.id}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col items-center w-full"
              >
                <div className={`px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase mb-3 ${activeEvent.bg} text-white shadow-md`}>
                  {activeEvent.term}
                </div>
                
                <h3 className={`text-3xl font-black tracking-tighter leading-none mb-2 ${activeEvent.color}`}>
                  {activeEvent.month}
                </h3>
                
                <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-tight">
                  {activeEvent.title}
                </p>
                
                <div className="mt-4 opacity-50">
                  {getIconForEvent(activeEvent.title, activeEvent.color)}
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="default"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center opacity-50"
              >
                <Calendar className="w-12 h-12 text-slate-400 mb-3" />
                <p className="text-sm font-bold text-slate-500">Hover over any event to view details</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Orbit Nodes */}
        {EVENTS.map((ev) => {
          const { x, y } = getPosition(ev.angle);
          const isActive = activeEvent?.id === ev.id;
          
          return (
            <motion.div
              key={ev.id}
              className="absolute z-20"
              style={{
                left: `calc(50% + ${x}px)`,
                top: `calc(50% + ${y}px)`,
                transform: "translate(-50%, -50%)",
              }}
              onHoverStart={() => setActiveEvent(ev)}
            >
              {/* Node Tooltip Label (Visible on large screens) */}
              <div 
                className={`absolute top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 pointer-events-none transition-all duration-300 ${
                  ev.side === "left" 
                    ? "right-full mr-4 flex-row-reverse" 
                    : "left-full ml-4"
                } ${isActive ? "opacity-100 scale-100" : "opacity-60 scale-95"}`}
              >
                <span className={`text-xs font-bold whitespace-nowrap px-2.5 py-1 rounded-md shadow-sm border ${
                  isActive 
                    ? `bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700 ${ev.color}`
                    : "bg-slate-100 dark:bg-slate-900 border-transparent text-slate-600 dark:text-slate-400"
                }`}>
                  {ev.month}
                </span>
                {isActive && (
                  <ArrowRight className={`w-4 h-4 ${ev.color} ${ev.side === "left" ? "rotate-180" : ""}`} />
                )}
              </div>

              {/* The Glowing Dot */}
              <button
                className={`relative w-6 h-6 rounded-full flex items-center justify-center transition-transform hover:scale-125 focus:outline-none ${
                  isActive ? "scale-125" : ""
                }`}
                onClick={() => setActiveEvent(ev)}
                aria-label={`View details for ${ev.month}`}
              >
                {/* Ping animation effect behind the active dot */}
                {isActive && (
                  <span className={`absolute inset-0 rounded-full animate-ping opacity-50 ${ev.bg}`} />
                )}
                
                {/* The Dot itself */}
                <div className={`w-3 h-3 rounded-full shadow-lg ${isActive ? ev.bg : "bg-slate-300 dark:bg-slate-700"}`} />
              </button>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
