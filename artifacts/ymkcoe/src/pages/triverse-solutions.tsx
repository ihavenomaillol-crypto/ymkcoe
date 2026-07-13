import { useEffect } from "react";
import { SEO } from "@/components/SEO";
import { 
  Code2, 
  Globe2, 
  Briefcase, 
  Users, 
  Layout, 
  LineChart, 
  Cpu, 
  Smartphone, 
  Database, 
  Search, 
  Target, 
  Megaphone,
  MessageCircle,
  Phone,
  Sparkles,
  Zap,
  BarChart,
  Award,
  CheckCircle2,
  Building2,
  Mail,
  MapPin,
  Laptop,
  Sun,
  ArrowRight
} from "lucide-react";

export default function TriverseSolutions() {
  useEffect(() => {
    // Save original styles
    const origHtmlOverflow = document.documentElement.style.overflow;
    const origHtmlHeight = document.documentElement.style.height;
    const origBodyOverflow = document.body.style.overflow;
    const origBodyHeight = document.body.style.height;

    // Apply scroll overrides to html and body
    document.documentElement.style.setProperty("overflow", "auto", "important");
    document.documentElement.style.setProperty("height", "auto", "important");
    document.body.style.setProperty("overflow", "auto", "important");
    document.body.style.setProperty("height", "auto", "important");

    return () => {
      // Restore original styles on unmount
      document.documentElement.style.overflow = origHtmlOverflow || "";
      document.documentElement.style.height = origHtmlHeight || "";
      document.body.style.overflow = origBodyOverflow || "";
      document.body.style.height = origBodyHeight || "";
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#070b13] text-white font-sans selection:bg-purple-900 selection:text-white">
      <SEO 
        title="Triverse Solutions | Digital Growth Partner" 
        description="A multidisciplinary technology and consulting company delivering digital transformation, software development, marketing, automation, and creative solutions."
        canonicalUrl="/triversesolutions"
      />
      
      {/* Custom Navbar */}
      <nav className="absolute top-0 left-0 right-0 z-50 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center bg-[#0d1321]/70 backdrop-blur-md rounded-full px-8 py-4 shadow-[0_8px_30px_rgba(0,0,0,0.3)] border border-white/5">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-[#6366f1] flex items-center justify-center text-white font-black text-lg leading-none">T</div>
              <span className="font-extrabold text-lg tracking-wider text-white">TRIVERSE</span>
            </div>
            
            {/* Nav Menu */}
            <div className="hidden lg:flex space-x-8 text-xs font-bold text-slate-400">
              <a href="#overview" className="hover:text-white transition-colors">
                <span className="text-[10px] text-indigo-400 font-semibold mr-1">01 /</span> STUDIO
              </a>
              <a href="#services" className="hover:text-white transition-colors">
                <span className="text-[10px] text-indigo-400 font-semibold mr-1">02 /</span> BENTO
              </a>
              <a href="#portfolio" className="hover:text-white transition-colors">
                <span className="text-[10px] text-indigo-400 font-semibold mr-1">03 /</span> CASE STUDIES
              </a>
              <a href="#workflow" className="hover:text-white transition-colors">
                <span className="text-[10px] text-indigo-400 font-semibold mr-1">04 /</span> WORKFLOW
              </a>
              <a href="#about" className="hover:text-white transition-colors">
                <span className="text-[10px] text-indigo-400 font-semibold mr-1">05 /</span> REVIEWS
              </a>
            </div>

            {/* Right CTAs */}
            <div className="flex items-center gap-6">
              {/* Light Theme placeholder */}
              <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-slate-400 text-xs font-bold hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
                <Sun className="w-3.5 h-3.5 text-amber-400" />
                <span className="uppercase tracking-wider text-[9px]">Light Theme</span>
              </div>
              
              {/* Client Site link */}
              <a href="/" className="flex items-center gap-1 text-slate-400 text-xs font-bold hover:text-white transition-colors">
                <span>&lt; Client Site</span>
              </a>

              {/* Start Project */}
              <a href="mailto:headoffice@triversesolutions.in" className="px-6 py-2.5 rounded-full bg-white text-slate-950 text-xs font-black hover:bg-slate-100 transition-colors uppercase tracking-wider shadow-lg shadow-white/5">
                Start Project
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-48 pb-24 relative overflow-hidden">
        {/* Background glow marks */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] aspect-square rounded-full bg-purple-900/10 blur-[150px] pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[-10%] w-[40%] aspect-square rounded-full bg-indigo-900/10 blur-[150px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            {/* Left Content */}
            <div className="max-w-2xl text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#1b253b] border border-white/5 text-indigo-300 text-xs font-bold mb-8 tracking-wide">
                <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse"></div>
                TRIVERSE SOLUTIONS V2.0
              </div>
              <h1 className="text-6xl md:text-8xl font-black text-white leading-[1.05] mb-8 tracking-tight">
                WE DESIGN <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-500">DIGITAL</span> <br />
                ECOSYSTEMS.
              </h1>
              <p className="text-lg md:text-xl text-slate-400 mb-10 max-w-xl leading-relaxed font-medium">
                We craft bespoke branding, high-performance web products, ERP automation, and conversion architecture that scale institutions and businesses.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <a href="#services" className="flex items-center gap-2 px-8 py-4 rounded-full bg-[#6366f1] hover:bg-[#5053e1] text-white text-sm font-bold transition-all shadow-lg shadow-indigo-500/25">
                  Explore Studio Work <ArrowRight className="w-4 h-4" />
                </a>
                <a href="mailto:headoffice@triversesolutions.in" className="px-8 py-4 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 text-white text-sm font-bold transition-colors">
                  Let's Collaborate
                </a>
              </div>
            </div>

            {/* Right Graphic Area - TRIVERSE_STUDIO_SHELL */}
            <div className="relative w-full max-w-lg mx-auto aspect-square flex items-center justify-center">
              {/* Soft glow behind the shell */}
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 rounded-[2.5rem] blur-2xl scale-95 pointer-events-none"></div>

              {/* Main Shell Window */}
              <div className="relative bg-[#0d1321] w-full border border-white/5 rounded-[2rem] p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col justify-between overflow-hidden">
                {/* Grid Background overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZmZmZiIgc3Ryb2tlLXdpZHRoPSIxIiBzdHJva2Utb3BhY2l0eT0iMC4wMiIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-100"></div>

                <div className="relative z-10 flex flex-col h-full justify-between">
                  {/* Title Bar */}
                  <div className="flex justify-between items-center border-b border-white/5 pb-4 mb-6">
                    <div className="flex gap-2">
                      <div className="w-3 h-3 rounded-full bg-rose-500"></div>
                      <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                      <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                    </div>
                    <span className="text-[10px] text-slate-500 uppercase tracking-widest font-mono font-bold">triverse_studio_shell</span>
                    <div className="w-14"></div>
                  </div>

                  {/* Body Columns */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    {/* QA Card */}
                    <div className="bg-[#141b2b] border border-white/5 rounded-2xl p-6 flex flex-col items-start gap-4">
                      <span className="px-3 py-1 rounded bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-wider">QA</span>
                      <div className="space-y-2 w-full">
                        <div className="h-2 w-20 bg-slate-700/50 rounded-full"></div>
                        <div className="h-2 w-12 bg-slate-700/20 rounded-full"></div>
                      </div>
                    </div>
                    
                    {/* ERP Card */}
                    <div className="bg-[#141b2b] border border-white/5 rounded-2xl p-6 flex flex-col items-start gap-4">
                      <span className="px-3 py-1 rounded bg-purple-500/10 text-purple-400 text-[10px] font-black uppercase tracking-wider">ERP</span>
                      <div className="space-y-2 w-full">
                        <div className="h-2 w-24 bg-slate-700/50 rounded-full"></div>
                        <div className="h-2 w-16 bg-slate-700/20 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  {/* UX Status Bar */}
                  <div className="flex justify-between items-center bg-[#141b2b]/50 border border-white/5 rounded-2xl px-6 py-5">
                    <div className="flex items-center gap-3 text-sm text-slate-300 font-bold">
                      <Sparkles className="w-4 h-4 text-indigo-400 animate-pulse" />
                      <span>UX System Active</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[9px] font-black uppercase tracking-widest animate-pulse">Running</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="overview" className="py-20 bg-[#070b13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[2rem] bg-[#0d1321] border border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:border-[#6366f1]/20 transition-all duration-300">
              <div className="absolute -right-8 -bottom-8 opacity-[0.02] text-white transition-transform group-hover:scale-110 duration-500">
                <Globe2 className="w-64 h-64" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#6366f1]/10 flex items-center justify-center text-[#818cf8]"><Globe2 className="w-5 h-5" /></div>
                Our Vision
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed relative z-10 font-medium">
                To become a globally recognized technology and consulting partner empowering organizations through innovation and digital transformation.
              </p>
            </div>
            
            <div className="p-10 rounded-[2rem] bg-[#0d1321] border border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.3)] relative overflow-hidden group hover:border-[#d946ef]/20 transition-all duration-300">
              <div className="absolute -right-8 -bottom-8 opacity-[0.02] text-white transition-transform group-hover:scale-110 duration-500">
                <Target className="w-64 h-64" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#d946ef]/10 flex items-center justify-center text-[#e879f9]"><Target className="w-5 h-5" /></div>
                Our Mission
              </h3>
              <p className="text-slate-400 text-lg leading-relaxed relative z-10 font-medium">
                Deliver scalable solutions, build long-term partnerships, and enable organizations to thrive in the digital era.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs / Comprehensive Capabilities */}
      <section id="services" className="py-24 bg-[#0d1321] border-t border-white/5 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Comprehensive Capabilities</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-400 max-w-3xl mx-auto text-lg font-medium leading-relaxed">
              We help startups, educational institutions, healthcare professionals, and enterprises build, automate, market, and scale their businesses.
            </p>
          </div>

          <div className="space-y-20">
            {/* Technical Capabilities */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                <Code2 className="w-7 h-7 text-indigo-400" /> Technical Capabilities
              </h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: <Layout />, title: "Web Development", desc: "Corporate Websites, Portals, Custom Web Applications" },
                  { icon: <Smartphone />, title: "Mobile App Development", desc: "Android, iOS and Cross-Platform Applications" },
                  { icon: <Zap />, title: "Game Development", desc: "2D and 3D Interactive Experiences" },
                  { icon: <Database />, title: "ERP & CRM Solutions", desc: "Enterprise Resource & Customer Relationship Management" },
                  { icon: <Briefcase />, title: "LMS & HRMS Systems", desc: "Learning & Human Resource Management Solutions" },
                  { icon: <Cpu />, title: "Automation & APIs", desc: "Workflow Automation, n8n, Third-Party Integrations" },
                  { icon: <BarChart />, title: "Dashboard Solutions", desc: "Reporting and Analytics Platforms" },
                ].map((skill, idx) => (
                  <div key={idx} className="group p-8 bg-[#070b13] rounded-3xl border border-white/5 hover:border-[#6366f1]/20 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300">
                    <div className="w-12 h-12 rounded-2xl bg-[#0d1321] border border-white/10 flex items-center justify-center text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300">
                      {skill.icon}
                    </div>
                    <h4 className="font-bold text-xl text-white mb-3">{skill.title}</h4>
                    <p className="text-base text-slate-400 leading-relaxed font-medium">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-white/5" />

            {/* Digital & Creative Services */}
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <LineChart className="w-7 h-7 text-[#d946ef]" /> Digital & Growth
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Lead Generation", desc: "Qualified Lead Acquisition Campaigns" },
                    { title: "Digital Marketing", desc: "Multi-channel Marketing Strategy" },
                    { title: "Social Media Management", desc: "Planning, Publishing & Community" },
                    { title: "SEO & SEM", desc: "Organic Search & Paid Campaigns" },
                    { title: "Branding & Identity", desc: "Brand Positioning & Identity Design" },
                    { title: "Consultancy", desc: "Growth and Strategic Advisory" },
                  ].map((srv, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-5 bg-[#070b13] rounded-2xl border border-white/5 hover:border-[#d946ef]/20 transition-all duration-300">
                      <CheckCircle2 className="w-6 h-6 text-[#e879f9] shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg text-white mb-1">{srv.title}</h4>
                        <p className="text-sm text-slate-400 font-medium">{srv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3">
                  <Sparkles className="w-7 h-7 text-pink-400" /> Creative Services
                </h3>
                <div className="space-y-4">
                  {[
                    { title: "Graphic Designing", desc: "Marketing Collaterals and Creative Assets" },
                    { title: "UI/UX Design", desc: "User-Centric Interface Design" },
                    { title: "Video & Motion", desc: "Promotional Videos & Animated Visual Content" },
                    { title: "Photography", desc: "Product and Corporate Photography" },
                    { title: "Videography", desc: "Event and Commercial Shoots" },
                    { title: "Podcast Consultancy", desc: "Production and Strategic Guidance" },
                  ].map((srv, idx) => (
                    <div key={idx} className="flex gap-4 items-start p-5 bg-[#070b13] rounded-2xl border border-white/5 hover:border-pink-500/20 transition-all duration-300">
                      <CheckCircle2 className="w-6 h-6 text-pink-400 shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg text-white mb-1">{srv.title}</h4>
                        <p className="text-sm text-slate-400 font-medium">{srv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="py-24 bg-[#070b13] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Client Portfolio</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-[#d946ef] border-b border-white/5 pb-4">Technology Clients</h3>
              <ul className="space-y-4">
                {[
                  { name: "Dr. Gaurav Jaswal", ind: "Healthcare", svc: "Website Dev, n8n Automation" },
                  { name: "Dr. Gaurav Jaswal – AI EMR", ind: "Healthcare", svc: "India's First AI-Based EMR System" },
                  { name: "Yummy Fi", ind: "Food & Beverage", svc: "Website Development" },
                  { name: "ICCET 2026 Conference", ind: "Education", svc: "Conference Website Development" },
                  { name: "Ecokaari", ind: "E-Commerce", svc: "E-Commerce Store Development" },
                  { name: "TriHub Business", ind: "Enterprise", svc: "ERP & CRM Development" },
                  { name: "Indrayani Vidya Mandir Trust", ind: "Education", svc: "Institutional Websites" },
                ].map((c, i) => (
                  <li key={i} className="bg-[#0d1321] p-5 rounded-2xl border border-white/5 hover:border-[#d946ef]/20 transition-all duration-300 shadow-lg shadow-black/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg text-white">{c.name}</span>
                      <span className="text-xs font-semibold px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300">{c.ind}</span>
                    </div>
                    <div className="text-sm font-medium text-slate-400">{c.svc}</div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-8 text-pink-300 border-b border-white/5 pb-4">Non-Technical Clients</h3>
              <ul className="space-y-4">
                {[
                  { name: "Divine Solutions Academy", loc: "Talegaon", svc: "Branding & Creative Support" },
                  { name: "Yummy Fi", loc: "Talegaon", svc: "Marketing & Creative Services" },
                  { name: "MM Polytechnic / MMCOA", loc: "Pune", svc: "Graphic Design Support" },
                  { name: "IMERT", loc: "Pune", svc: "Graphic Design Support" },
                  { name: "Indrayani Vidya Mandir (4 Inst.)", loc: "Talegaon", svc: "Branding and Design Support" },
                  { name: "Champion Sports", loc: "Aundh", svc: "Creative Services" },
                ].map((c, i) => (
                  <li key={i} className="bg-[#0d1321] p-5 rounded-2xl border border-white/5 hover:border-pink-500/20 transition-all duration-300 shadow-lg shadow-black/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg text-white">{c.name}</span>
                      <span className="text-xs font-semibold px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-slate-300 flex items-center gap-1"><MapPin className="w-3 h-3"/> {c.loc}</span>
                    </div>
                    <div className="text-sm font-medium text-slate-400">{c.svc}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Strengths & Organization */}
      <section id="workflow" className="py-24 bg-[#0d1321] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-white mb-6 tracking-tight">Why Triverse Solutions?</h3>
              <p className="text-slate-400 mb-10 leading-relaxed text-lg font-medium">
                Combining technical expertise with business understanding to deliver measurable outcomes. At Triverse Solutions, we believe that technology is meaningful only when it creates measurable impact.
              </p>
              <div className="space-y-5">
                {["End-to-End Service Delivery", "Dedicated Cross-Functional Teams", "Customized Business Solutions", "Agile Execution Methodology", "Scalable Technology Architecture", "Long-Term Client Partnerships", "Innovation-Driven Approach"].map((str, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 shrink-0"><CheckCircle2 className="w-5 h-5" /></div>
                    <span className="font-bold text-slate-300 text-lg">{str}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#070b13] p-10 rounded-[2rem] border border-white/5 shadow-lg shadow-black/20">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-3"><Building2 className="w-7 h-7 text-indigo-400"/> Organizational Structure</h3>
              <div className="space-y-6">
                <div className="p-6 bg-[#0d1321] rounded-2xl border border-white/5 hover:border-indigo-500/20 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-xl text-white">Technical Division</h4>
                    <span className="text-indigo-400 font-bold bg-indigo-500/10 px-4 py-1.5 rounded-full text-sm">08 Members</span>
                  </div>
                  <p className="text-base text-slate-400 font-medium">Development, Deployment, Testing, Support, Automation</p>
                </div>
                <div className="p-6 bg-[#0d1321] rounded-2xl border border-white/5 hover:border-pink-500/20 transition-all duration-300">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-xl text-white">Business & Creative</h4>
                    <span className="text-pink-400 font-bold bg-pink-500/10 px-4 py-1.5 rounded-full text-sm">06 Members</span>
                  </div>
                  <p className="text-base text-slate-400 font-medium">Marketing, Branding, Design, Customer Relations</p>
                </div>
                <div className="flex justify-between items-center p-6 bg-[#6366f1] rounded-2xl text-white shadow-xl shadow-indigo-500/20">
                  <span className="font-bold text-xl">Total Workforce</span>
                  <span className="font-extrabold text-2xl text-indigo-100">14 Members</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team (Filtered to Founders only per explicit instruction) */}
      <section id="about" className="py-24 bg-[#070b13]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Leadership Team</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-pink-500 mx-auto rounded-full mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="bg-[#0d1321] rounded-[2rem] border border-white/5 overflow-hidden text-center hover:border-indigo-500/20 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"></div>
              <div className="w-28 h-28 mx-auto rounded-full bg-[#070b13] border-4 border-[#0d1321] shadow-md -mt-14 mb-5 flex items-center justify-center text-indigo-400">
                <Users className="w-12 h-12" />
              </div>
              <div className="p-8 pt-0">
                <h3 className="text-3xl font-extrabold text-white mb-2">Veeraj Sanjog Matnale</h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 font-bold mb-4 uppercase tracking-widest text-sm">Founder</p>
              </div>
            </div>

            <div className="bg-[#0d1321] rounded-[2rem] border border-white/5 overflow-hidden text-center hover:border-indigo-500/20 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300">
              <div className="h-32 bg-gradient-to-br from-indigo-500/10 to-purple-500/10"></div>
              <div className="w-28 h-28 mx-auto rounded-full bg-[#070b13] border-4 border-[#0d1321] shadow-md -mt-14 mb-5 flex items-center justify-center text-indigo-400">
                <Users className="w-12 h-12" />
              </div>
              <div className="p-8 pt-0">
                <h3 className="text-3xl font-extrabold text-white mb-2">Omkar Kisan Kale</h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-pink-500 font-bold mb-4 uppercase tracking-widest text-sm">Co-Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#070b13] border-t border-white/5 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded-lg bg-[#6366f1] flex items-center justify-center text-white font-black text-lg leading-none">T</div>
                <span className="font-extrabold text-lg tracking-wider text-white">TRIVERSE</span>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                B2B Services & Enterprise Solutions.<br/>
                We are committed to delivering innovative, reliable, and scalable solutions that empower businesses to grow, adapt, and lead confidently in a rapidly evolving digital landscape.
              </p>
              <p className="text-sm font-bold text-slate-300 bg-white/5 inline-block px-4 py-2 rounded-lg border border-white/10">
                UDYAM-MH-26-1089081
              </p>
            </div>
            
            <div>
              <h4 className="font-extrabold text-white mb-6 text-lg">Contact Us</h4>
              <ul className="space-y-5">
                <li className="flex gap-3 text-sm text-slate-400 font-medium">
                  <MapPin className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span>Talegaon Dabhade, Taluka Mawal, District Pune, Maharashtra, India</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                  <Phone className="w-5 h-5 text-indigo-400 shrink-0" />
                  <span>+91 8446552477 / +91 9422998322</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-400 font-medium">
                  <Mail className="w-5 h-5 text-indigo-400 shrink-0" />
                  <a href="mailto:headoffice@triversesolutions.in" className="hover:text-[#6366f1] transition-colors">headoffice@triversesolutions.in</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-extrabold text-white mb-6 text-lg">Industries Served</h4>
              <div className="flex flex-wrap gap-2">
                {["Healthcare", "Education", "Real Estate", "Retail & E-Commerce", "Travel", "Agencies", "Startups", "Hospitality", "Sports"].map((ind, i) => (
                  <span key={i} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-lg text-xs font-bold text-slate-300">
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-500">
            <div>&copy; {new Date().getFullYear()} Triverse Solutions (Est. 31 May 2025). All rights reserved.</div>
            <a href="https://www.triversesolutions.in" target="_blank" rel="noopener noreferrer" className="hover:text-[#6366f1] transition-colors flex items-center gap-2 font-bold text-slate-400">
              <Globe2 className="w-4 h-4" /> www.triversesolutions.in
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
