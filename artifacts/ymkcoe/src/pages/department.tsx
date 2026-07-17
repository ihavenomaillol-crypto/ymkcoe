import { useEffect, useState } from "react";
import { Redirect, useLocation, useParams } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { DepartmentLaptopReveal } from "@/components/DepartmentLaptopReveal";
import { FacultyCard } from "@/components/FacultyCard";
import { AIDSRoboReveal } from "@/components/AIDSRoboReveal";
import { CSELaptopReveal } from "@/components/CSELaptopReveal";
import { ENTCCircuitReveal } from "@/components/ENTCCircuitReveal";
import { ITVaultReveal } from "@/components/ITVaultReveal";
import { FEScienceReveal } from "@/components/FEScienceReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import AcademicTree from "@/components/AcademicTree";
import SyllabusCards from "@/components/SyllabusCards";
import GridCalendar from "@/components/GridCalendar";
import { ChevronRight, Eye, Target, GraduationCap, Briefcase } from "lucide-react";
import { motion } from "framer-motion";
import { useGetFaculty } from "@workspace/api-client-react";
import { DEPARTMENTS } from "@/lib/departments";

const getCombinedName = (title: string | null | undefined, name: string) => {
  if (!title) return name;
  const cleanTitle = title.trim();
  const cleanName = name.trim();
  if (!cleanTitle) return cleanName;
  
  const titleLower = cleanTitle.toLowerCase().replace(/\.$/, "");
  const nameLower = cleanName.toLowerCase();
  
  if (nameLower.startsWith(titleLower)) {
    return cleanName;
  }
  return `${cleanTitle} ${cleanName}`;
};

const DEPT_CONFIG: Record<
  string,
  {
    id: string;
    name: string;
    short: string;
    color: string;
    intake: number;
    description: string;
    about: string[];
    vision: string;
    mission: string[];
  }
> = {
  cse: {
    id: "cse",
    name: "Computer Science & Engineering",
    short: "CSE",
    color: "blue",
    intake: 60,
    description:
      "The Department of Computer Science & Engineering offers a rigorous B.Tech program focused on algorithms, software development, systems programming, and emerging technologies like cloud computing and cybersecurity.",
    about: [
      "Established with an intake of 60 students.",
      "Curriculum aligned with BATU norms and industry requirements.",
      "Well-equipped computer labs with high-speed internet.",
      "Focus on hands-on projects, internships, and competitive programming.",
      "Active coding clubs, hackathon teams, and tech-talk sessions.",
    ],
    vision:
      "To be a centre of excellence in Computer Science & Engineering education that nurtures innovative, ethical, and globally competent engineers.",
    mission: [
      "Provide quality technical education grounded in strong fundamentals.",
      "Encourage research, innovation, and entrepreneurship among students.",
      "Develop socially responsible professionals through value-based education.",
    ],
  },
  aids: {
    id: "aids",
    name: "Artificial Intelligence and Data Science",
    short: "AI&DS",
    color: "violet",
    intake: 60,
    description:
      "The Department of AI & Data Science equips students with skills in machine learning, deep learning, big data analytics, and Python-based data science workflows to solve real-world problems.",
    about: [
      "Intake of 60 students with a multidisciplinary approach.",
      "Courses spanning ML, DL, NLP, computer vision, and data pipelines.",
      "Dedicated AI/ML lab with GPU-powered workstations.",
      "Industry partnerships for live projects and case studies.",
      "Student-driven AI research groups and paper publication support.",
    ],
    vision:
      "To foster a generation of AI-driven innovators who contribute meaningfully to science, society, and industry.",
    mission: [
      "Impart cutting-edge knowledge in AI, ML, and data analytics.",
      "Promote interdisciplinary research and applied problem-solving.",
      "Prepare students to lead in the AI-first economy.",
    ],
  },
  entc: {
    id: "entc",
    name: "Electronics & Telecommunication Engineering",
    short: "ENTC",
    color: "emerald",
    intake: 60,
    description:
      "The Department of Electronics & Telecommunication Engineering offers a strong foundation in analog/digital electronics, embedded systems, signal processing, and wireless communication.",
    about: [
      "Intake of 60 students with a strong focus on core electronics.",
      "Laboratories for embedded systems, PCB design, and signal processing.",
      "Industry-relevant curriculum covering IoT, VLSI, and 5G technologies.",
      "Regular industrial visits and expert guest lectures.",
      "Student projects presented at national-level technical events.",
    ],
    vision:
      "To be a leading department in Electronics & Telecommunication that produces globally competitive engineers.",
    mission: [
      "Provide comprehensive knowledge of electronics, communication systems, and emerging technologies.",
      "Cultivate analytical and design thinking in students.",
      "Promote ethical engineering practices and lifelong learning.",
    ],
  },
  it: {
    id: "it",
    name: "Information Technology",
    short: "IT",
    color: "orange",
    intake: 60,
    description:
      "The Department of Information Technology focuses on software engineering, networking, database management, web development, and enterprise application design.",
    about: [
      "Intake of 60 students with a practical, project-oriented approach.",
      "State-of-the-art IT labs with modern software environments.",
      "Curriculum covering full-stack development, cloud, DevOps, and security.",
      "Active tech community with workshops and open-source contributions.",
      "Strong alumni network with placements in top IT companies.",
    ],
    vision:
      "To develop skilled IT professionals who are innovative, adaptive, and capable of solving complex real-world challenges.",
    mission: [
      "Impart sound theoretical knowledge combined with practical skills.",
      "Encourage creativity, collaboration, and continuous learning.",
      "Align curriculum with the evolving demands of the IT industry.",
    ],
  },
  fe: {
    id: "fe",
    name: "First Year Engineering",
    short: "FE",
    color: "rose",
    intake: 360,
    description:
      "The Department of Basic Sciences & Humanities (First Year Engineering) establishes a robust foundation in mathematics, physics, chemistry, coding basics, and communication skills essential for all engineering branches.",
    about: [
      "Foundational department established to guide and prepare first-year students.",
      "Curriculum aligned with DBATU syllabus, focusing on fundamentals of engineering science.",
      "Dedicated state-of-the-art labs for Engineering Physics, Chemistry, and Programming for Problem Solving (PPS).",
      "Comprehensive student induction and mentorship programs to ease the academic transition.",
      "Focus on personality development, professional ethics, and basic coding competence.",
    ],
    vision:
      "To build a strong foundation in fundamental sciences, technical communication, and ethical values that empowers future engineers to learn, innovate, and lead.",
    mission: [
      "Impart top-quality technical education in core sciences and basic engineering fields.",
      "Nurture critical thinking, problem-solving abilities, and lifelong learning attitudes.",
      "Facilitate standard professional ethics, communication capabilities, and soft skills.",
    ],
  },
};



