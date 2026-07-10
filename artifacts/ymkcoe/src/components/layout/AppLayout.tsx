import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";
import { motion } from "framer-motion";

export function AppLayout({ children, transparentBg = false }: { children: React.ReactNode; transparentBg?: boolean }) {
  const scrollRootRef = useScrollReveal();

  return (
    <div
      className={`fixed inset-0 flex flex-col text-foreground overflow-hidden ${
        transparentBg ? "bg-transparent" : "bg-background"
      }`}
    >
      {/* Sticky Navbar */}
      <div className="flex-none z-50">
        <Navbar />
      </div>

      {/* Infinite Admissions Ticker */}
      <div className="flex-none w-full bg-primary text-primary-foreground overflow-hidden py-2 shadow-sm border-b border-primary/20 z-40">
        <div className="flex whitespace-nowrap items-center w-full">
          <motion.div
            className="flex gap-8 items-center text-xs md:text-sm font-bold tracking-wide min-w-max"
            animate={{ x: ["0%", "-50%"] }}
            transition={{ repeat: Infinity, ease: "linear", duration: 25 }}
          >
            {[...Array(6)].map((_, i) => (
              <span key={i} className="flex items-center gap-8">
                <span>🎓 ADMISSIONS OPEN 2026-27 FOR B.Tech PROGRAMS</span>
                <span className="text-accent">•</span>
                <span>APPLY NOW FOR CSE, AI&DS, IT, ENTC</span>
                <span className="text-accent">•</span>
                <span>DTE CHOICE CODE: 16352</span>
                <span className="text-accent">•</span>
              </span>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scrollable content area */}
      <main
        ref={scrollRootRef}
        className="flex-1 overflow-y-auto overflow-x-hidden w-full flex flex-col"
        style={{ WebkitOverflowScrolling: "touch" } as React.CSSProperties}
      >
        <div className="flex-1 min-w-0">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
