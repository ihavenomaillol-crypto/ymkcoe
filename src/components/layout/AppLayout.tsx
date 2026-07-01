import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { useScrollReveal } from "@/hooks/use-scroll-reveal";

export function AppLayout({ children, transparentBg = false }: { children: React.ReactNode; transparentBg?: boolean }) {
  const scrollRootRef = useScrollReveal();

  return (
    <div className={`fixed inset-0 flex flex-col text-foreground overflow-hidden ${
      transparentBg ? "bg-transparent" : "bg-background"
    }`}>
      {/* Sticky Navbar */}
      <div className="flex-none z-50">
        <Navbar />
      </div>

      {/* Scrollable content area */}
      <main ref={scrollRootRef} className="flex-1 overflow-y-auto w-full flex flex-col">
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </main>
    </div>
  );
}
