import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, BookOpen, Clock, ChevronRight, ChevronLeft, Layers, FileText } from "lucide-react";
import { SYLLABUS_DATA, Subject } from "@/components/AcademicTree";

const YEARS = [
  { label: "1st Year", val: 1, sems: [1, 2], name: "First Year (FY)" },
  { label: "2nd Year", val: 2, sems: [3, 4], name: "Second Year (SY)" },
  { label: "3rd Year", val: 3, sems: [5, 6], name: "Third Year (TY)" },
  { label: "4th Year", val: 4, sems: [7, 8], name: "Final Year (B.Tech)" }
];

const MOCK_MODULES = [
  { title: "Unit 1: Introduction", content: "Overview of fundamental concepts, historical background, and scope." },
  { title: "Unit 2: Core Principles", content: "Detailed analysis of theoretical foundations and governing laws." },
  { title: "Unit 3: Advanced Topics", content: "Exploration of complex scenarios, modern techniques, and industry applications." },
  { title: "Unit 4: Practical Applications", content: "Hands-on problem solving, case studies, and real-world implementations." }
];

interface SyllabusTreeProps {
  dept: {
    id: string;
    name: string;
    color: string;
  };
}

export default function SyllabusTree({ dept }: SyllabusTreeProps) {
  const [isBtechExpanded, setIsBtechExpanded] = useState(false);
  const [expandedYear, setExpandedYear] = useState<number | null>(null);
  const [expandedSemester, setExpandedSemester] = useState<number | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const deptId = dept.id || "cse";
  const color = dept.color || "blue";

  const themeColors: Record<string, { primary: string; text: string; bg: string; glow: string; badgeBg: string; badgeText: string; }> = {
    blue: { primary: "from-blue-600 to-indigo-600", text: "text-blue-500", bg: "bg-blue-500", glow: "shadow-[0_0_15px_rgba(59,130,246,0.5)]", badgeBg: "bg-blue-50 dark:bg-blue-950/40", badgeText: "text-blue-600 dark:text-blue-400" },
    violet: { primary: "from-violet-600 to-fuchsia-600", text: "text-violet-500", bg: "bg-violet-500", glow: "shadow-[0_0_15px_rgba(139,92,246,0.5)]", badgeBg: "bg-violet-50 dark:bg-violet-950/40", badgeText: "text-violet-600 dark:text-violet-400" },
    emerald: { primary: "from-emerald-600 to-teal-600", text: "text-emerald-500", bg: "bg-emerald-500", glow: "shadow-[0_0_15px_rgba(16,185,129,0.5)]", badgeBg: "bg-emerald-50 dark:bg-emerald-950/40", badgeText: "text-emerald-600 dark:text-emerald-400" },
    orange: { primary: "from-orange-600 to-amber-600", text: "text-orange-500", bg: "bg-orange-500", glow: "shadow-[0_0_15px_rgba(249,115,22,0.5)]", badgeBg: "bg-orange-50 dark:bg-orange-950/40", badgeText: "text-orange-600 dark:text-orange-400" }
  };

  const theme = themeColors[color] || themeColors.blue;
  const currentSyllabus = SYLLABUS_DATA[deptId] || SYLLABUS_DATA.cse;

  const handleBtechClick = () => {
    setIsBtechExpanded(!isBtechExpanded);
    if (!isBtechExpanded) {
      setTimeout(() => scrollRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300);
    }
  };

  const handleYearClick = (yearVal: number) => {
    if (expandedYear === yearVal) {
      setExpandedYear(null);
      setExpandedSemester(null);
      setSelectedSubject(null);
    } else {
      setExpandedYear(yearVal);
      const firstSem = yearVal === 1 ? 1 : yearVal === 2 ? 3 : yearVal === 3 ? 5 : 7;
      setExpandedSemester(firstSem);
      setSelectedSubject(null);
    }
  };

  const handleSemesterClick = (semVal: number) => {
    if (expandedSemester === semVal) {
      setExpandedSemester(null);
      setSelectedSubject(null);
    } else {
      setExpandedSemester(semVal);
      const subjects = currentSyllabus[semVal]?.subjects;
      if (subjects && subjects.length > 0) {
        setSelectedSubject(subjects[0].code);
      }
    }
  };

  const activeSubjects = expandedSemester ? currentSyllabus[expandedSemester]?.subjects || [] : [];
  const activeSubjectData = activeSubjects.find(s => s.code === selectedSubject);

  return (
    <div className="space-y-12">
      <div className="w-full overflow-x-auto pb-6 scrollbar-thin scrollbar-thumb-slate-300 dark:scrollbar-thumb-slate-700">
        <div ref={scrollRef} className="flex flex-row items-center justify-start w-max px-4 py-8 md:px-12 pr-32">
          
          {/* BTECH Node */}
          <div className="relative z-10 shrink-0">
            <button
              onClick={handleBtechClick}
              className={`relative px-6 py-4 rounded-2xl font-extrabold text-lg tracking-wider transition-all duration-300 flex flex-row items-center gap-3 border shadow-md hover:scale-105 active:scale-95 ${
                isBtechExpanded 
                  ? `bg-slate-900 border-slate-800 text-white dark:bg-white dark:text-slate-900 dark:border-white ${theme.glow}` 
                  : "bg-white border-slate-200 text-slate-800 dark:bg-slate-950 dark:border-slate-800 dark:text-slate-200"
              }`}
            >
              <div className="flex flex-col items-center gap-1">
                <GraduationCap className={`h-6 w-6 ${isBtechExpanded ? theme.text : "text-slate-500"}`} />
                <span>BTECH</span>
              </div>
              {isBtechExpanded ? <ChevronLeft className="h-5 w-5 opacity-70" /> : <ChevronRight className="h-5 w-5 opacity-70" />}
            </button>
          </div>

          <div className="w-12 h-px relative shrink-0">
            <div className={`absolute top-1/2 left-0 right-0 h-0.5 -translate-y-1/2 transition-colors duration-500 ${isBtechExpanded ? theme.bg : "bg-slate-300 dark:bg-slate-800"}`} />
          </div>

          {/* YEARS LEVEL */}
          <div className="flex-1">
            <AnimatePresence initial={false}>
              {isBtechExpanded && (
                <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: "auto", opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="overflow-hidden">
                  <div className="flex flex-col gap-8 w-max relative">
                    <div className="absolute top-0 bottom-0 left-0 w-8 z-0">
                       <div className={`absolute top-[40px] bottom-1/2 left-4 w-0.5 transition-colors duration-500 ${expandedYear === 1 || expandedYear === 2 ? theme.bg : "bg-slate-300 dark:bg-slate-800"}`} />
                       <div className={`absolute top-1/2 bottom-[40px] left-4 w-0.5 transition-colors duration-500 ${expandedYear === 3 || expandedYear === 4 ? theme.bg : "bg-slate-300 dark:bg-slate-800"}`} />
                    </div>

                    {YEARS.map((year, idx) => {
                      const isActiveYear = expandedYear === year.val;
                      return (
                        <div key={idx} className="flex flex-row items-start min-h-[80px] relative z-10 pl-8">
                           <div className={`absolute left-4 w-4 top-[40px] h-0.5 -translate-y-1/2 transition-colors duration-500 ${isActiveYear ? theme.bg : "bg-slate-300 dark:bg-slate-800"}`} />
                           <button
                             onClick={() => handleYearClick(year.val)}
                             className={`relative w-[140px] py-4 mt-2 rounded-xl font-bold text-sm tracking-wide transition-all duration-300 border flex flex-col items-center gap-1 shadow-sm shrink-0 hover:translate-x-1 ${
                               isActiveYear ? `bg-white border-slate-900 text-slate-900 ${theme.glow}` : "bg-slate-50 border-slate-200 text-slate-600"
                             }`}
                           >
                             <span className="text-[10px] tracking-widest uppercase opacity-60">{year.name}</span>
                             <span className="text-base font-extrabold">{year.label}</span>
                           </button>

                           {/* SEMESTERS LEVEL */}
                           <div className="overflow-hidden flex flex-row items-start h-full">
                             <AnimatePresence initial={false}>
                               {isActiveYear && (
                                 <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: "auto", opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="flex flex-row items-start h-full pt-2">
                                    <div className={`w-8 h-0.5 mt-10 transition-colors duration-500 shrink-0 ${theme.bg}`} />
                                    
                                    <div className="flex flex-col gap-4 relative pl-4 border-l-2 border-slate-200 dark:border-slate-800 ml-4">
                                      {year.sems.map((semVal) => {
                                        const isSemActive = expandedSemester === semVal;
                                        return (
                                          <div key={semVal} className="flex flex-row items-start">
                                            <div className={`absolute -left-[18px] w-4 h-0.5 mt-5 transition-colors duration-500 ${isSemActive ? theme.bg : "bg-slate-300"}`} />
                                            <button
                                              onClick={() => handleSemesterClick(semVal)}
                                              className={`px-4 py-2 w-[100px] rounded-lg text-xs font-bold transition-all duration-300 border flex items-center justify-center shadow-sm hover:translate-x-1 shrink-0 ${
                                                isSemActive ? `bg-slate-900 border-slate-800 text-white ${theme.glow}` : "bg-white border-slate-200 text-slate-700"
                                              }`}
                                            >
                                              Sem {semVal}
                                            </button>

                                            {/* SUBJECTS LEVEL */}
                                            <div className="overflow-hidden flex flex-row items-start">
                                              <AnimatePresence initial={false}>
                                                {isSemActive && (
                                                  <motion.div initial={{ width: 0, opacity: 0 }} animate={{ width: "auto", opacity: 1 }} exit={{ width: 0, opacity: 0 }} className="flex flex-row items-start pl-6 relative">
                                                    <div className={`absolute left-0 top-5 w-6 h-0.5 transition-colors duration-500 ${theme.bg}`} />
                                                    <div className="flex flex-col gap-2 relative border-l-2 border-slate-200 pl-4 py-2">
                                                      {activeSubjects.map((sub) => {
                                                        const isSubActive = selectedSubject === sub.code;
                                                        return (
                                                          <div key={sub.code} className="flex flex-row items-center relative group">
                                                            <div className={`absolute -left-[18px] w-4 h-0.5 transition-colors duration-300 ${isSubActive ? theme.bg : "bg-transparent group-hover:bg-slate-300"}`} />
                                                            <button
                                                              onClick={() => setSelectedSubject(sub.code)}
                                                              className={`text-left px-3 py-2 w-[220px] rounded-md text-xs font-semibold transition-all duration-200 border shadow-sm ${
                                                                isSubActive ? `bg-white border-slate-400 shadow-md translate-x-1 ${theme.text}` : "bg-slate-50 border-slate-200 text-slate-600 hover:bg-white hover:border-slate-300"
                                                              }`}
                                                            >
                                                              <div className="truncate w-full" title={sub.name}>{sub.name}</div>
                                                              <div className="text-[9px] text-slate-400 mt-0.5 font-mono">{sub.code}</div>
                                                            </button>
                                                          </div>
                                                        );
                                                      })}
                                                    </div>
                                                  </motion.div>
                                                )}
                                              </AnimatePresence>
                                            </div>
                                          </div>
                                        );
                                      })}
                                    </div>
                                 </motion.div>
                               )}
                             </AnimatePresence>
                           </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* SYLLABUS DETAILS PANE */}
          <div className="shrink-0 w-[500px] ml-12 transition-all duration-500 flex items-start self-center h-auto">
            <AnimatePresence mode="wait">
              {isBtechExpanded && expandedSemester && selectedSubject && activeSubjectData && (
                <motion.div
                  key={selectedSubject}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full bg-white dark:bg-slate-950 rounded-2xl overflow-hidden shadow-lg border border-slate-200 dark:border-slate-800 flex flex-col"
                >
                  <div className={`p-5 bg-gradient-to-r ${theme.primary} text-white flex items-start justify-between gap-4 shrink-0`}>
                    <div className="space-y-2 flex-1">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="bg-white/20 text-white border border-white/30 text-[10px] font-extrabold uppercase px-2.5 py-0.5 rounded-full tracking-wider">
                          {activeSubjectData.code}
                        </span>
                        <span className="bg-white/10 text-white border border-white/20 text-[10px] font-bold px-2 py-0.5 rounded-full">
                          {activeSubjectData.type}
                        </span>
                      </div>
                      <h3 className="text-xl font-black tracking-tight leading-tight">
                        {activeSubjectData.name}
                      </h3>
                    </div>
                    <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-xl text-center shrink-0">
                      <div className="text-[10px] uppercase font-bold tracking-widest text-white/70">Credits</div>
                      <div className="text-2xl font-black">{activeSubjectData.credits}</div>
                    </div>
                  </div>
                  <div className="p-5 flex-1 bg-slate-50/50">
                    <div className="flex items-center gap-2 text-sm font-bold text-slate-800 mb-4 border-b border-slate-200 pb-2">
                      <FileText className={`w-4 h-4 ${theme.text}`} />
                      Course Modules
                    </div>
                    <div className="space-y-4">
                      {MOCK_MODULES.map((mod, i) => (
                        <div key={i} className="bg-white rounded-lg p-3.5 border border-slate-200 shadow-sm">
                          <h4 className={`text-xs font-bold mb-1.5 ${theme.text}`}>{mod.title}</h4>
                          <p className="text-xs text-slate-600 leading-relaxed">{mod.content}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}
