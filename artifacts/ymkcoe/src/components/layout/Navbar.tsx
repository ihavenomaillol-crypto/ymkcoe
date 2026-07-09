import { Link, useLocation } from "wouter";
import { Menu, X, ChevronDown, Phone, Mail, Bell, Sun, Moon, BookOpen, Users } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DEPARTMENTS, getDepartmentHref } from "@/lib/departments";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetNews } from "@workspace/api-client-react";
import { useTheme } from "next-themes";

// ── Approvals config ───────────────────────────────────────────────────
const APPROVALS = [
  { label: "Govt. of Maharashtra Affiliation", href: "/approvals?doc=mh-affiliation" },
  { label: "DTE GR", href: "/approvals?doc=dte-gr" },
  { label: "EOA – AICTE", href: "/approvals?doc=eoa-aicte" },
  { label: "AICTE Affiliation", href: "/approvals?doc=aicte-affiliation" },
  { label: "University Affiliation", href: "/approvals?doc=university-affiliation" },
];

// ── Student's Corner ───────────────────────────────────────────────────
const STUDENT_CORNER = [
  { label: "Achievements", href: "/students/achievements" },
  { 
    label: "Hostel", 
    href: "/students/hostels",
    children: [
      { label: "Girls' Hostel", href: "/students/girls-hostel" },
      { label: "Boys' Hostel",  href: "/students/boys-hostel" },
    ]
  },
  { label: "Clubs", href: "/students/clubs" },
  { label: "Student Association", href: "/students/association" },
  { label: "Alumni", href: "/students/alumni" },
];

// ── About Us & Governance ─────────────────────────────────────────────
const ABOUT_US = [
  { label: "About YMKCOE", href: "/about" },
  {
    label: "Governance",
    href: "#",
    children: [
      { label: "Governing Body", href: "/governance/governing-body" },
      { label: "Student Council", href: "/governance/student-council" },
      { label: "Student Grievance Redressal Cell", href: "/governance/student-grievance-redressal-cell" },
      { label: "Anti Ragging Cell", href: "/governance/anti-ragging-cell" },
      { label: "Mandatory Disclosure", href: "/governance/mandatory-disclosure-1" },
      { label: "College Development Committee", href: "/governance/college-development-committee" },
      { label: "Finance Committee", href: "/governance/finance-committee" },
      { label: "Internal Quality Assurance Cell", href: "/governance/internal-quality-assurance-cell" },
      { label: "Grievance Redressal Cell", href: "/governance/grievance-redressal-cell" },
      { label: "College Student Council", href: "/governance/college-student-council" },
      { label: "Student Development Cell", href: "/governance/student-development-cell" },
      { label: "Student Grievance Form", href: "/governance/student-grievance-form" },
      { label: "Mandatory Disclosure (2)", href: "/governance/mandatory-disclosure-2" },
      { label: "Balance Sheet", href: "/governance/balance-sheet" },
      { label: "Grievance Redressal Committee", href: "/governance/grievance-redressal-committee" },
      { label: "Women Grievance Redressal Committee", href: "/governance/women-grievance-redressal-committee" },
      { label: "ICC Women Grievance Redressal Cell 2025-2026", href: "/governance/icc-women-grievance-cell" },
      { label: "Anti Ragging Squad", href: "/governance/anti-ragging-squad" },
      { label: "SC ST Cell", href: "/governance/sc-st-cell" },
      { label: "Caste Based Discrimination Cell", href: "/governance/caste-based-discrimination-cell" },
      { label: "Internal Complaint Committee", href: "/governance/internal-complaint-committee" },
      { label: "SC-ST Cell Advisory Committee", href: "/governance/sc-st-cell-advisory" },
      { label: "Equal Opportunity Cell", href: "/governance/equal-opportunity-cell" },
      { label: "Divyang Cell", href: "/governance/divyang-cell" },
      { label: "FRA", href: "/governance/fra" },
    ]
  }
];

