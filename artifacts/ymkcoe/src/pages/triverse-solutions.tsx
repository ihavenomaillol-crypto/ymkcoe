import { AppLayout } from "@/components/layout/AppLayout";
import { SEO } from "@/components/SEO";
import { Building2, Code2, Globe2, Briefcase, Users, Layout, LineChart, Cpu, Smartphone, Database, Search, Target, Megaphone } from "lucide-react";

export default function TriverseSolutions() {
  return (
    <AppLayout>
      <SEO 
        title="Triverse Solutions | Developed By" 
        description="Learn more about Triverse Solutions, the technology and consulting company behind the development of the YMKCOE platform."
        canonicalUrl="/triversesolutions"
      />
      
      {/* Hero Section */}
      <section className="bg-primary text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-4xl">
          <div className="inline-flex items-center justify-center p-3 bg-white/10 rounded-full mb-6">
            <Code2 className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight">TRIVERSE SOLUTIONS</h1>
          <p className="text-xl md:text-2xl text-blue-100 font-light mb-8 max-w-2xl mx-auto leading-relaxed">
            A multidisciplinary technology and consulting company delivering digital transformation, software development, marketing, automation, and creative solutions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="px-4 py-1.5 bg-white/10 rounded-full text-sm border border-white/20">Technology</span>
            <span className="px-4 py-1.5 bg-white/10 rounded-full text-sm border border-white/20">Consulting</span>
            <span className="px-4 py-1.5 bg-white/10 rounded-full text-sm border border-white/20">Creative Solutions</span>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6">
                <Globe2 className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Vision</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                To become a globally recognized technology and consulting partner empowering organizations through innovation and digital transformation.
              </p>
            </div>
            
            <div className="bg-white p-10 rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-4">Our Mission</h3>
              <p className="text-slate-600 leading-relaxed text-lg">
                Deliver scalable solutions, build long-term partnerships, and enable organizations to thrive in the digital era.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do & Strengths */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why Triverse Solutions?</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <Briefcase className="w-8 h-8 text-primary mb-5" />
              <h4 className="text-xl font-bold mb-3 text-slate-800">What We Do</h4>
              <p className="text-slate-600">We help startups, educational institutions, healthcare professionals, and enterprises build, automate, market, and scale their businesses.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <Cpu className="w-8 h-8 text-primary mb-5" />
              <h4 className="text-xl font-bold mb-3 text-slate-800">Core Strength</h4>
              <p className="text-slate-600">End-to-End Solution Delivery under one roof. Dedicated cross-functional teams with an agile execution methodology.</p>
            </div>
            <div className="p-8 rounded-2xl bg-slate-50 border border-slate-100">
              <LineChart className="w-8 h-8 text-primary mb-5" />
              <h4 className="text-xl font-bold mb-3 text-slate-800">Value Proposition</h4>
              <p className="text-slate-600">Combining technical expertise with business understanding to deliver measurable, highly customized business solutions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Technical Capabilities */}
      <section className="py-20 bg-slate-900 text-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical & Digital Capabilities</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full"></div>
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
              <div key={idx} className="p-6 bg-slate-800/50 rounded-xl border border-slate-700 hover:bg-slate-800 transition-colors">
                <div className="text-accent mb-4">{skill.icon}</div>
                <h4 className="font-bold text-lg mb-2">{skill.title}</h4>
                <p className="text-sm text-slate-400">{skill.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team (Filtered to Founders only) */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Leadership Team</h2>
            <div className="w-20 h-1 bg-accent mx-auto rounded-full mb-6"></div>
            <p className="text-slate-600 max-w-2xl mx-auto text-lg">
              The visionaries driving innovation and delivering measurable outcomes for organizations worldwide.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 max-w-3xl mx-auto">
            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-32 bg-slate-100"></div>
              <div className="w-24 h-24 mx-auto rounded-full bg-slate-200 border-4 border-white -mt-12 mb-4 flex items-center justify-center shadow-sm">
                <Users className="w-10 h-10 text-slate-400" />
              </div>
              <div className="p-6 pt-0">
                <h3 className="text-2xl font-bold text-slate-800 mb-1">Veeraj Sanjog Matnale</h3>
                <p className="text-accent font-semibold mb-4 uppercase tracking-wide text-sm">Founder</p>
                <div className="w-12 h-1 bg-slate-100 mx-auto rounded-full"></div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden text-center hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              <div className="h-32 bg-slate-100"></div>
              <div className="w-24 h-24 mx-auto rounded-full bg-slate-200 border-4 border-white -mt-12 mb-4 flex items-center justify-center shadow-sm">
                <Users className="w-10 h-10 text-slate-400" />
              </div>
              <div className="p-6 pt-0">
                <h3 className="text-2xl font-bold text-slate-800 mb-1">Omkar Kisan Kale</h3>
                <p className="text-accent font-semibold mb-4 uppercase tracking-wide text-sm">Co-Founder</p>
                <div className="w-12 h-1 bg-slate-100 mx-auto rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16 bg-white border-t border-slate-100">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-600 mb-4 font-medium">MSME Registered – Government of India (UDYAM-MH-26-1089081)</p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 text-slate-600">
            <a href="https://www.triversesolutions.in" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors flex items-center gap-2">
              <Globe2 className="w-4 h-4" /> www.triversesolutions.in
            </a>
            <span className="hidden md:inline text-slate-300">|</span>
            <a href="mailto:headoffice@triversesolutions.in" className="hover:text-primary transition-colors flex items-center gap-2">
              <Building2 className="w-4 h-4" /> headoffice@triversesolutions.in
            </a>
          </div>
        </div>
      </section>

    </AppLayout>
  );
}