const deptColorTheme: Record<
  string,
  {
    themeBg: string;
    cardBg: string;
    borderDefault: string;
    borderGlow: string;
    glowShadow: string;
    accentText: string;
    badgeBg: string;
    badgeText: string;
    avatarRing: string;
    avatarText: string;
    avatarBg: string;
  }
> = {
  blue: {
    themeBg: "bg-blue-50/50",
    cardBg: "bg-white",
    borderDefault: "border-blue-100",
    borderGlow: "hover:border-blue-400/50",
    glowShadow: "hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.2)]",
    accentText: "text-blue-600",
    badgeBg: "bg-blue-500/10",
    badgeText: "text-blue-600",
    avatarRing: "from-blue-500 to-cyan-400",
    avatarText: "text-blue-600",
    avatarBg: "bg-blue-50",
  },
  violet: {
    themeBg: "bg-violet-50/50",
    cardBg: "bg-white",
    borderDefault: "border-violet-100",
    borderGlow: "hover:border-violet-400/50",
    glowShadow: "hover:shadow-[0_0_30px_-5px_rgba(139,92,246,0.2)]",
    accentText: "text-violet-600",
    badgeBg: "bg-violet-500/10",
    badgeText: "text-violet-600",
    avatarRing: "from-violet-500 to-fuchsia-400",
    avatarText: "text-violet-600",
    avatarBg: "bg-violet-50",
  },
  emerald: {
    themeBg: "bg-emerald-50/50",
    cardBg: "bg-white",
    borderDefault: "border-emerald-100",
    borderGlow: "hover:border-emerald-400/50",
    glowShadow: "hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]",
    accentText: "text-emerald-600",
    badgeBg: "bg-emerald-500/10",
    badgeText: "text-emerald-600",
    avatarRing: "from-emerald-500 to-teal-400",
    avatarText: "text-emerald-600",
    avatarBg: "bg-emerald-50",
  },
  orange: {
    themeBg: "bg-orange-50/50",
    cardBg: "bg-white",
    borderDefault: "border-orange-100",
    borderGlow: "hover:border-orange-400/50",
    glowShadow: "hover:shadow-[0_0_30px_-5px_rgba(249,115,22,0.2)]",
    accentText: "text-orange-600",
    badgeBg: "bg-orange-500/10",
    badgeText: "text-orange-600",
    avatarRing: "from-orange-500 to-amber-400",
    avatarText: "text-orange-600",
    avatarBg: "bg-orange-50",
  },
  rose: {
    themeBg: "bg-rose-50/50",
    cardBg: "bg-white",
    borderDefault: "border-rose-100",
    borderGlow: "hover:border-rose-400/50",
    glowShadow: "hover:shadow-[0_0_30px_-5px_rgba(244,63,94,0.2)]",
    accentText: "text-rose-600",
    badgeBg: "bg-rose-500/10",
    badgeText: "text-rose-600",
    avatarRing: "from-rose-500 to-pink-400",
    avatarText: "text-rose-600",
    avatarBg: "bg-rose-50",
  },
};