export function Navbar() {
  const [location] = useLocation();
  const { theme, setTheme } = useTheme();
  const { data: news = [] } = useGetNews({ category: "announcement" });
  const recentNews = Array.isArray(news) ? news.slice(0, 5) : [];
  
  const [lastSeenId, setLastSeenId] = useState<number | null>(null);
  const [readIds, setReadIds] = useState<Set<number>>(new Set());
  
  useEffect(() => {
    const storedSeen = localStorage.getItem("lastSeenAnnouncementId");
    if (storedSeen) setLastSeenId(parseInt(storedSeen, 10));

    const storedReads = localStorage.getItem("readAnnouncementIds");
    if (storedReads) {
      try {
        setReadIds(new Set(JSON.parse(storedReads)));
      } catch (e) {}
    }
  }, []);

  const latestId = recentNews.length > 0 ? Math.max(...recentNews.map((n: any) => n.id)) : 0;
  const hasUpdates = recentNews.length > 0 && (lastSeenId === null || latestId > lastSeenId);

  const markAllAsSeen = () => {
    if (latestId > 0) {
      localStorage.setItem("lastSeenAnnouncementId", latestId.toString());
      setLastSeenId(latestId);
    }
  };

  const markItemAsRead = (id: number) => {
    setReadIds(prev => {
      const next = new Set(prev);
      next.add(id);
      localStorage.setItem("readAnnouncementIds", JSON.stringify(Array.from(next)));
      return next;
    });
  };
  
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [activeSubDropdown, setActiveSubDropdown] = useState<string | null>(null);
  const closeDelay = useRef<ReturnType<typeof setTimeout> | null>(null);
  const subCloseDelay = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openMenu = (name: string) => {
    if (closeDelay.current) clearTimeout(closeDelay.current);
    setActiveDropdown(name);
  };
  
  const closeMenu = () => {
    closeDelay.current = setTimeout(() => {
      setActiveDropdown(null);
      setActiveSubDropdown(null);
    }, 800); // 800ms close delay so they disappear after some time, not immediately
  };

  const openSubMenu = (name: string) => {
    if (subCloseDelay.current) clearTimeout(subCloseDelay.current);
    if (closeDelay.current) clearTimeout(closeDelay.current); // also clear parent delay!
    setActiveSubDropdown(name);
  };

  const closeSubMenu = () => {
    subCloseDelay.current = setTimeout(() => {
      setActiveSubDropdown(null);
    }, 800); // 800ms close delay for sub-dropdowns
  };

  const [isOpen,                setIsOpen]               = useState(false);
  const [showMobileDept,        setShowMobileDept]        = useState(false);
  const [showMobileAdmission,   setShowMobileAdmission]   = useState(false);
  const [showMobileApprovals,   setShowMobileApprovals]   = useState(false);
  const [showMobileStudent,     setShowMobileStudent]     = useState(false);
  const [showMobileAbout,       setShowMobileAbout]       = useState(false);

  const navLinksAfter = [
    { href: "/placements",  label: "Placements" },
    { href: "/news",        label: "News & Events" },
    { href: "/media",       label: "Gallery" },
    { href: "/contact",     label: "Contact" },
  ];

  const linkCls = (active: boolean) =>
    `flex items-center justify-center gap-0.5 lg:gap-1 px-1 lg:px-1.5 xl:px-2.5 py-2 rounded-md text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm font-medium transition-colors hover:bg-muted whitespace-nowrap cursor-pointer ${
      active ? "text-accent font-semibold" : "text-foreground"
    }`;

  const unreadNews = recentNews.filter((item: any) => !readIds.has(item.id));

  return (
    <header className="w-full border-b border-border bg-background shadow-sm">
      {/* Top bar */}
      <div className="bg-primary text-primary-foreground py-1 md:py-1.5">
        <div className="w-full px-4 flex justify-between items-center text-xs md:text-sm">
          <div className="flex items-center gap-4">
            <a href="mailto:admission@ymkcoe.com" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Mail className="h-3 w-3" /><span className="hidden md:inline">admission@ymkcoe.com</span>
            </a>
            <a href="tel:+918983683005" className="flex items-center gap-1 hover:text-accent transition-colors">
              <Phone className="h-3 w-3" /><span className="hidden md:inline">+91 89836 83005</span>
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Popover onOpenChange={(open) => { if (open) markAllAsSeen(); }}>
              <PopoverTrigger asChild>
                <button className="relative flex items-center justify-center transition-colors hover:text-accent">
                  <Bell className={`h-4 w-4 md:h-5 md:w-5 ${hasUpdates ? "text-red-500 fill-red-500" : "text-white"}`} />
                  {hasUpdates && (
                    <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500"></span>
                    </span>
                  )}
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 z-[100]" align="end">
                <div className="bg-primary text-primary-foreground px-4 py-2 font-semibold">Latest Updates</div>
                <div className="max-h-[300px] overflow-y-auto">
                  {unreadNews.length > 0 ? unreadNews.map((item: any) => (
                    <div key={item.id} className="p-3 border-b border-border hover:bg-muted transition-colors">
                      <Link href={`/news`} onClick={() => markItemAsRead(item.id)} className="flex items-start gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500 shrink-0 mt-1.5 shadow-sm" />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm line-clamp-1 text-foreground">{item.title}</h4>
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{item.content}</p>
                        </div>
                      </Link>
                    </div>
                  )) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">No unread updates</div>
                  )}
                </div>
              </PopoverContent>
            </Popover>
            <span>DBATU Affiliated</span>
            <span className="hidden md:inline font-semibold text-accent">AICTE Approved | DTE Code: 16352</span>
          </div>
        </div>
      </div>

      {/* Logo + Nav */}
      <div className="w-full px-4 h-16 md:h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 md:gap-3">
          <img src="/ymkcoe_logo.png" alt="YMKCOE Logo" className="h-10 w-auto md:h-12 lg:h-14 xl:h-16 object-contain" />
          <div className="flex flex-col justify-center items-start text-left select-none whitespace-nowrap">
            <span className="text-[8px] md:text-[9px] lg:text-[10px] xl:text-[11px] text-muted-foreground dark:text-slate-300 font-medium leading-none">Indrayani Vidya Mandir's</span>
            <span className="font-bold text-[9px] md:text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm text-primary dark:text-white uppercase tracking-wide leading-tight mt-0.5 md:mt-1">Yashoda Mahadeo Kakade</span>
            <span className="font-bold text-[9px] md:text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm text-primary dark:text-white uppercase tracking-wide leading-tight">College of Engineering</span>
          </div>
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className="hidden lg:flex items-center gap-0.5 xl:gap-1 select-none">
          {/* Home */}
          <Link href="/"><span className={linkCls(location === "/")}>Home</span></Link>

          {/* Departments mega-menu */}
          <div
            className="relative"
            onMouseEnter={() => openMenu('dept')}
            onMouseLeave={closeMenu}
          >
            <Link href="/departments">
              <span className={linkCls(location.startsWith("/department") || location === "/departments")}>
                Departments <ChevronDown className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </span>
            </Link>

            {activeDropdown === 'dept' && (
              <div
                onMouseEnter={() => openMenu('dept')}
                onMouseLeave={closeMenu}
                className="absolute top-full left-1/2 -translate-x-1/2 w-[300px] z-50"
              >
                <div className="h-2 w-full" />
                <div className="w-full bg-background border border-border rounded-xl shadow-xl p-2 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-200">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground px-3 pt-2 pb-1">Departments</p>
                  
                  <Link href="/faculty" onClick={() => setActiveDropdown(null)}>
                    <div className="flex items-center gap-2 px-3 py-2.5 mb-2 rounded-lg text-sm font-semibold text-accent bg-accent/10 hover:bg-accent hover:text-white transition-all cursor-pointer group">
                      <div className="bg-accent/20 group-hover:bg-white/20 p-1.5 rounded-md transition-colors">
                        <Users className="h-4 w-4" />
                      </div>
                      Our Faculty
                    </div>
                  </Link>

                  <div className="h-px bg-border/50 mx-2 mb-2" />
                  {DEPARTMENTS.map((dept) => (
                    <Link
                      key={dept.id}
                      href={getDepartmentHref(dept.id)}
                      onClick={() => setActiveDropdown(null)}
                    >
                      <span className="w-full text-left px-3 py-2.5 rounded-lg transition-all flex items-center gap-2.5 hover:bg-muted group">
                        <span className={`w-2 h-2 rounded-full shrink-0 ${dept.dotColor}`} />
                        <div>
                          <span className={`text-xs font-bold block ${dept.color}`}>{dept.short}</span>
                          <span className="text-[10px] text-muted-foreground leading-tight block">{dept.label}</span>
                        </div>
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* About Us */}
          <div
            className="relative"
            onMouseEnter={() => openMenu('about')}
            onMouseLeave={closeMenu}
          >
            <span className={linkCls(location.startsWith("/about") || location.startsWith("/governance"))}>
              About Us <ChevronDown className="h-3 w-3 md:h-3.5 md:w-3.5" />
            </span>
            {activeDropdown === 'about' && (
              <div
                onMouseEnter={() => openMenu('about')}
                onMouseLeave={closeMenu}
                className="absolute top-full left-1/2 -translate-x-1/2 w-[220px] z-50"
              >
                <div className="h-2 w-full" />
                <div className="w-full bg-background border border-border rounded-lg shadow-lg p-2 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-200">
                  {ABOUT_US.map((item) => {
                    if (item.children) {
                      return (
                        <div 
                          key={item.label} 
                          className="relative"
                          onMouseEnter={() => openSubMenu(item.label)}
                          onMouseLeave={closeSubMenu}
                        >
                          <Link href={item.href} onClick={() => { setActiveDropdown(null); setActiveSubDropdown(null); }}>
                            <span className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent transition-colors text-foreground cursor-pointer">
                              {item.label} <ChevronDown className="h-3 w-3 -rotate-90" />
                            </span>
                          </Link>
                          {activeSubDropdown === item.label && (
                            <div 
                              onMouseEnter={() => openSubMenu(item.label)}
                              onMouseLeave={closeSubMenu}
                              className="absolute left-full top-0 ml-1 w-[240px] z-50 max-w-[calc(100vw-2rem)]"
                            >
                              <div className="w-full max-h-[min(350px,calc(100dvh-120px))] overflow-y-auto bg-background border border-border rounded-lg shadow-lg p-2 flex flex-col gap-1 animate-in fade-in slide-in-from-left-2 duration-200">
                                {item.children.map((sub) => (
                                  <Link key={sub.label + sub.href} href={sub.href} onClick={() => { setActiveDropdown(null); setActiveSubDropdown(null); }}>
                                    <span className="block px-3 py-2 rounded-md text-xs hover:bg-muted hover:text-accent transition-colors text-foreground">
                                      {sub.label}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return (
                      <Link key={item.href} href={item.href} onClick={() => setActiveDropdown(null)}>
                        <span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent transition-colors text-foreground">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Student's Corner */}
          <div
            className="relative"
            onMouseEnter={() => openMenu('student')}
            onMouseLeave={closeMenu}
          >
            <span className={linkCls(location.startsWith("/students"))}>
              Student's Corner <ChevronDown className="h-3 w-3 md:h-3.5 md:w-3.5" />
            </span>
            {activeDropdown === 'student' && (
              <div
                onMouseEnter={() => openMenu('student')}
                onMouseLeave={closeMenu}
                className="absolute top-full left-1/2 -translate-x-1/2 w-[200px] z-50"
              >
                <div className="h-2 w-full" />
                <div className="w-full bg-background border border-border rounded-lg shadow-lg p-2 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-200">
                  {STUDENT_CORNER.map((item) => {
                    if (item.children) {
                      return (
                        <div 
                          key={item.label} 
                          className="relative"
                          onMouseEnter={() => openSubMenu(item.label)}
                          onMouseLeave={closeSubMenu}
                        >
                          <Link href={item.href} onClick={() => { setActiveDropdown(null); setActiveSubDropdown(null); }}>
                            <span className="flex items-center justify-between w-full px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent transition-colors text-foreground cursor-pointer">
                              {item.label} <ChevronDown className="h-3 w-3 -rotate-90" />
                            </span>
                          </Link>
                          {activeSubDropdown === item.label && (
                            <div 
                              onMouseEnter={() => openSubMenu(item.label)}
                              onMouseLeave={closeSubMenu}
                              className="absolute left-full top-0 ml-1 w-[180px] z-50"
                            >
                              <div className="w-full bg-background border border-border rounded-lg shadow-lg p-2 flex flex-col gap-1 animate-in fade-in slide-in-from-left-2 duration-200">
                                {item.children.map((sub) => (
                                  <Link key={sub.href} href={sub.href} onClick={() => { setActiveDropdown(null); setActiveSubDropdown(null); }}>
                                    <span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent transition-colors text-foreground">
                                      {sub.label}
                                    </span>
                                  </Link>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    }
                    return (
                      <Link key={item.href} href={item.href} onClick={() => setActiveDropdown(null)}>
                        <span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent transition-colors text-foreground">
                          {item.label}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Admission Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => openMenu('admission')}
            onMouseLeave={closeMenu}
          >
            <Link href="/admissions">
              <span className={linkCls(location.startsWith("/admissions"))}>
                Admission <ChevronDown className="h-3 w-3 md:h-3.5 md:w-3.5" />
              </span>
            </Link>
            {activeDropdown === 'admission' && (
              <div
                onMouseEnter={() => openMenu('admission')}
                onMouseLeave={closeMenu}
                className="absolute top-full left-1/2 -translate-x-1/2 w-[240px] z-50"
              >
                <div className="h-2 w-full" />
                <div className="w-full bg-background border border-border rounded-lg shadow-lg p-2 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-200">
                  {[
                    { href: "/admissions?tab=eligibility",     label: "Eligibility Criteria" },
                    { href: "/admissions?tab=documents",       label: "Documents Required" },
                    { href: "/admissions?tab=process",         label: "Admission Process" },
                    { href: "/admissions?tab=institute-level", label: "Admission at Institute Level" },
                    { href: "/admissions?tab=tfw-code",        label: "TFW Code" },
                    { href: "/admissions?tab=fee-structure",   label: "Fee Structure" },
                    { href: "/admissions?tab=fra",             label: "FRA" },
                  ].map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setActiveDropdown(null)}>
                      <span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent transition-colors text-foreground">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Approvals Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => openMenu('approvals')}
            onMouseLeave={closeMenu}
          >
            <span className={linkCls(location.startsWith("/approvals"))}>
              Approvals <ChevronDown className="h-3 w-3 md:h-3.5 md:w-3.5" />
            </span>
            {activeDropdown === 'approvals' && (
              <div
                onMouseEnter={() => openMenu('approvals')}
                onMouseLeave={closeMenu}
                className="absolute top-full left-1/2 -translate-x-1/2 w-[260px] z-50"
              >
                <div className="h-2 w-full" />
                <div className="w-full bg-background border border-border rounded-lg shadow-lg p-2 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-200">
                  {APPROVALS.map((item) => (
                    <Link key={item.href} href={item.href} onClick={() => setActiveDropdown(null)}>
                      <span className="block px-3 py-2 rounded-md text-sm hover:bg-muted hover:text-accent transition-colors text-foreground">
                        {item.label}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Links after */}
          {navLinksAfter.map((link) => (
            <Link key={link.href} href={link.href}>
              <span className={linkCls(location.startsWith(link.href))}>{link.label}</span>
            </Link>
          ))}

          <div className="ml-1 pl-2 border-l border-border flex items-center gap-1 xl:gap-2">
            <Link href="/admissions">
              <Button variant="default" className="bg-accent text-accent-foreground hover:bg-accent/90 px-2 lg:px-2.5 xl:px-4 text-[10px] lg:text-[11px] xl:text-xs 2xl:text-sm h-7 lg:h-8 xl:h-10 font-semibold shadow-sm whitespace-nowrap">
                Apply Now
              </Button>
            </Link>
          </div>
        </nav>

        {/* Mobile menu toggle */}
        <button className="lg:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* ── Mobile Nav ── */}
      {isOpen && (
        <div className="lg:hidden border-t border-border bg-background animate-in slide-in-from-top-2">
          <nav className="w-full px-4 py-4 flex flex-col space-y-2 max-h-[calc(100dvh-130px)] overflow-y-auto overscroll-contain">
            <Link href="/"><span className="block px-4 py-2 rounded-md text-base font-medium hover:bg-muted" onClick={() => setIsOpen(false)}>Home</span></Link>

            {/* Mobile Departments accordion */}
            <div>
              <div className="w-full flex items-center justify-between rounded-md hover:bg-muted pr-2">
                <Link href="/departments" onClick={() => setIsOpen(false)} className="flex-1">
                  <span className="block px-4 py-2 text-base font-medium">Departments</span>
                </Link>
                <button onClick={() => setShowMobileDept(!showMobileDept)} className="p-2">
                  <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMobileDept ? "rotate-180" : ""}`} />
                </button>
              </div>
              {showMobileDept && (
                <div className="pl-4 mt-1 space-y-1">
                  <Link href="/faculty">
                    <div className="flex items-center gap-2 px-4 py-2.5 mb-2 mx-2 rounded-lg text-sm font-semibold text-accent bg-accent/10 hover:bg-accent hover:text-white transition-all cursor-pointer group" onClick={() => setIsOpen(false)}>
                      <div className="bg-accent/20 group-hover:bg-white/20 p-1.5 rounded-md transition-colors">
                        <Users className="h-4 w-4" />
                      </div>
                      Our Faculty
                    </div>
                  </Link>
                  <div className="h-px bg-border/50 mx-4 mb-2" />
                  {DEPARTMENTS.map((dept) => (
                    <Link key={dept.id} href={getDepartmentHref(dept.id)}>
                      <span
                        className="flex items-center gap-2.5 px-4 py-2.5 rounded-md text-sm hover:bg-muted text-foreground"
                        onClick={() => setIsOpen(false)}
                      >
                        <span className={`w-2 h-2 rounded-full shrink-0 ${dept.dotColor}`} />
                        <span>
                          <span className={`font-bold ${dept.color}`}>{dept.short}</span>
                          <span className="text-muted-foreground"> — {dept.label}</span>
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile About Us accordion */}
            <div>
              <button onClick={() => setShowMobileAbout(!showMobileAbout)} className="w-full flex items-center justify-between px-4 py-2 rounded-md text-base font-medium hover:bg-muted text-left">
                About Us <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMobileAbout ? "rotate-180" : ""}`} />
              </button>
              {showMobileAbout && (
                <div className="pl-6 flex flex-col gap-1 mt-1 border-l border-border ml-4">
                  {ABOUT_US.map((item) => {
                    if (item.children) {
                      return (
                        <div key={item.label} className="flex flex-col gap-1">
                          <span className="block px-4 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1">
                            {item.label}
                          </span>
                          <div className="max-h-[250px] overflow-y-auto border-l border-border pl-4 flex flex-col gap-1">
                            {item.children.map((sub) => (
                              <Link key={sub.label + sub.href} href={sub.href}>
                                <span className="block px-4 py-2 rounded-md text-sm hover:bg-muted text-foreground" onClick={() => setIsOpen(false)}>
                                  {sub.label}
                                </span>
                              </Link>
                            ))}
                          </div>
                        </div>
                      );
                    }
                    return (
                      <Link key={item.href} href={item.href}>
                        <span className="block px-4 py-2 rounded-md text-sm hover:bg-muted text-foreground" onClick={() => setIsOpen(false)}>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Student's Corner accordion */}
            <div>
              <button onClick={() => setShowMobileStudent(!showMobileStudent)} className="w-full flex items-center justify-between px-4 py-2 rounded-md text-base font-medium hover:bg-muted text-left">
                Student's Corner <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMobileStudent ? "rotate-180" : ""}`} />
              </button>
              {showMobileStudent && (
                <div className="pl-6 flex flex-col gap-1 mt-1 border-l border-border ml-4">
                  {STUDENT_CORNER.map((item) => {
                    if (item.children) {
                      return (
                        <div key={item.label} className="flex flex-col gap-1">
                          <Link href={item.href}>
                            <span className="block px-4 py-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider mt-1 hover:text-accent cursor-pointer" onClick={() => setIsOpen(false)}>
                              {item.label}
                            </span>
                          </Link>
                          {item.children.map((sub) => (
                            <Link key={sub.href} href={sub.href}>
                              <span className="block px-4 py-2 rounded-md text-sm hover:bg-muted text-foreground pl-6" onClick={() => setIsOpen(false)}>
                                {sub.label}
                              </span>
                            </Link>
                          ))}
                        </div>
                      );
                    }
                    return (
                      <Link key={item.href} href={item.href}>
                        <span className="block px-4 py-2 rounded-md text-sm hover:bg-muted text-foreground" onClick={() => setIsOpen(false)}>{item.label}</span>
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Mobile Admission accordion */}
            <div>
              <button onClick={() => setShowMobileAdmission(!showMobileAdmission)} className="w-full flex items-center justify-between px-4 py-2 rounded-md text-base font-medium hover:bg-muted text-left">
                Admission <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMobileAdmission ? "rotate-180" : ""}`} />
              </button>
              {showMobileAdmission && (
                <div className="pl-6 flex flex-col gap-1 mt-1 border-l border-border ml-4">
                  {[
                    { href: "/admissions?tab=eligibility",     label: "Eligibility Criteria" },
                    { href: "/admissions?tab=documents",       label: "Documents Required" },
                    { href: "/admissions?tab=process",         label: "Admission Process" },
                    { href: "/admissions?tab=institute-level", label: "Admission at Institute Level" },
                    { href: "/admissions?tab=tfw-code",        label: "TFW Code" },
                    { href: "/admissions?tab=fee-structure",   label: "Fee Structure" },
                    { href: "/admissions?tab=fra",             label: "FRA" },
                  ].map((item) => (
                    <Link key={item.href} href={item.href}>
                      <span className="block px-4 py-2 rounded-md text-sm hover:bg-muted text-foreground" onClick={() => setIsOpen(false)}>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Approvals accordion */}
            <div>
              <button onClick={() => setShowMobileApprovals(!showMobileApprovals)} className="w-full flex items-center justify-between px-4 py-2 rounded-md text-base font-medium hover:bg-muted text-left">
                Approvals <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${showMobileApprovals ? "rotate-180" : ""}`} />
              </button>
              {showMobileApprovals && (
                <div className="pl-6 flex flex-col gap-1 mt-1 border-l border-border ml-4">
                  {APPROVALS.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <span className="block px-4 py-2 rounded-md text-sm hover:bg-muted text-foreground" onClick={() => setIsOpen(false)}>{item.label}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {navLinksAfter.map((link) => (
              <Link key={link.href} href={link.href}>
                <span className="block px-4 py-2 rounded-md text-base font-medium hover:bg-muted" onClick={() => setIsOpen(false)}>{link.label}</span>
              </Link>
            ))}

            <div className="pt-4 mt-2 border-t border-border">
              <Link href="/admissions">
                <Button variant="default" className="w-full bg-accent text-accent-foreground hover:bg-accent/90" onClick={() => setIsOpen(false)}>Apply Now</Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
