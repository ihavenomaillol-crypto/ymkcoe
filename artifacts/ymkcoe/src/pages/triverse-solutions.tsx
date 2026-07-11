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
  Award
} from "lucide-react";

export default function TriverseSolutions() {
  return (
    <div className="min-h-screen bg-[#fafafc] font-sans selection:bg-purple-200">
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
              <span className="font-bold text-xl text-slate-800 tracking-tight">triverse<span className="text-purple-600">solutions</span></span>
            </div>
            <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-600">
              <a href="#services" className="hover:text-purple-600 transition-colors">Services</a>
              <a href="#industries" className="hover:text-purple-600 transition-colors">Industries</a>
              <a href="#about" className="hover:text-purple-600 transition-colors">About</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="https://wa.me/918446552477" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 text-sm font-medium text-slate-700 hover:bg-gray-50 transition-colors">
                <MessageCircle className="w-4 h-4" /> WhatsApp
              </a>
              <a href="mailto:headoffice@triversesolutions.in" className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500 hover:bg-purple-600 text-white text-sm font-medium transition-colors shadow-lg shadow-purple-500/20">
                <Phone className="w-4 h-4" /> Book a Call
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        {/* Background Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-100 rounded-full blur-[120px] opacity-60 mix-blend-multiply pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-pink-100 rounded-full blur-[100px] opacity-60 mix-blend-multiply pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-50 border border-purple-100 text-purple-700 text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" /> The Digital Growth Partner
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                Transform Your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-500 to-purple-600">Digital Presence</span>
              </h1>
              <div className="text-lg text-slate-500 mb-8 max-w-lg leading-relaxed">
                From strategy to execution, we deliver <span className="font-semibold text-purple-600">end-to-end digital solutions</span> that drive measurable growth and transform businesses.
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600"><Zap className="w-4 h-4" /></div>
                  <span className="text-sm font-semibold text-slate-700">ROI-Focused</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600"><Zap className="w-4 h-4" /></div>
                  <span className="text-sm font-semibold text-slate-700">Fast Delivery</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center text-pink-600"><BarChart className="w-4 h-4" /></div>
                  <span className="text-sm font-semibold text-slate-700">Data-Driven</span>
                </div>
                <div className="flex items-center gap-3 p-4 rounded-xl border border-gray-100 bg-white/50 backdrop-blur-sm">
                  <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600"><Award className="w-4 h-4" /></div>
                  <span className="text-sm font-semibold text-slate-700">Industry Experts</span>
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

      {/* Services Grid */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Technical & Digital Capabilities</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: <Layout />, title: "Web Development", desc: "Corporate Websites, Portals & Custom Apps" },
              { icon: <Smartphone />, title: "Mobile Apps", desc: "Android, iOS and Cross-Platform Apps" },
              { icon: <Database />, title: "Enterprise Solutions", desc: "ERP, CRM, LMS & HRMS Systems" },
              { icon: <Cpu />, title: "Automation", desc: "Workflow Automation & n8n Integrations" },
              { icon: <Search />, title: "SEO & SEM", desc: "Organic Search & Paid Campaign Management" },
              { icon: <Megaphone />, title: "Digital Marketing", desc: "Multi-channel Marketing Strategy" },
              { icon: <Users />, title: "Social Media", desc: "Planning & Community Management" },
              { icon: <Globe2 />, title: "Branding", desc: "Brand Positioning & Identity Design" },
            ].map((skill, idx) => (
              <div key={idx} className="group p-6 bg-[#fafafc] rounded-2xl border border-gray-100 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/5 transition-all cursor-pointer">
                <div className="w-12 h-12 rounded-xl bg-white border border-gray-100 flex items-center justify-center text-purple-600 mb-4 group-hover:scale-110 transition-transform shadow-sm">
                  {skill.icon}
                </div>
                <h4 className="font-bold text-lg text-slate-900 mb-2">{skill.title}</h4>
                <p className="text-sm text-slate-500">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="about" className="py-20 bg-[#fafafc]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Leadership Team</h2>
            <div className="w-20 h-1.5 bg-gradient-to-r from-purple-500 to-fuchsia-500 mx-auto rounded-full mb-6"></div>
            <p className="text-slate-500 max-w-2xl mx-auto text-lg">
              The visionaries driving innovation and delivering measurable outcomes.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden text-center hover:shadow-xl hover:shadow-purple-900/5 transition-all">
              <div className="h-32 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10"></div>
              <div className="w-24 h-24 mx-auto rounded-full bg-white border-4 border-white shadow-md -mt-12 mb-4 flex items-center justify-center">
                <Users className="w-10 h-10 text-purple-400" />
              </div>
              <div className="p-6 pt-0">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Veeraj Sanjog Matnale</h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500 font-bold mb-4 uppercase tracking-wider text-sm">Founder</p>
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden text-center hover:shadow-xl hover:shadow-purple-900/5 transition-all">
              <div className="h-32 bg-gradient-to-br from-purple-500/10 to-fuchsia-500/10"></div>
              <div className="w-24 h-24 mx-auto rounded-full bg-white border-4 border-white shadow-md -mt-12 mb-4 flex items-center justify-center">
                <Users className="w-10 h-10 text-purple-400" />
              </div>
              <div className="p-6 pt-0">
                <h3 className="text-2xl font-bold text-slate-900 mb-1">Omkar Kisan Kale</h3>
                <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-fuchsia-500 font-bold mb-4 uppercase tracking-wider text-sm">Co-Founder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer Minimal */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-6 h-6 rounded bg-gradient-to-br from-purple-600 to-fuchsia-500 flex items-center justify-center text-white font-bold text-xs">V</div>
            <span className="font-bold text-lg text-slate-800 tracking-tight">triverse<span className="text-purple-600">solutions</span></span>
          </div>
          <p className="text-slate-500 mb-4 font-medium text-sm">MSME Registered – Government of India (UDYAM-MH-26-1089081)</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-slate-500 text-sm">
            <a href="https://www.triversesolutions.in" target="_blank" rel="noopener noreferrer" className="hover:text-purple-600 transition-colors flex items-center gap-2">
              <Globe2 className="w-4 h-4" /> www.triversesolutions.in
            </a>
            <span className="hidden md:inline text-gray-300">|</span>
            <a href="mailto:headoffice@triversesolutions.in" className="hover:text-purple-600 transition-colors flex items-center gap-2">
              <Code2 className="w-4 h-4" /> headoffice@triversesolutions.in
            </a>
          </div>
          <div className="mt-8 text-xs text-slate-400">
            &copy; {new Date().getFullYear()} Triverse Solutions. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
