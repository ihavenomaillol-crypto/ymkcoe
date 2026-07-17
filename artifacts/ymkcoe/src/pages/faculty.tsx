import { AppLayout } from "@/components/layout/AppLayout";
import { useGetFaculty } from "@workspace/api-client-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Award, BookOpen, Download, User, Calendar, Settings, ShieldCheck, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";

import { DEPARTMENTS } from "@/lib/departments";

export default function Faculty() {
  const [selectedFaculty, setSelectedFaculty] = useState<any | null>(null);
  const { data: FACULTY_DATA = [], isLoading } = useGetFaculty({ limit: 100 });

  const hierarchyGroups = DEPARTMENTS.map(dept => {
    // Determine a brief description based on the department
    const description = `Distinguished faculty and researchers of the ${dept.label} department.`;
    const targetDeptLabel = dept.id === "fe" ? "Basic Sciences & Humanities" : dept.label;
    const members = FACULTY_DATA.filter((f: any) => f.department === targetDeptLabel);
    
    // Deduplicate members by name in the same department
    const uniqueMembersMap = new Map<string, any>();
    members.forEach((m: any) => {
      const existing = uniqueMembersMap.get(m.name);
      if (!existing) {
        uniqueMembersMap.set(m.name, m);
      } else {
        if (existing.designation.toLowerCase().includes("assisitant") && !m.designation.toLowerCase().includes("assisitant")) {
          uniqueMembersMap.set(m.name, m);
        }
      }
    });
    const uniqueMembers = Array.from(uniqueMembersMap.values());
    
    // Sort so HODs appear first
    const sortedMembers = [...uniqueMembers].sort((a, b) => {
      if (a.isHOD && !b.isHOD) return -1;
      if (!a.isHOD && b.isHOD) return 1;
      return 0;
    });

    return {
      title: dept.label,
      description,
      members: sortedMembers,
    };
  }).filter(group => group.members.length > 0);

  return (
    <AppLayout>
      {/* Premium Hero Section */}
      <section data-scroll-reveal className="relative bg-primary text-white py-24 md:py-32 overflow-hidden">
        {/* Background Image & Overlay */}
        <div 
          className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center"
        />
        <div className="absolute inset-0 bg-primary/80 backdrop-blur-[2px]" />
        
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/40 via-transparent to-transparent pointer-events-none" />
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] mix-blend-overlay pointer-events-none" />
        
        <div className="container mx-auto px-4 relative z-10 text-center flex flex-col items-center">
          <Badge className="bg-white/10 text-accent hover:bg-white/20 mb-6 border-white/20 backdrop-blur-md px-4 py-1.5 text-sm transition-all duration-300">
            Meet the Experts
          </Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70 leading-tight drop-shadow-sm">
            Engineering Faculty
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm">
            Learn from distinguished professors, industry veterans, and dedicated researchers committed to your academic and professional success at YMKCOE.
          </p>
        </div>
        
        {/* Bottom wave/gradient transition */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Main Faculty Grid by Hierarchy */}
      <section data-scroll-reveal className="py-20 bg-background min-h-[50vh] relative z-20 -mt-8 space-y-24">
        {hierarchyGroups.map((group, groupIdx) => (
          <div key={groupIdx} className="container mx-auto px-4">
            
            <div className="mb-10 border-b border-border/50 pb-4">
              <h2 className="text-3xl font-extrabold text-foreground tracking-tight">{group.title}</h2>
              <p className="text-muted-foreground mt-2">{group.description}</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {group.members.map((faculty: any, index) => {
                const isHOD = faculty.isHOD;
                const isPrincipal = faculty.designation.toLowerCase().includes("principal");
                const badgeText = isPrincipal ? "PRINCIPAL" : isHOD ? "HOD" : "";
                const delay = `${index * 100}ms`;
                
                return (
                  <Card 
                    key={faculty.id} 
                    data-scroll-reveal
                    style={{ transitionDelay: delay }}
                    className={`bg-white rounded-3xl border ${isPrincipal || isHOD ? 'border-amber-200' : 'border-slate-100'} shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 p-6 flex flex-col h-full cursor-pointer group`}
                    onClick={() => setSelectedFaculty(faculty)}
                  >
                    {/* Top Row: Avatar & Badge */}
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-20 h-20 rounded-full overflow-hidden bg-amber-50 border border-amber-100 flex items-center justify-center relative group-hover:scale-105 transition-transform duration-500">
                        {faculty.photoUrl ? (
                          <img 
                            src={faculty.photoUrl} 
                            alt={faculty.name} 
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(faculty.name)}&background=fef3c7&color=b45309&size=128`;
                            }}
                          />
                        ) : (
                          <span className="text-xl font-bold text-amber-700">
                            {faculty.name.split(' ').map((n: string) => n[0]).join('').substring(0, 2)}
                          </span>
                        )}
                      </div>
                      
                      {badgeText && (
                        <div className="bg-amber-50 text-amber-500 font-bold text-[10px] uppercase tracking-wider px-3 py-1 rounded-full border border-amber-100 shadow-sm">
                          {badgeText}
                        </div>
                      )}
                    </div>
                    
                    {/* Name & Designation */}
                    <div className="mb-6 flex-1">
                      <h3 className="text-[22px] font-bold text-slate-800 leading-tight mb-2 group-hover:text-amber-500 transition-colors">
                        {faculty.name}
                      </h3>
                      <p className="text-xs font-bold text-amber-500 uppercase tracking-wide mb-3">
                        {faculty.designation}
                      </p>
                      <div className="inline-block bg-slate-50 text-slate-500 text-[11px] font-medium px-3 py-1 rounded-md border border-slate-100">
                        {faculty.institution || "Engineering"}
                      </div>
                    </div>
                    
                    {/* Details: Qualification & Email/Experience */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-start gap-3">
                        <Award className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                        <span className="text-sm font-medium text-slate-600 leading-snug">
                          {faculty.qualification || "Not Specified"}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                        <span className="text-sm font-medium text-slate-600 truncate">
                          {faculty.email}
                        </span>
                      </div>
                    </div>
                    
                    {/* Footer Link */}
                    <div className="mt-auto pt-2">
                      <span className="text-amber-500 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all duration-300">
                        View details <ChevronRight className="h-4 w-4" />
                      </span>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        ))}
      </section>

      {/* Faculty Details Premium Dialog */}
      <Dialog open={!!selectedFaculty} onOpenChange={(open) => !open && setSelectedFaculty(null)}>
        <DialogContent className="max-w-3xl w-[95vw] max-h-[90vh] overflow-hidden p-0 bg-background/95 backdrop-blur-xl border-border/50 shadow-2xl rounded-2xl">
          {selectedFaculty && (
            <div className="h-full flex flex-col max-h-[90vh] overflow-y-auto">
              
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-primary to-primary/90 text-white p-8 md:p-10 relative overflow-hidden shrink-0">
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
                <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
                  <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white/20 shadow-2xl shrink-0 bg-muted relative">
                    {selectedFaculty.photoUrl ? (
                      <img 
                        src={selectedFaculty.photoUrl} 
                        alt={selectedFaculty.name} 
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(selectedFaculty.name)}&background=random&size=160&color=fff`;
                        }}
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-secondary text-white text-5xl font-bold">
                        {selectedFaculty.name.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="text-center md:text-left space-y-3 flex-1">
                    <Badge className="bg-accent text-white shadow-sm border-transparent uppercase tracking-widest text-[10px] mb-2 inline-flex">
                      {selectedFaculty.designation}
                    </Badge>
                    <DialogTitle className="text-3xl md:text-4xl font-extrabold tracking-tight leading-tight">{selectedFaculty.name}</DialogTitle>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-4 md:gap-6 text-sm text-primary-foreground/80 mt-2">
                      <p className="flex items-center gap-2">
                        <Mail className="h-4 w-4 opacity-70" />
                        <a href={`mailto:${selectedFaculty.email}`} className="hover:text-accent hover:underline transition-colors">
                          {selectedFaculty.email}
                        </a>
                      </p>
                      {selectedFaculty.createdAt && (
                        <p className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 opacity-70" />
                          Joined: {new Date(selectedFaculty.createdAt).toLocaleDateString()}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-8 md:p-10 space-y-8 flex-1">
                
                {/* Academic Background */}
                <div className="space-y-4">
                  <h4 className="flex items-center gap-3 text-lg font-bold text-foreground">
                    <div className="p-2 bg-accent/10 rounded-lg text-accent"><BookOpen className="h-5 w-5" /></div>
                    Academic Background
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pl-12">
                    <div className="bg-muted/40 p-4 rounded-xl border border-border/50 hover:border-accent/30 transition-colors">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Highest Qualification</p>
                      <p className="font-semibold text-foreground text-sm">{selectedFaculty.qualification}</p>
                    </div>
                    <div className="bg-muted/40 p-4 rounded-xl border border-border/50 hover:border-accent/30 transition-colors">
                      <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Department</p>
                      <p className="font-semibold text-foreground text-sm">{selectedFaculty.department}</p>
                    </div>
                  </div>
                </div>

                {/* Core Skills & Specializations */}
                {selectedFaculty.specialization && (
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-3 text-lg font-bold text-foreground">
                      <div className="p-2 bg-accent/10 rounded-lg text-accent"><Settings className="h-5 w-5" /></div>
                      Core Skills & Expertise
                    </h4>
                    <div className="flex flex-wrap gap-2 pl-12">
                      {selectedFaculty.specialization.split(',').map((skill: string, index: number) => {
                        const s = skill.trim();
                        if (!s) return null;
                        return (
                          <Badge key={index} variant="outline" className="bg-background shadow-sm px-3 py-1.5 text-sm font-medium border-border/60 hover:bg-muted transition-colors">
                            {s}
                          </Badge>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Administrative Roles */}
                {selectedFaculty.isHOD && (
                  <div className="space-y-4">
                    <h4 className="flex items-center gap-3 text-lg font-bold text-foreground">
                      <div className="p-2 bg-accent/10 rounded-lg text-accent"><ShieldCheck className="h-5 w-5" /></div>
                      Administrative Roles
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-12">
                      <li className="flex items-center gap-3 text-sm font-medium text-foreground bg-muted/30 p-3 rounded-lg border border-border/40">
                        <div className="h-2 w-2 rounded-full bg-accent shrink-0 shadow-[0_0_8px_rgba(var(--accent-rgb),0.8)]" />
                        Head of Department
                      </li>
                    </ul>
                  </div>
                )}
              </div>

              {/* Modal Footer */}
              <div className="p-6 md:p-8 border-t border-border bg-muted/10 flex flex-col sm:flex-row items-center justify-end gap-4 shrink-0">
                <Button variant="ghost" className="w-full sm:w-auto" onClick={() => setSelectedFaculty(null)}>
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
