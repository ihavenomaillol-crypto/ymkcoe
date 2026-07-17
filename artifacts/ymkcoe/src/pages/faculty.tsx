import { AppLayout } from "@/components/layout/AppLayout";
import { useGetFaculty } from "@workspace/api-client-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Mail, Award, BookOpen, Download, User, Calendar, Settings, ShieldCheck, ChevronRight } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

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

export default function Faculty() {
  const [selectedFaculty, setSelectedFaculty] = useState<any | null>(null);
  const { data: FACULTY_DATA = [], isLoading } = useGetFaculty({ limit: 100 });

  const rawMembers = Array.isArray(FACULTY_DATA) ? FACULTY_DATA : [];

  // Global Deduplication by Name
  const uniqueMembersMap = new Map<string, any>();
  rawMembers.forEach((m: any) => {
    const combinedName = getCombinedName(m.title, m.name);
    const memberWithCombinedName = { ...m, name: combinedName };

    const existing = uniqueMembersMap.get(m.name);
    if (!existing) {
      uniqueMembersMap.set(m.name, memberWithCombinedName);
    } else {
      const existingIsTypo = existing.designation.toLowerCase().includes("assisitant");
      const mIsTypo = m.designation.toLowerCase().includes("assisitant");
      if (existingIsTypo && !mIsTypo) {
        uniqueMembersMap.set(m.name, memberWithCombinedName);
      }
    }
  });

  const uniqueMembers = Array.from(uniqueMembersMap.values());

  // Sorting hierarchy weight function
  const getHierarchyWeight = (f: any) => {
    const des = (f.designation || "").toLowerCase();
    const dept = (f.department || "").toLowerCase();
    
    // 1. Principal (strictly principal, not vice principal)
    if (des.includes("principal") && !des.includes("vice")) {
      return 1;
    }
    // 2. Vice-Principal
    if (des.includes("vice-principal") || des.includes("vice principal") || des.includes("vice-principle") || des.includes("vice principle")) {
      return 2;
    }
    // 3. Administrator / Administration
    if (des.includes("administrator") || des.includes("administration") || dept === "administration" || des.includes("accountant") || des.includes("clerk") || des.includes("registrar") || des.includes("office superintendent")) {
      return 3;
    }
    // 4. HOD
    if (f.isHOD || des.includes("head of department") || des.includes("hod")) {
      return 4;
    }
    // 5. Associate Professor
    if (des.includes("associate professor")) {
      return 5;
    }
    // 6. Assistant Professor
    if (des.includes("assistant professor")) {
      return 6;
    }
    // 7. Lecturer
    if (des.includes("lecturer")) {
      return 7;
    }
    // 8. Non-Teaching Staff
    if (des.includes("librarian") || des.includes("library") || dept === "library" || des.includes("programmer") || des.includes("instructor") || des.includes("technical") || dept === "non-technical" || des.includes("lab assistant") || des.includes("assistant")) {
      return 8;
    }
    // 9. Peon, Supervisor, Store Keeper
    if (des.includes("peon") || des.includes("supervisor") || des.includes("superviser") || des.includes("store keeper") || des.includes("storekeeper") || des.includes("attendant") || des.includes("helper")) {
      return 9;
    }
    return 8;
  };

  const sortedMembers = [...uniqueMembers].sort((a, b) => {
    const weightA = getHierarchyWeight(a);
    const weightB = getHierarchyWeight(b);
    
    if (weightA !== weightB) {
      return weightA - weightB;
    }
    return (a.name || "").localeCompare(b.name || "");
  });

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
            Our Faculty
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mx-auto font-medium leading-relaxed drop-shadow-sm">
            Learn from distinguished professors, industry veterans, and dedicated researchers committed to your academic and professional success at YMKCOE.
          </p>
        </div>
        
        {/* Bottom wave/gradient transition */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-background to-transparent" />
      </section>

      {/* Main Faculty Grid by Hierarchy */}
      <section data-scroll-reveal className="py-20 bg-background min-h-[50vh] relative z-20 -mt-8">
        <div className="container mx-auto px-4">
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading faculty directory...</div>
          ) : sortedMembers.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {sortedMembers.map((faculty: any, index) => {
                const des = (faculty.designation || "").toLowerCase();
                const isVP = des.includes("vice-principal") || des.includes("vice principal");
                const isPrincipal = des.includes("principal") && !isVP;
                const isHOD = faculty.isHOD;
                
                const badgeText = isPrincipal 
                  ? "PRINCIPAL" 
                  : isVP 
                    ? "VICE PRINCIPAL" 
                    : isHOD 
                      ? "HOD" 
                      : "";
                const isFeatured = isPrincipal || isVP || isHOD;
                const delay = `${index * 50}ms`;
                
                return (
                  <Card 
                    key={faculty.id} 
                    data-scroll-reveal
                    style={{ transitionDelay: delay }}
                    className={`bg-white rounded-3xl border ${isFeatured ? 'border-amber-200 shadow-amber-500/5' : 'border-slate-100'} shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_10px_40px_rgba(0,0,0,0.08)] transition-all duration-500 p-6 flex flex-col h-full cursor-pointer group`}
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
                        {faculty.department || "Engineering"}
                      </div>
                    </div>
                    
                    {/* Details: Qualification & Email */}
                    <div className="space-y-3 mb-6">
                      {faculty.qualification && (
                        <div className="flex items-start gap-3">
                          <Award className="h-4 w-4 text-slate-400 shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-slate-600 leading-snug">
                            {faculty.qualification}
                          </span>
                        </div>
                      )}
                      {faculty.email && (
                        <div className="flex items-center gap-3">
                          <Mail className="h-4 w-4 text-slate-400 shrink-0" />
                          <span className="text-sm font-medium text-slate-600 truncate">
                            {faculty.email}
                          </span>
                        </div>
                      )}
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
          ) : (
            <div className="text-center py-12 text-muted-foreground">No faculty members found.</div>
          )}
        </div>
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
                      {selectedFaculty.email && (
                        <p className="flex items-center gap-2">
                          <Mail className="h-4 w-4 opacity-70" />
                          <a href={`mailto:${selectedFaculty.email}`} className="hover:text-accent hover:underline transition-colors">
                            {selectedFaculty.email}
                          </a>
                        </p>
                      )}
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
                    {selectedFaculty.qualification && (
                      <div className="bg-muted/40 p-4 rounded-xl border border-border/50 hover:border-accent/30 transition-colors">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Highest Qualification</p>
                        <p className="font-semibold text-foreground text-sm">{selectedFaculty.qualification}</p>
                      </div>
                    )}
                    {selectedFaculty.department && (
                      <div className="bg-muted/40 p-4 rounded-xl border border-border/50 hover:border-accent/30 transition-colors">
                        <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1.5">Department</p>
                        <p className="font-semibold text-foreground text-sm">{selectedFaculty.department}</p>
                      </div>
                    )}
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
