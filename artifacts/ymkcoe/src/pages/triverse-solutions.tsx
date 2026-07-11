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
  Laptop
} from "lucide-react";

export default function TriverseSolutions() {
  return (
    <div className="min-h-screen bg-[#fafafc] font-sans selection:bg-purple-200 overflow-x-hidden">
      <SEO 
        title="Triverse Solutions | Digital Growth Partner" 
        description="A multidisciplinary technology and consulting company delivering digital transformation, software development, marketing, automation, and creative solutions."
        canonicalUrl="/triversesolutions"
      />
      
      {/* Custom Navbar */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xl">V</div>
              <span className="font-bold text-xl text-slate-900 tracking-tight">triverse<span className="text-purple-600">solutions</span></span>
            </div>
            <div className="hidden lg:flex space-x-8 text-sm font-semibold text-slate-500">
              <a href="#overview" className="hover:text-slate-900 transition-colors">Overview</a>
              <a href="#services" className="hover:text-slate-900 transition-colors">Services</a>
              <a href="#portfolio" className="hover:text-slate-900 transition-colors">Portfolio</a>
              <a href="#about" className="hover:text-slate-900 transition-colors">Team</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/918446552477" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-full border border-gray-200 text-sm font-semibold text-slate-700 hover:bg-gray-50 transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a href="mailto:headoffice@triversesolutions.in" className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-gradient-to-r from-purple-500 to-fuchsia-500 hover:from-purple-600 hover:to-fuchsia-600 text-white text-sm font-semibold transition-all shadow-lg shadow-purple-500/20">
                <Phone className="w-4 h-4" /> Book a Call
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-x-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px] opacity-60 mix-blend-multiply pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-pink-100 rounded-full blur-[100px] opacity-60 mix-blend-multiply pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" /> Technology, Consulting & Creative Solutions
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Transform Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600">Digital Presence</span>
              </h1>
              <div className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed">
                From strategy to execution, we deliver <span className="font-semibold text-purple-600">end-to-end digital solutions</span> that drive measurable growth and transform businesses across Pan India.
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600"><Zap className="w-4 h-4" /></div>
                  <span className="text-sm font-semibold text-slate-700">Strategy-Led</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Cpu className="w-4 h-4" /></div>
                  <span className="text-sm font-semibold text-slate-700">Tech-Driven</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600"><Users className="w-4 h-4" /></div>
                  <span className="text-sm font-semibold text-slate-700">Customer-Focused</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600"><Award className="w-4 h-4" /></div>
                  <span className="text-sm font-semibold text-slate-700">End-to-End Delivery</span>
                </div>
              </div>
            </div>

            {/* Graphic Right */}
            <div className="relative hidden lg:block">
              <div className="absolute inset-0 bg-gradient-to-tr from-purple-100 to-fuchsia-50 rounded-[3rem] transform rotate-3 scale-105"></div>
              <div className="relative bg-white p-8 rounded-[3rem] shadow-xl shadow-purple-900/5 border border-purple-50">
                <div className="absolute top-4 left-4 w-2 h-2 rounded-full bg-purple-300"></div>
                <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-purple-300"></div>
                <div className="absolute bottom-4 left-4 w-2 h-2 rounded-full bg-fuchsia-400"></div>
                <div className="absolute bottom-4 right-4 w-2 h-2 rounded-full bg-cyan-300"></div>
                
                {/* Grid background */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA0MCAwIEwgMCAwIDAgNDAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2YxZjVmOSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] rounded-[3rem] opacity-50"></div>
                
                <div className="relative aspect-square flex items-center justify-center">
                  <div className="w-64 h-64 relative z-10 drop-shadow-2xl">
                    <svg viewBox="0 0 100 100" className="w-full h-full fill-[url(#grad)]">
                      <defs>
                        <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#4f46e5" />
                          <stop offset="50%" stopColor="#9333ea" />
                          <stop offset="100%" stopColor="#c026d3" />
                        </linearGradient>
                      </defs>
                      <path d="M50 70 L20 40 L35 40 L50 55 L65 40 L80 40 Z" />
                      <path d="M50 30 L35 15 L20 15 L50 45 L80 15 L65 15 Z" />
                      <path d="M20 60 L35 60 L20 75 Z" />
                      <path d="M80 60 L65 60 L80 75 Z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section id="overview" className="py-12 bg-[#fafafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="p-10 rounded-[2rem] bg-white border border-purple-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-purple-100 transition-colors">
              <div className="absolute -right-8 -bottom-8 opacity-[0.03] text-purple-600 transition-transform group-hover:scale-110 duration-500">
                <Globe2 className="w-64 h-64" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center text-purple-500"><Globe2 className="w-5 h-5" /></div>
                Our Vision
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed relative z-10 font-medium">
                To become a globally recognized technology and consulting partner empowering organizations through innovation and digital transformation.
              </p>
            </div>
            
            <div className="p-10 rounded-[2rem] bg-white border border-fuchsia-50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden group hover:border-fuchsia-100 transition-colors">
              <div className="absolute -right-8 -bottom-8 opacity-[0.03] text-fuchsia-600 transition-transform group-hover:scale-110 duration-500">
                <Target className="w-64 h-64" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-fuchsia-50 flex items-center justify-center text-fuchsia-500"><Target className="w-5 h-5" /></div>
                Our Mission
              </h3>
              <p className="text-slate-500 text-lg leading-relaxed relative z-10 font-medium">
                Deliver scalable solutions, build long-term partnerships, and enable organizations to thrive in the digital era.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services Tabs / Comprehensive Capabilities */}
      <section id="services" className="py-24 bg-white border-t border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Comprehensive Capabilities</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 max-w-3xl mx-auto text-lg font-medium leading-relaxed">
              We help startups, educational institutions, healthcare professionals, and enterprises build, automate, market, and scale their businesses.
            </p>
          </div>

          <div className="space-y-20">
            {/* Technical Capabilities */}
            <div>
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                <Code2 className="w-7 h-7 text-purple-600" /> Technical Capabilities
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
                  <div key={idx} className="group p-8 bg-[#fafafc] rounded-3xl border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/5 transition-all">
                    <div className="w-12 h-12 rounded-2xl bg-white shadow-sm border border-purple-50 flex items-center justify-center text-purple-500 mb-6 group-hover:scale-110 transition-transform">
                      {skill.icon}
                    </div>
                    <h4 className="font-bold text-xl text-slate-900 mb-3">{skill.title}</h4>
                    <p className="text-base text-slate-500 leading-relaxed font-medium">{skill.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <hr className="border-gray-100" />

            {/* Digital & Creative Services */}
            <div className="grid md:grid-cols-2 gap-16">
              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <LineChart className="w-7 h-7 text-fuchsia-600" /> Digital & Growth
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
                    <div key={idx} className="flex gap-4 items-start p-5 bg-[#fafafc] rounded-2xl border border-gray-100 hover:border-fuchsia-100 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-fuchsia-500 shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg text-slate-900 mb-1">{srv.title}</h4>
                        <p className="text-sm text-slate-500 font-medium">{srv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                  <Sparkles className="w-7 h-7 text-pink-500" /> Creative Services
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
                    <div key={idx} className="flex gap-4 items-start p-5 bg-[#fafafc] rounded-2xl border border-gray-100 hover:border-pink-100 transition-colors">
                      <CheckCircle2 className="w-6 h-6 text-pink-500 shrink-0" />
                      <div>
                        <h4 className="font-bold text-lg text-slate-900 mb-1">{srv.title}</h4>
                        <p className="text-sm text-slate-500 font-medium">{srv.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section - Dark Theme exactly as requested */}
      <section id="portfolio" className="py-24 bg-[#0f172a] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Client Portfolio</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-x-12 gap-y-16">
            <div>
              <h3 className="text-2xl font-bold mb-8 text-fuchsia-300 border-b border-slate-800 pb-4">Technology Clients</h3>
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
                  <li key={i} className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/50 hover:border-fuchsia-500/50 transition-colors shadow-lg shadow-black/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg text-white">{c.name}</span>
                      <span className="text-xs font-semibold px-3 py-1.5 bg-[#334155] rounded-lg text-slate-300">{c.ind}</span>
                    </div>
                    <div className="text-sm font-medium text-slate-400">{c.svc}</div>
                  </li>
                ))}
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-8 text-pink-300 border-b border-slate-800 pb-4">Non-Technical Clients</h3>
              <ul className="space-y-4">
                {[
                  { name: "Divine Solutions Academy", loc: "Talegaon", svc: "Branding & Creative Support" },
                  { name: "Yummy Fi", loc: "Talegaon", svc: "Marketing & Creative Services" },
                  { name: "MM Polytechnic / MMCOA", loc: "Pune", svc: "Graphic Design Support" },
                  { name: "IMERT", loc: "Pune", svc: "Graphic Design Support" },
                  { name: "Indrayani Vidya Mandir (4 Inst.)", loc: "Talegaon", svc: "Branding and Design Support" },
                  { name: "Champion Sports", loc: "Aundh", svc: "Creative Services" },
                ].map((c, i) => (
                  <li key={i} className="bg-[#1e293b] p-5 rounded-2xl border border-slate-700/50 hover:border-pink-500/50 transition-colors shadow-lg shadow-black/20">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg text-white">{c.name}</span>
                      <span className="text-xs font-semibold px-3 py-1.5 bg-[#334155] rounded-lg text-slate-300 flex items-center gap-1"><MapPin className="w-3 h-3"/> {c.loc}</span>
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
      <section className="py-24 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h3 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-6 tracking-tight">Why Triverse Solutions?</h3>
              <p className="text-slate-500 mb-10 leading-relaxed text-lg font-medium">
                Combining technical expertise with business understanding to deliver measurable outcomes. At Triverse Solutions, we believe that technology is meaningful only when it creates measurable impact.
              </p>
              <div className="space-y-5">
                {["End-to-End Service Delivery", "Dedicated Cross-Functional Teams", "Customized Business Solutions", "Agile Execution Methodology", "Scalable Technology Architecture", "Long-Term Client Partnerships", "Innovation-Driven Approach"].map((str, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-purple-50 flex items-center justify-center text-purple-600 shrink-0"><CheckCircle2 className="w-5 h-5" /></div>
                    <span className="font-bold text-slate-700 text-lg">{str}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-[#fafafc] p-10 rounded-[2rem] border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3"><Building2 className="w-7 h-7 text-purple-600"/> Organizational Structure</h3>
              <div className="space-y-6">
                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-purple-200 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-xl text-slate-900">Technical Division</h4>
                    <span className="text-purple-700 font-bold bg-purple-50 px-4 py-1.5 rounded-full text-sm">08 Members</span>
                  </div>
                  <p className="text-base text-slate-500 font-medium">Development, Deployment, Testing, Support, Automation</p>
                </div>
                <div className="p-6 bg-white rounded-2xl border border-gray-100 shadow-sm hover:border-fuchsia-200 transition-colors">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-xl text-slate-900">Business & Creative</h4>
                    <span className="text-fuchsia-700 font-bold bg-fuchsia-50 px-4 py-1.5 rounded-full text-sm">06 Members</span>
                  </div>
                  <p className="text-base text-slate-500 font-medium">Marketing, Branding, Design, Customer Relations</p>
                </div>
                <div className="flex justify-between items-center p-6 bg-slate-900 rounded-2xl text-white shadow-xl shadow-slate-900/10">
                  <span className="font-bold text-xl">Total Workforce</span>
                  <span className="font-extrabold text-2xl text-purple-300">14 Members</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team (Filtered to Founders only per explicit instruction) */}
      <section id="about" className="py-24 bg-[#fafafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Leadership Team</h2>
            <div className="w-24 h-1.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 mx-auto rounded-full mb-6"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden text-center hover:shadow-xl hover:shadow-purple-900/5 transition-all">
              <div className="h-32 bg-gradient-to-br from-purple-50 to-fuchsia-50"></div>
              <div className="w-28 h-28 mx-auto rounded-full bg-white border-4 border-white shadow-md -mt-14 mb-5 flex items-center justify-center">
                <Users className="w-12 h-12 text-purple-300" />
              </div>
              <div className="p-8 pt-0">
                <h3 className="text-3xl font-extrabold text-slate-900 mb-2">Veeraj Sanjog Matnale</h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500 font-bold mb-4 uppercase tracking-widest text-sm">Founder</p>
              </div>
            </div>

            <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden text-center hover:shadow-xl hover:shadow-purple-900/5 transition-all">
              <div className="h-32 bg-gradient-to-br from-purple-50 to-fuchsia-50"></div>
              <div className="w-28 h-28 mx-auto rounded-full bg-white border-4 border-white shadow-md -mt-14 mb-5 flex items-center justify-center">
                <Users className="w-12 h-12 text-purple-300" />
              </div>
              <div className="p-8 pt-0">
                <h3 className="text-3xl font-extrabold text-slate-900 mb-2">Omkar Kisan Kale</h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500 font-bold mb-4 uppercase tracking-widest text-sm">Co-Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 rounded bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xl">V</div>
                <span className="font-bold text-xl text-slate-900 tracking-tight">triverse<span className="text-purple-600">solutions</span></span>
              </div>
              <p className="text-slate-500 text-sm leading-relaxed mb-6 font-medium">
                B2B Services & Enterprise Solutions.<br/>
                We are committed to delivering innovative, reliable, and scalable solutions that empower businesses to grow, adapt, and lead confidently in a rapidly evolving digital landscape.
              </p>
              <p className="text-sm font-bold text-slate-700 bg-slate-50 inline-block px-4 py-2 rounded-lg border border-slate-200">
                UDYAM-MH-26-1089081
              </p>
            </div>
            
            <div>
              <h4 className="font-extrabold text-slate-900 mb-6 text-lg">Contact Us</h4>
              <ul className="space-y-5">
                <li className="flex gap-3 text-sm text-slate-600 font-medium">
                  <MapPin className="w-5 h-5 text-purple-500 shrink-0" />
                  <span>Talegaon Dabhade, Taluka Mawal, District Pune, Maharashtra, India</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                  <Phone className="w-5 h-5 text-purple-500 shrink-0" />
                  <span>+91 8446552477 / +91 9422998322</span>
                </li>
                <li className="flex items-center gap-3 text-sm text-slate-600 font-medium">
                  <Mail className="w-5 h-5 text-purple-500 shrink-0" />
                  <a href="mailto:headoffice@triversesolutions.in" className="hover:text-purple-600 transition-colors">headoffice@triversesolutions.in</a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-extrabold text-slate-900 mb-6 text-lg">Industries Served</h4>
              <div className="flex flex-wrap gap-2">
                {["Healthcare", "Education", "Real Estate", "Retail & E-Commerce", "Travel", "Agencies", "Startups", "Hospitality", "Sports"].map((ind, i) => (
                  <span key={i} className="px-3 py-1.5 bg-[#fafafc] border border-gray-200 rounded-lg text-xs font-bold text-slate-600">
                    {ind}
                  </span>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-medium text-slate-500">
            <div>&copy; {new Date().getFullYear()} Triverse Solutions (Est. 31 May 2025). All rights reserved.</div>
            <a href="https://www.triversesolutions.in" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors flex items-center gap-2 font-bold text-slate-700">
              <Globe2 className="w-4 h-4" /> www.triversesolutions.in
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
