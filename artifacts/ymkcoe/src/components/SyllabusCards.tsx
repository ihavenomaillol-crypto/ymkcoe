import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Clock, ChevronDown, Layers, FileText, X } from "lucide-react";
import { SYLLABUS_DATA, Subject } from "@/components/AcademicTree";

const SEMESTERS = [1, 2, 3, 4, 5, 6, 7, 8];

const MOCK_MODULES = [
  { title: "Unit 1: Introduction", content: "Overview of fundamental concepts, historical background, and scope of the subject in modern engineering." },
  { title: "Unit 2: Core Principles", content: "Detailed analysis of theoretical foundations, mathematical models, and governing laws." },
  { title: "Unit 3: Advanced Topics", content: "Exploration of complex scenarios, modern techniques, optimization, and industry applications." },
  { title: "Unit 4: Practical Applications", content: "Hands-on problem solving, case studies, project-based learning, and real-world implementations." }
];

function ModuleAccordion({ modules, theme }: { modules: typeof MOCK_MODULES, theme: any }) {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {modules.map((mod, i) => {
        const isOpen = expandedIndex === i;
        return (
          <div key={i} className="group bg-white dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden hover:border-slate-300 dark:hover:border-slate-700 transition-colors">
            <button
              onClick={() => setExpandedIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between p-4 font-bold text-sm text-slate-800 dark:text-slate-200 text-left outline-none"
            >
              <span className={theme.text}>{mod.title}</span>
              <ChevronDown className={`w-4 h-4 shrink-0 text-slate-400 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 pt-1 text-sm text-slate-600 dark:text-slate-400 leading-relaxed border-t border-slate-100 dark:border-slate-800/50 mt-2">
                    {mod.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

interface SyllabusCardsProps {
  dept: {
    id: string;
    name: string;
    color: string;
  };
}

export default function SyllabusCards({ dept }: SyllabusCardsProps) {
  const [activeSem, setActiveSem] = useState<number>(1);
  const [expandedSubject, setExpandedSubject] = useState<string | null>(null);
  
  const deptId = dept.id || "cse";
  const color = dept.color || "blue";

  const themeColors: Record<string, { primary: string; text: string; bg: string; glow: string; border: string; }> = {
    blue: { primary: "from-blue-600 to-indigo-600", text: "text-blue-600", bg: "bg-blue-600", glow: "shadow-[0_0_15px_rgba(59,130,246,0.3)]", border: "border-blue-200" },
    violet: { primary: "from-violet-600 to-fuchsia-600", text: "text-violet-600", bg: "bg-violet-600", glow: "shadow-[0_0_15px_rgba(139,92,246,0.3)]", border: "border-violet-200" },
    emerald: { primary: "from-emerald-600 to-teal-600", text: "text-emerald-600", bg: "bg-emerald-600", glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]", border: "border-emerald-200" },
    orange: { primary: "from-orange-600 to-amber-600", text: "text-orange-600", bg: "bg-orange-600", glow: "shadow-[0_0_15px_rgba(249,115,22,0.3)]", border: "border-orange-200" }
  };

  const theme = themeColors[color] || themeColors.blue;
  const currentSyllabus = SYLLABUS_DATA[deptId] || SYLLABUS_DATA.cse;
  const activeSemesterData = currentSyllabus[activeSem];
  const subjects = activeSemesterData?.subjects || [];

  const getTypeStyle = (type: Subject["type"]) => {
    switch (type) {
      case "Core": return "bg-primary/10 text-primary border-primary/20";
      case "Elective": return "bg-amber-500/10 text-amber-600 border-amber-500/20";
      case "Lab": return "bg-emerald-500/10 text-emerald-600 border-emerald-500/20";
      case "Project": return "bg-indigo-500/10 text-indigo-600 border-indigo-500/20";
      default: return "bg-slate-500/10 text-slate-600 border-slate-500/20";
    }
  };

  return (
    <div className="space-y-8 relative">
      {/* Semester Selector */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-slate-800">
        {SEMESTERS.map((sem) => (
          <button
            key={sem}
            onClick={() => {
              setActiveSem(sem);
              setExpandedSubject(null);
            }}
            className={`px-5 py-2.5 rounded-full font-bold text-sm transition-all whitespace-nowrap border ${
              activeSem === sem
                ? `bg-slate-900 border-slate-900 text-white shadow-md dark:bg-white dark:border-white dark:text-slate-900`
                : "bg-white border-slate-200 text-slate-600 hover:border-slate-400 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-400 dark:hover:text-slate-200"
            }`}
          >
            Semester {sem}
          </button>
        ))}
      </div>

      {/* Grid of Subjects */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {subjects.map((sub) => (
          <div key={sub.code} className="relative w-full h-[220px]">
            <AnimatePresence>
              {expandedSubject !== sub.code && (
                <motion.div
                  layoutId={`card-${sub.code}`}
                  onClick={() => setExpandedSubject(sub.code)}
                  className="group absolute inset-0 cursor-pointer"
                  style={{ perspective: "1500px" }}
                >
                  <div
                    className="w-full h-full relative transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]"
                  >
                    {/* FRONT FACE */}
                    <div className="absolute inset-0 [backface-visibility:hidden] bg-white dark:bg-slate-950 rounded-2xl p-6 border border-slate-200 dark:border-slate-800 shadow-md flex flex-col justify-between">
                      <div className="flex justify-between items-start mb-4">
                        <span className="font-mono text-[10px] font-bold text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-900 px-2 py-1 rounded-md">
                          {sub.code}
                        </span>
                        <span className={`inline-flex px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${getTypeStyle(sub.type)}`}>
                          {sub.type}
                        </span>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 leading-tight mb-2 line-clamp-3">
                          {sub.name}
                        </h3>
                      </div>

                      <div className="flex justify-between items-end mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80">
                        <div className={`p-2 rounded-xl bg-slate-50 dark:bg-slate-900 ${theme.text}`}>
                          <BookOpen className="w-5 h-5" />
                        </div>
                        <div className="flex items-center gap-1.5 font-bold text-sm text-slate-700 dark:text-slate-300">
                          <Clock className="w-4 h-4 opacity-50" />
                          {sub.credits} Credits
                        </div>
                      </div>
                    </div>

                    {/* BACK FACE */}
                    <div
                      className={`absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] bg-gradient-to-br ${theme.primary} rounded-2xl p-6 shadow-lg text-white flex flex-col justify-center items-center text-center`}
                    >
                      <Layers className="w-10 h-10 mb-4 opacity-80" />
                      <h4 className="font-bold text-lg mb-2">Explore Modules</h4>
                      <p className="text-xs text-white/80 leading-relaxed mb-6">
                        Click to expand and view the detailed course structure, units, and learning objectives for this subject.
                      </p>
                      <span className="inline-flex items-center justify-center bg-white text-slate-900 px-4 py-2 rounded-full text-xs font-extrabold tracking-wide hover:scale-105 transition-transform shadow-md">
                        View Syllabus
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      {/* EXPANDED MODAL OVERLAY */}
      <AnimatePresence>
        {expandedSubject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-12">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedSubject(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            
            {(() => {
              // Find active subject, or fallback to something so exit animation doesn't crash
              const sub = subjects.find(s => s.code === expandedSubject) || currentSyllabus[1]?.subjects[0];
              if (!sub) return null;
              
              return (
                <motion.div
                  layoutId={`card-${sub.code}`}
                  className={`relative z-10 w-full max-w-5xl max-h-[90vh] overflow-y-auto bg-white dark:bg-slate-950 rounded-2xl shadow-2xl border-2 ${theme.border} flex flex-col lg:flex-row`}
                >
                  {/* Header / Left Side (mimics front face) */}
                  <div className={`p-8 bg-gradient-to-br ${theme.primary} text-white lg:w-1/3 flex flex-col justify-between relative overflow-hidden shrink-0`}>
                    <div className="absolute top-0 right-0 p-4 opacity-20">
                      <Layers className="w-32 h-32 transform rotate-12" />
                    </div>
                    
                    <div className="relative z-10 space-y-4">
                      <div className="flex justify-between items-start">
                        <span className="bg-white/20 border border-white/30 text-white text-[10px] font-extrabold uppercase px-3 py-1 rounded-full tracking-widest">
                          {sub.type}
                        </span>
                        <button
                          onClick={() => setExpandedSubject(null)}
                          className="p-1.5 bg-black/20 hover:bg-black/40 rounded-full transition-colors"
                        >
                          <X className="w-5 h-5 text-white" />
                        </button>
                      </div>
                      <div>
                        <p className="font-mono text-sm font-bold text-white/70 mb-1">{sub.code}</p>
                        <h3 className="text-2xl font-black leading-tight">{sub.name}</h3>
                      </div>
                    </div>

                    <div className="relative z-10 mt-12 lg:mt-24">
                      <div className="inline-flex items-center gap-3 bg-white/10 px-5 py-3 rounded-xl border border-white/20">
                        <Clock className="w-6 h-6 opacity-70" />
                        <div>
                          <span className="block text-[10px] uppercase font-bold tracking-widest text-white/70">Credits</span>
                          <span className="block text-2xl font-black">{sub.credits}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Accordion / Right Side */}
                  <div className="p-6 lg:p-8 lg:w-2/3 bg-slate-50 dark:bg-slate-900/50">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-800 dark:text-slate-200 mb-6 border-b border-slate-200 dark:border-slate-800 pb-3">
                      <FileText className={`w-5 h-5 ${theme.text}`} />
                      Detailed Course Modules
                    </div>
                    
                    <ModuleAccordion modules={MOCK_MODULES} theme={theme} />
                  </div>
                </motion.div>
              );
            })()}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
