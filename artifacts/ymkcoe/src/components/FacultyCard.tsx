import React from "react";

type FacultyCardProps = {
  name: string;
  designation: string;
  department: string;
  imageSrc: string;
  qualification?: string | null;
  experience?: string | null;
  expertise?: string | null;
  publications?: string | null;
  email?: string | null;
  awards?: string | null;
};

// Custom SVG Icons for a premium look (14px size)
const GraduationIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l9-5-9-5-9 5 9 5z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 22V12h6v10" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4.674 12h4.652a2 2 0 001.995-1.858L19.5 8.25H4.5l-.621 7.892A2 2 0 005.874 18h4.652" />
  </svg>
);

const ScienceIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
  </svg>
);

const BookIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
  </svg>
);

const TrophyIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const MailIcon = () => (
  <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
);

const LinkedInLogo = () => (
  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
  </svg>
);

const ScholarLogo = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 24a7 7 0 1 1 0-14 7 7 0 0 1 0 14zm0-24L0 9.5l12 9.5 8.7-6.9v6.5H24v-9.1L12 0z"/>
  </svg>
);

const ResearchGateLogo = () => (
  <span className="font-extrabold text-[9px] tracking-tighter leading-none select-none">RG</span>
);

export function FacultyCard({ 
  name, 
  designation, 
  department, 
  imageSrc, 
  qualification,
  experience,
  expertise,
  publications,
  email,
  awards
}: FacultyCardProps) {
  // Parse research interests
  const interestsList = (expertise || "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean)
    .slice(0, 4);

  return (
    <div className="relative bg-white border border-black/5 rounded-[20px] shadow-[0_12px_30px_rgba(0,0,0,0.02),0_4px_12px_rgba(0,0,0,0.01)] hover:shadow-[0_20px_40px_rgba(11,94,215,0.06)] hover:-translate-y-1.5 transition-all duration-400 ease-out flex flex-col group h-full overflow-hidden">
      {/* Top Header Wave Accent (25% height) */}
      <div className="relative h-24 w-full bg-gradient-to-br from-[#EEF4FF] via-[#F6F9FF] to-white overflow-hidden">
        {/* Abstract circles */}
        <div className="absolute -top-6 -right-6 w-16 h-16 bg-blue-500/5 rounded-full blur-xl group-hover:bg-blue-500/10 transition-colors duration-500" />
        
        {/* Grid Overlay */}
        <div 
          className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ 
            backgroundImage: "linear-gradient(rgba(11,94,215,0.1) 1px,transparent 1px), linear-gradient(90deg,rgba(11,94,215,0.1) 1px,transparent 1px)", 
            backgroundSize: "16px 16px" 
          }}
        />
        
        {/* Wave SVG */}
        <svg className="absolute bottom-0 w-full h-6 opacity-[0.3] text-white" viewBox="0 0 1440 74" fill="currentColor" preserveAspectRatio="none">
          <path d="M0,32L120,42.7C240,53,480,75,720,74.7C960,75,1200,53,1320,42.7L1440,32L1440,74L1320,74C1200,74,960,74,720,74C480,74,240,74,120,74L0,74Z" />
        </svg>
      </div>

      {/* Floating Portrait (Centered, 115px) */}
      <div className="absolute top-7 left-1/2 -translate-x-1/2 w-[115px] h-[115px] rounded-full border-[5px] border-white shadow-[0_8px_18px_rgba(0,0,0,0.05)] overflow-hidden bg-slate-50 z-10 transition-transform duration-500 group-hover:scale-105">
        <img 
          src={imageSrc} 
          alt={name} 
          onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
          className="w-full h-full object-cover object-top transition-transform duration-700"
        />
      </div>

      {/* Content Section */}
      <div className="pt-14 px-5 md:px-6 pb-4 flex flex-col flex-grow text-center">
        {/* Identity */}
        <div className="space-y-0.5 mb-3">
          <h3 className="font-extrabold text-[17px] md:text-[19px] text-[#16213E] tracking-tight leading-tight group-hover:text-[#0B5ED7] transition-colors duration-300">
            {name}
          </h3>
          <p className="font-bold text-[12px] md:text-[13.5px] text-[#0B5ED7] tracking-tight">
            {designation}
          </p>
          <p className="text-[10.5px] text-[#64748B] font-medium tracking-wide">
            {department}
          </p>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-slate-100 my-3" />

        {/* Metadata Details */}
        <div className="space-y-2.5 text-left mb-5">
          {/* Qualification */}
          {qualification && (
            <div className="flex items-start gap-2.5 group/row">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-[#EEF4FF] text-[#0B5ED7] shrink-0 group-hover/row:bg-[#0B5ED7] group-hover/row:text-white transition-colors duration-200">
                <GraduationIcon />
              </div>
              <div className="min-w-0 flex-1 leading-snug">
                <span className="font-bold text-slate-400 text-[8.5px] uppercase tracking-wider block mb-0.5">Qualification</span>
                <span className="text-[#16213E] text-[11.5px] font-semibold block truncate" title={qualification}>{qualification}</span>
              </div>
            </div>
          )}

          {/* Experience */}
          {experience && (
            <div className="flex items-start gap-2.5 group/row">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-[#EEF4FF] text-[#0B5ED7] shrink-0 group-hover/row:bg-[#0B5ED7] group-hover/row:text-white transition-colors duration-200">
                <BriefcaseIcon />
              </div>
              <div className="min-w-0 flex-1 leading-snug">
                <span className="font-bold text-slate-400 text-[8.5px] uppercase tracking-wider block mb-0.5">Experience</span>
                <span className="text-[#16213E] text-[11.5px] font-semibold block truncate" title={experience}>{experience}</span>
              </div>
            </div>
          )}

          {/* Research Area */}
          {expertise && (
            <div className="flex items-start gap-2.5 group/row">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-[#EEF4FF] text-[#0B5ED7] shrink-0 group-hover/row:bg-[#0B5ED7] group-hover/row:text-white transition-colors duration-200">
                <ScienceIcon />
              </div>
              <div className="min-w-0 flex-1 leading-snug">
                <span className="font-bold text-slate-400 text-[8.5px] uppercase tracking-wider block mb-0.5">Research Area</span>
                <span className="text-[#16213E] text-[11.5px] font-semibold block truncate" title={expertise}>{expertise}</span>
              </div>
            </div>
          )}

          {/* Publications */}
          {publications && (
            <div className="flex items-start gap-2.5 group/row">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-[#EEF4FF] text-[#0B5ED7] shrink-0 group-hover/row:bg-[#0B5ED7] group-hover/row:text-white transition-colors duration-200">
                <BookIcon />
              </div>
              <div className="min-w-0 flex-1 leading-snug">
                <span className="font-bold text-slate-400 text-[8.5px] uppercase tracking-wider block mb-0.5">Publications</span>
                <span className="text-[#16213E] text-[11.5px] font-semibold block truncate" title={publications}>{publications}</span>
              </div>
            </div>
          )}

          {/* Awards */}
          {awards && (
            <div className="flex items-start gap-2.5 group/row">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-[#EEF4FF] text-[#0B5ED7] shrink-0 group-hover/row:bg-[#0B5ED7] group-hover/row:text-white transition-colors duration-200">
                <TrophyIcon />
              </div>
              <div className="min-w-0 flex-1 leading-snug">
                <span className="font-bold text-slate-400 text-[8.5px] uppercase tracking-wider block mb-0.5">Awards</span>
                <span className="text-[#16213E] text-[11.5px] font-semibold block truncate" title={awards}>{awards}</span>
              </div>
            </div>
          )}

          {/* Email */}
          {email && (
            <div className="flex items-start gap-2.5 group/row">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-[#EEF4FF] text-[#0B5ED7] shrink-0 group-hover/row:bg-[#0B5ED7] group-hover/row:text-white transition-colors duration-200">
                <MailIcon />
              </div>
              <div className="min-w-0 flex-1 leading-snug">
                <span className="font-bold text-slate-400 text-[8.5px] uppercase tracking-wider block mb-0.5">Email Address</span>
                <a href={`mailto:${email}`} className="text-[#0B5ED7] hover:underline text-[11.5px] font-semibold block truncate">{email}</a>
              </div>
            </div>
          )}
        </div>

        {/* Areas of Interest Pills */}
        {interestsList.length > 0 && (
          <div className="text-left mt-1.5 mb-3">
            <span className="font-bold text-slate-400 text-[8.5px] uppercase tracking-wider block mb-1.5">Areas of Interest</span>
            <div className="flex flex-wrap gap-1.5">
              {interestsList.map((interest, idx) => (
                <span 
                  key={idx} 
                  className="px-2 py-0.5 bg-[#EEF4FF] hover:bg-[#0B5ED7] hover:text-white transition-all duration-300 text-[#0B5ED7] text-[10px] font-bold rounded-full border border-blue-100/50 hover:scale-105 cursor-default"
                >
                  {interest}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-100 px-5 md:px-6 py-3 bg-slate-50/50 flex items-center justify-between mt-auto">
        <a 
          href="#" 
          onClick={(e) => e.preventDefault()}
          className="flex items-center gap-1.5 text-[#0B5ED7] hover:text-blue-700 text-[11.5px] font-bold tracking-wide transition-colors duration-300"
        >
          <span>View Full Profile</span>
          <svg className="w-3 h-3 transform transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>

        <div className="flex items-center gap-2 text-slate-400">
          <a 
            href="#" 
            onClick={(e) => e.preventDefault()}
            title="LinkedIn Profile"
            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#EEF4FF] hover:text-[#0B5ED7] transition-all duration-200"
          >
            <LinkedInLogo />
          </a>
          <a 
            href="#" 
            onClick={(e) => e.preventDefault()}
            title="Google Scholar"
            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#EEF4FF] hover:text-[#0B5ED7] transition-all duration-200"
          >
            <ScholarLogo />
          </a>
          <a 
            href="#" 
            onClick={(e) => e.preventDefault()}
            title="ResearchGate"
            className="w-6 h-6 rounded-full flex items-center justify-center hover:bg-[#EEF4FF] hover:text-[#0B5ED7] transition-all duration-200 text-xs text-center leading-none"
          >
            <ResearchGateLogo />
          </a>
        </div>
      </div>
    </div>
  );
}