const ACADEMICS_CONTENT = [
  { sem: "Semester I & II", subjects: ["Engineering Mathematics I & II", "Engineering Physics / Chemistry", "Basic Electrical Engineering", "Engineering Mechanics", "Communication Skills", "Introduction to Programming"] },
  { sem: "Semester III & IV", subjects: ["Data Structures", "Object-Oriented Programming", "Digital Electronics", "Discrete Mathematics", "Database Management Systems", "Computer Organization"] },
  { sem: "Semester V & VI", subjects: ["Operating Systems", "Computer Networks", "Software Engineering", "Theory of Computation", "Web Technologies", "Elective I & II"] },
  { sem: "Semester VII & VIII", subjects: ["Project Work", "Elective III & IV", "Industrial Training / Internship", "Seminar", "Professional Ethics", "Entrepreneurship Development"] },
];

const TABS = [
  { value: "faculty", label: "Faculty" },
  { value: "academics", label: "Academics" },
  { value: "syllabus", label: "Syllabus" },
  { value: "calendar", label: "Academic Calendar" },
];

export default function Department() {
  const { deptId } = useParams<{ deptId: string }>();
  const [activeTab, setActiveTab] = useState("faculty");

  // Validate department exists
  const dept = DEPT_CONFIG[deptId as keyof typeof DEPT_CONFIG];

  // Fetch real faculty from API
  const { data: allFaculty = [], isLoading: isFacultyLoading } = useGetFaculty({ limit: 100 });
  const officialDeptLabel = dept?.name;
  
  const safeFaculty = Array.isArray(allFaculty) ? allFaculty : [];
  // Filter for faculty belonging to this department
  const filteredDeptFaculty = safeFaculty.filter((f: any) => {
    // FE page is called "First Year Engineering" or has ID "fe", but its faculty are stored under "Basic Sciences & Humanities" in DB
    const targetDeptLabel = deptId === "fe" ? "Basic Sciences & Humanities" : officialDeptLabel;
    if (f.department !== targetDeptLabel) return false;
    
    // Check if there is an invalid drive link, but still allow empty/null
    const url = f.photoUrl || f.photo_url || "";
    if (typeof url === "string" && url.includes("drive.google.com")) {
      return false; // Specifically filter out drive links if that was the intent
    }
    
    return true;
  });

  // Deduplicate display faculty by name
  const uniqueDeptFacultyMap = new Map<string, any>();
  filteredDeptFaculty.forEach((m: any) => {
    const combinedName = getCombinedName(m.title, m.name);
    const memberWithCombinedName = { ...m, name: combinedName };

    const existing = uniqueDeptFacultyMap.get(m.name);
    if (!existing) {
      uniqueDeptFacultyMap.set(m.name, memberWithCombinedName);
    } else {
      if (existing.designation.toLowerCase().includes("assisitant") && !m.designation.toLowerCase().includes("assisitant")) {
        uniqueDeptFacultyMap.set(m.name, memberWithCombinedName);
      }
    }
  });
  const displayFaculty = Array.from(uniqueDeptFacultyMap.values());

  useEffect(() => {
    // Reset tab when department changes
    setActiveTab("faculty");
  }, [deptId]);

  if (!dept) {
    return <Redirect to="/departments" />;
  }

  const colorMap: Record<string, string> = {
    blue: "bg-blue-50 text-blue-700 border-blue-200",
    violet: "bg-violet-50 text-violet-700 border-violet-200",
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-200",
    orange: "bg-orange-50 text-orange-700 border-orange-200",
    rose: "bg-rose-50 text-rose-700 border-rose-200",
  };
  const accentTextMap: Record<string, string> = {
    blue: "text-blue-600",
    violet: "text-violet-600",
    emerald: "text-emerald-600",
    orange: "text-orange-600",
    rose: "text-rose-600",
  };
  const accentBgMap: Record<string, string> = {
    blue: "bg-blue-50 border-blue-100",
    violet: "bg-violet-50 border-violet-100",
    emerald: "bg-emerald-50 border-emerald-100",
    orange: "bg-orange-50 border-orange-100",
    rose: "bg-rose-50 border-rose-100",
  };

  const theme = deptColorTheme[dept.color] || deptColorTheme.blue;

  return (
    <AppLayout>
      {/* Hero */}
      <section data-scroll-reveal className="bg-primary text-white py-14 md:py-20 relative overflow-hidden flex min-h-[350px]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/30 via-primary/50 to-primary pointer-events-none z-0" />
        
        {/* Department Specific Hero Background Image */}
        {(deptId === "cse" || deptId === "aids" || deptId === "entc" || deptId === "it" || deptId === "fe") && (
          <div className="absolute inset-y-0 right-0 w-full md:w-2/3 z-0 opacity-50 md:opacity-80 mix-blend-lighten overflow-hidden pointer-events-none">
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-transparent to-primary z-10" />
            <img 
              src={`/${deptId}_header_bg.png`}
              alt={`${dept.name} Hero`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        )}

        <div className="container mx-auto px-4 relative z-10 flex flex-col justify-center">
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${colorMap[dept.color]} bg-white/90`}>
              {dept.short} | Intake: {dept.intake}
            </span>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight">
            {dept.name}
          </h1>
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-3xl leading-relaxed">
            {dept.description}
          </p>
        </div>
      </section>

      {/* 3D Laptop/Robo/Vault — Custom reveals for different departments */}
      {deptId === "cse" ? (
        <CSELaptopReveal dept={dept} />
      ) : deptId === "aids" ? (
        <AIDSRoboReveal dept={dept} />
      ) : deptId === "entc" ? (
        <ENTCCircuitReveal dept={dept} />
      ) : deptId === "it" ? (
        <ITVaultReveal dept={dept} />
      ) : deptId === "fe" ? (
        <FEScienceReveal dept={dept} />
      ) : (
        <DepartmentLaptopReveal dept={dept} />
      )}

      {/* About Department + Vision & Mission — only for depts without custom reveals */}
      {deptId !== "cse" && deptId !== "aids" && deptId !== "entc" && deptId !== "it" && deptId !== "fe" && (
        <section data-scroll-reveal className="py-16 md:py-20 bg-background border-b border-border">
          <div className="container mx-auto px-4 max-w-5xl space-y-10">
            <div className="text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">About the Department</h2>
              <p className="mt-2 text-muted-foreground text-sm max-w-2xl mx-auto">
                Key highlights, goals, and guiding principles of the {dept.name} department.
              </p>
            </div>
            <div className={`rounded-2xl border p-6 md:p-8 ${accentBgMap[dept.color]}`}>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                {dept.about.map((point, i) => (
                  <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                    <ChevronRight className={`h-4 w-4 shrink-0 mt-0.5 ${accentTextMap[dept.color]}`} />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${accentBgMap[dept.color]}`}>
                    <Eye className={`h-5 w-5 ${accentTextMap[dept.color]}`} />
                  </div>
                  <h3 className="text-lg font-bold text-primary">Vision</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">{dept.vision}</p>
              </div>
              <div className="rounded-2xl border border-border bg-card p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4">
                  <div className={`h-10 w-10 rounded-xl flex items-center justify-center ${accentBgMap[dept.color]}`}>
                    <Target className={`h-5 w-5 ${accentTextMap[dept.color]}`} />
                  </div>
                  <h3 className="text-lg font-bold text-primary">Mission</h3>
                </div>
                <ul className="space-y-3">
                  {dept.mission.map((m, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <span className={`font-bold shrink-0 text-base leading-snug ${accentTextMap[dept.color]}`}>M{i + 1}.</span>
                      <span className="leading-relaxed">{m}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Tab Navigation & Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Sticky Tab Bar */}
        <section data-scroll-reveal className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-40 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]">
          <div className="container mx-auto px-4 py-3 flex justify-center">
            <div className="flex justify-center w-full overflow-x-auto no-scrollbar pb-1">
              <TabsList className="h-auto bg-slate-100 p-1.5 rounded-[22px] inline-flex gap-2 border border-slate-200/50">
                {TABS.map((tab) => (
                  <TabsTrigger
                    key={tab.value}
                    value={tab.value}
                    className="px-6 py-2.5 rounded-xl border-0 data-[state=active]:bg-[#0B5ED7] data-[state=active]:text-white data-[state=active]:shadow-md bg-transparent text-sm font-bold text-slate-600 hover:text-slate-900 transition-all whitespace-nowrap"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>
          </div>
        </section>

        {/* Tab Contents */}
        <div className="w-full">
          <TabsContent value="faculty" className="py-0 outline-none m-0">
            <div className="relative bg-[#F7F9FC] py-16 md:py-24 overflow-hidden border-t border-slate-100">
              {/* Soft Radial Glows */}
              <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-blue-100/30 rounded-full blur-[120px] pointer-events-none" />
              <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-[150px] pointer-events-none" />
              
              {/* Tiny Dotted Pattern */}
              <div 
                className="absolute inset-0 opacity-[0.04] pointer-events-none"
                style={{ 
                  backgroundImage: "radial-gradient(#0B5ED7 1.5px, transparent 1.5px)", 
                  backgroundSize: "24px 24px" 
                }}
              />

              {/* Subtle abstract mesh/grid using CSS */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,#00000003_1px,transparent_1px),linear-gradient(to_bottom,#00000003_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none" />
              
              {/* Light Wave Shape */}
              <div className="absolute top-0 left-0 right-0 h-40 opacity-[0.02] pointer-events-none overflow-hidden">
                <svg className="w-full h-full" viewBox="0 0 1440 100" fill="none" preserveAspectRatio="none">
                  <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,0L1320,0C1200,0,960,0,720,0C480,0,240,0,120,0L0,0Z" fill="#0B5ED7" />
                </svg>
              </div>

              <div className="container mx-auto px-4 relative z-10 max-w-7xl">
                {/* Heading Section */}
                <div className="text-center max-w-3xl mx-auto mb-16">
                  <span className="inline-flex rounded-full bg-[#0B5ED7]/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#0B5ED7] mb-4">
                    Our Experts
                  </span>
                  <h2 className="text-3xl md:text-5xl font-extrabold text-[#16213E] tracking-tight">
                    Our Dedicated Faculty
                  </h2>
                  {/* Small gold decorative divider beneath */}
                  <div className="flex items-center justify-center gap-2 my-4">
                    <div className="w-12 h-[2px] bg-[#F4B400]" />
                    <div className="w-2 h-2 rounded-full bg-[#F4B400]" />
                    <div className="w-12 h-[2px] bg-[#F4B400]" />
                  </div>
                  <p className="text-base md:text-lg text-[#64748B] font-medium max-w-2xl mx-auto leading-relaxed">
                    Learn from experienced educators, researchers, innovators and industry professionals.
                  </p>
                </div>

                {/* Faculty Card Grid (32px gutter = gap-8) */}
                <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 items-stretch">
                  {displayFaculty.map((member, i) => (
                    <FacultyCard
                      key={member.id || i}
                      name={member.name}
                      designation={member.designation}
                      department={member.department || officialDeptLabel}
                      email={member.email}
                      imageSrc={member.photoUrl || "/default-avatar.png"}
                      qualification={member.qualification}
                      experience={member.experience}
                      expertise={member.coreSkills || member.specialization}
                      publications={member.publications}
                    />
                  ))}
                </div>

                <div className="pt-16 mt-16 border-t border-slate-200/60 text-center">
                  <p className="text-sm text-slate-400 italic max-w-lg mx-auto">
                    Detailed faculty profiles are updated dynamically from our university administration system.
                  </p>
                </div>
              </div>
            </div>
          </TabsContent>

            <TabsContent value="academics" className="py-10">
              <div className="container mx-auto px-0 max-w-7xl space-y-6">
                <h2 className="text-2xl font-bold text-primary">Academic Structure</h2>
                <p className="text-sm text-muted-foreground">
                  The B.Tech program is a 4-year (8-semester) full-time undergraduate degree affiliated to BATU, Lonere.
                </p>
                <AcademicTree dept={dept} />
              </div>
            </TabsContent>

            <TabsContent value="syllabus" className="py-10">
              <div className="container mx-auto px-0 max-w-7xl space-y-6">
                <h2 className="text-2xl font-bold text-primary">Subject-wise Syllabus</h2>
                <p className="text-sm text-muted-foreground">
                  The detailed syllabus for each subject based on the latest BATU guidelines.
                </p>
                <SyllabusCards dept={dept} />
              </div>
            </TabsContent>

            <TabsContent value="calendar" className="py-10">
              <div className="container mx-auto px-0 max-w-[1200px] space-y-6">
                <h2 className="text-2xl font-bold text-primary">Academic Calendar</h2>
                <GridCalendar />
              </div>
            </TabsContent>
          </div>
        </Tabs>
    </AppLayout>
  );
}
