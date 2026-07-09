import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Cpu, Code2, Music, Dumbbell, Camera, Users, ArrowRight, CheckCircle2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Club {
  id: string;
  name: string;
  desc: string;
  icon: typeof Cpu;
  color: string;
  bgColor: string;
  leadFaculty: string;
  studentLead: string;
  highlights: string[];
}

const CLUBS: Club[] = [
  {
    id: "robotics",
    name: "Robotics Club",
    desc: "Design, build, and program autonomous robots for national competitions, focusing on microcontrollers, ROS, sensor integration, and 3D printing.",
    icon: Cpu,
    color: "text-orange-500",
    bgColor: "bg-orange-500/10",
    leadFaculty: "Prof. P. D. Joshi",
    studentLead: "Raman Patel (TE Mechanical)",
    highlights: ["1st Prize at IIT Delhi Robotryst", "Conducted Arduino Workshop for 120+ freshmen", "Built autonomous warehouse delivery bot prototype"],
  },
  {
    id: "coders",
    name: "Coders' Club",
    desc: "Cultivating algorithm design, data structures, open source contributions, and web/mobile development. Host of weekly coding contests.",
    icon: Code2,
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
    leadFaculty: "Dr. A. V. Kulkarni",
    studentLead: "Siddharth Sen (BE Computer)",
    highlights: ["Smart India Hackathon 2025 winner", "150+ members active on LeetCode/CodeChef", "Contributed to 12 open source libraries"],
  },
  {
    id: "cultural",
    name: "Cultural Club (Tarang)",
    desc: "A creative harbor for music, dance, theatre, and visual arts. Coordinates the college's annual cultural fest, Tarang.",
    icon: Music,
    color: "text-pink-500",
    bgColor: "bg-pink-500/10",
    leadFaculty: "Prof. Neeta More",
    studentLead: "Priya Sharma (TE IT)",
    highlights: ["Best Street Play Award at Zonal Youth Fest", "Formed College Fusion Band 'YMK-Echoes'", "Organized college musical concert"],
  },
  {
    id: "sports",
    name: "Sports & Fitness Club",
    desc: "Promoting physical fitness, team camaraderie, and sportsmanship. Oversees tournaments and manages campus sports facilities.",
    icon: Dumbbell,
    color: "text-green-500",
    bgColor: "bg-green-500/10",
    leadFaculty: "Director of Physical Ed, Mr. R. R. Patil",
    studentLead: "Vikram Rathi (BE CSE)",
    highlights: ["Organized Inter-Departmental Sports Cup", "Runners Up at Inter-University Athletics", "Daily Yoga & Wellness sessions"],
  },
  {
    id: "photography",
    name: "Photography & Media Club",
    desc: "Capturing college memories and teaching camera basics, lighting, post-processing, and video editing. Responsible for the college newsletter.",
    icon: Camera,
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
    leadFaculty: "Prof. S. M. Shinde",
    studentLead: "Kabir Khan (TE E&TC)",
    highlights: ["Official photographers for YMKCOE fests", "Organized Photowalk around historical sites", "Published 4 issues of YMK News Reel"],
  },
];

export default function ClubsPage() {
  const { toast } = useToast();
  const [selectedClub, setSelectedClub] = useState<Club | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNo: "",
    branch: "CSE",
    year: "FE",
  });

  const handleOpenJoin = (club: Club) => {
    setSelectedClub(club);
    setIsSuccess(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.rollNo) {
      toast({
        title: "Required Fields",
        description: "Please fill in all the details.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate successful registration
    setIsSuccess(true);
    toast({
      title: "Registration Submitted!",
      description: `Successfully registered for the ${selectedClub?.name}.`,
    });
  };

  return (
    <AppLayout>
      {/* Header */}
      <section className="relative bg-gradient-to-br from-primary/95 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.15),transparent)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4 inline-block">
            Student Life
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Student Clubs & Societies
          </h1>
          <p className="text-slate-300 text-lg">
            Discover new passions, develop leadership skills, and collaborate on exciting projects outside the curriculum. Join our vibrant club community today.
          </p>
        </div>
      </section>

      {/* Clubs Grid */}
      <section className="py-20 container mx-auto px-4 max-w-6xl">
        <div className="grid md:grid-cols-2 gap-8">
          {CLUBS.map((club) => {
            const Icon = club.icon;
            return (
              <Card key={club.id} className="group overflow-hidden border-border bg-card hover:shadow-2xl transition-all duration-300 flex flex-col justify-between">
                <CardContent className="p-8 flex flex-col justify-between h-full space-y-6">
                  <div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className={`p-3 rounded-xl ${club.bgColor} ${club.color}`}>
                        <Icon className="h-6 w-6" />
                      </div>
                      <h2 className="text-2xl font-bold group-hover:text-accent transition-colors">
                        {club.name}
                      </h2>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed mb-6">
                      {club.desc}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="text-sm font-bold text-foreground">Recent Highlights:</div>
                      <ul className="space-y-1.5 pl-1.5 text-sm text-foreground/80">
                        {club.highlights.map((h, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-accent mt-0.5">•</span>
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="border-t border-border/50 pt-5 mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="text-xs space-y-0.5">
                      <div><span className="font-semibold text-muted-foreground">Faculty Lead:</span> <span className="text-foreground">{club.leadFaculty}</span></div>
                      <div><span className="font-semibold text-muted-foreground">Student Lead:</span> <span className="text-foreground">{club.studentLead}</span></div>
                    </div>
                    
                    <Button 
                      onClick={() => handleOpenJoin(club)}
                      className="w-full sm:w-auto bg-accent hover:bg-accent/90 text-white font-semibold transition-all flex items-center gap-2 group/btn"
                    >
                      Join Club <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Join Club Dialog */}
      <Dialog open={selectedClub !== null} onOpenChange={(open) => !open && setSelectedClub(null)}>
        <DialogContent className="sm:max-w-[450px]">
          {isSuccess ? (
            <div className="p-6 text-center space-y-4 flex flex-col items-center">
              <div className="h-12 w-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Successfully Registered!</DialogTitle>
                <DialogDescription className="text-sm text-muted-foreground pt-1.5">
                  Thanks for expressing interest in joining the <strong>{selectedClub?.name}</strong>. Our student lead will reach out to you with details on the next onboarding session.
                </DialogDescription>
              </DialogHeader>
              <DialogFooter className="w-full pt-4">
                <Button onClick={() => setSelectedClub(null)} className="w-full bg-accent hover:bg-accent/90 text-white">
                  Close Window
                </Button>
              </DialogFooter>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Join {selectedClub?.name}</DialogTitle>
                <DialogDescription>
                  Enter your information below to register as an active member of this student club.
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="join-name">Full Name</Label>
                  <Input 
                    id="join-name" 
                    placeholder="Enter your name" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="join-email">College Email ID</Label>
                  <Input 
                    id="join-email" 
                    type="email" 
                    placeholder="name.student@ymkcoe.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="join-roll">Roll Number</Label>
                  <Input 
                    id="join-roll" 
                    placeholder="e.g. 25CSE01" 
                    value={formData.rollNo}
                    onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                    required 
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="join-branch">Branch</Label>
                    <select 
                      id="join-branch"
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="CSE">Computer Eng.</option>
                      <option value="AI-DS">AI & DS</option>
                      <option value="IT">Info Tech</option>
                      <option value="ENTC">E&TC Eng.</option>
                      <option value="Mechanical">Mechanical Eng.</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="join-year">Year of Study</Label>
                    <select 
                      id="join-year"
                      value={formData.year}
                      onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="FE">First Year (FE)</option>
                      <option value="SE">Second Year (SE)</option>
                      <option value="TE">Third Year (TE)</option>
                      <option value="BE">Final Year (BE)</option>
                    </select>
                  </div>
                </div>
              </div>

              <DialogFooter className="pt-2">
                <Button type="button" variant="outline" onClick={() => setSelectedClub(null)}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-accent hover:bg-accent/90 text-white">
                  Submit Request
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
