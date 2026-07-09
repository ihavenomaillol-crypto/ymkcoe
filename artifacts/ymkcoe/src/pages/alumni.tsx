import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Globe, Users, Briefcase, GraduationCap, ChevronRight, CheckCircle2, ArrowRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { CountUp } from "@/components/CountUp";

interface Alumnus {
  name: string;
  batch: string;
  branch: string;
  company: string;
  role: string;
  location: string;
  initials: string;
  quote: string;
}

const SPOTLIGHTS: Alumnus[] = [
  {
    name: "Dr. Sandeep Shinde",
    batch: "Class of 1998",
    branch: "Computer Engineering",
    company: "Google LLC",
    role: "Staff Software Engineer (AI)",
    location: "Mountain View, CA, USA",
    initials: "SS",
    quote: "My fundamentals in computing were built at YMKCOE. The faculty's hands-on mentorship gave me the drive to pursue advanced research in machine learning.",
  },
  {
    name: "Nikhil Deshmukh",
    batch: "Class of 2004",
    branch: "Mechanical Engineering",
    company: "Tesla Inc.",
    role: "Senior Engineering Manager",
    location: "Austin, TX, USA",
    initials: "ND",
    quote: "The engineering labs at YMKCOE taught me practical problem-solving. It's that core engineering mindset that I use today designing autonomous factories.",
  },
  {
    name: "Aishwarya Patil",
    batch: "Class of 2012",
    branch: "Electronics & Telecommunication",
    company: "Tata Consultancy Services (TCS)",
    role: "Technical Lead & Cloud Architect",
    location: "Pune, India",
    initials: "AP",
    quote: "College placement drives paved my path. I recommend YMKCOE students to actively participate in clubs to build team leadership qualities.",
  },
  {
    name: "Amit Joshi",
    batch: "Class of 2016",
    branch: "Information Technology",
    company: "DevSolutions Ltd.",
    role: "Co-Founder & CTO",
    location: "Bengaluru, India",
    initials: "AJ",
    quote: "The entrepreneurial incubation support of the college allowed me and my classmates to launch our first SaaS product straight from the campus campus.",
  },
];

const ALUMNI_STATS = [
  { label: "Global Alumni", val: 5400, suffix: "+", icon: Users, color: "text-blue-500 bg-blue-500/10" },
  { label: "Top Tech Employers", val: 85, suffix: "+", icon: Briefcase, color: "text-orange-500 bg-orange-500/10" },
  { label: "Chapters Worldwide", val: 8, suffix: "", icon: Globe, color: "text-purple-500 bg-purple-500/10" },
  { label: "Willing Mentors", val: 320, suffix: "+", icon: GraduationCap, color: "text-green-500 bg-green-500/10" },
];

export default function AlumniPage() {
  const { toast } = useToast();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    batch: "",
    branch: "CSE",
    company: "",
    designation: "",
    mentor: "No",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.batch) {
      toast({
        title: "Required Fields",
        description: "Please fill in Name, Email, and Graduation Batch.",
        variant: "destructive",
      });
      return;
    }

    setIsSuccess(true);
    toast({
      title: "Alumni Directory Registration Submitted!",
      description: "Successfully submitted profile details to our alumni network.",
    });
  };

  return (
    <AppLayout>
      {/* Header */}
      <section className="relative bg-gradient-to-br from-primary/95 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.15),transparent)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4 inline-block">
            Global Network
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Alumni Association
          </h1>
          <p className="text-slate-300 text-lg">
            Our graduates lead tech initiatives, innovate global engineering, and spearhead startups worldwide. Join the community to reconnect, mentor, and build legacy.
          </p>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {ALUMNI_STATS.map((stat, i) => (
              <Card key={i} className="border-border/60 bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-foreground">
                      <CountUp end={stat.val} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Spotlights Grid */}
      <section className="py-20 container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-2 text-foreground">Alumni Spotlights</h2>
        <p className="text-sm text-muted-foreground text-center mb-12 max-w-lg mx-auto">
          Highlighting some of our notable alumni and their journeys from YMKCOE to global industry leaders.
        </p>

        <div className="grid md:grid-cols-2 gap-10">
          {SPOTLIGHTS.map((alumnus, idx) => (
            <Card key={idx} className="group overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                <div className="flex items-center gap-4">
                  <div className="h-14 w-14 rounded-full bg-accent/15 text-accent font-bold text-lg flex items-center justify-center border border-accent/20 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                    {alumnus.initials}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground group-hover:text-accent transition-colors leading-tight">
                      {alumnus.name}
                    </h3>
                    <div className="text-sm font-semibold text-accent mt-0.5">{alumnus.role}</div>
                    <div className="text-xs text-muted-foreground mt-0.5">{alumnus.company} • {alumnus.batch}</div>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm italic leading-relaxed pt-3 border-l-2 border-accent/40 pl-4">
                  "{alumnus.quote}"
                </p>
                
                <div className="text-xs text-slate-400 font-medium pt-3 flex justify-between items-center">
                  <span>Branch: {alumnus.branch}</span>
                  <span>📍 {alumnus.location}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Alumni Registration Form */}
      <section className="py-20 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 max-w-3xl">
          <Card className="border border-border bg-card overflow-hidden">
            <div className="h-2 bg-accent" />
            <CardContent className="p-8 space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-2xl font-bold text-foreground">Alumni Directory Registry</h2>
                <p className="text-sm text-muted-foreground max-w-lg mx-auto">
                  Are you a proud YMKCOE graduate? Register in our central directory to connect with batchmates and guide current engineering students.
                </p>
              </div>

              {isSuccess ? (
                <div className="py-10 text-center space-y-4 flex flex-col items-center max-w-md mx-auto">
                  <div className="h-12 w-12 rounded-full bg-green-500/10 text-green-600 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground">Registration Successful!</h3>
                  <p className="text-sm text-muted-foreground">
                    Thank you for registering with the YMKCOE Alumni Directory. Your details will be reviewed, and we will update you once your profile page is listed in our index.
                  </p>
                  <Button 
                    onClick={() => {
                      setIsSuccess(false);
                      setFormData({
                        name: "",
                        email: "",
                        batch: "",
                        branch: "CSE",
                        company: "",
                        designation: "",
                        mentor: "No",
                      });
                    }}
                    className="bg-accent hover:bg-accent/90 text-white mt-4"
                  >
                    Register Another Profile
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="al-name">Full Name</Label>
                      <Input 
                        id="al-name" 
                        placeholder="Enter full name" 
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="al-email">Email ID</Label>
                      <Input 
                        id="al-email" 
                        type="email" 
                        placeholder="email@alumni.com" 
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required 
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="al-batch">Graduation Year (Batch)</Label>
                      <Input 
                        id="al-batch" 
                        placeholder="e.g. 2018" 
                        value={formData.batch}
                        onChange={(e) => setFormData({ ...formData, batch: e.target.value })}
                        required 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="al-branch">Branch at YMKCOE</Label>
                      <select 
                        id="al-branch"
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
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="al-company">Current Company / Organization</Label>
                      <Input 
                        id="al-company" 
                        placeholder="e.g. Google, TCS, Self-employed" 
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="al-desig">Designation / Role</Label>
                      <Input 
                        id="al-desig" 
                        placeholder="e.g. Cloud Architect, Software Engineer" 
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="al-mentor">Are you willing to mentor current students or host webinars?</Label>
                    <select 
                      id="al-mentor"
                      value={formData.mentor}
                      onChange={(e) => setFormData({ ...formData, mentor: e.target.value })}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      <option value="No">No, not at this time</option>
                      <option value="Mentorship">Yes, interested in active 1-on-1 student mentoring</option>
                      <option value="Webinars">Yes, interested in delivering guest webinars/lectures</option>
                      <option value="Referrals">Yes, interested in providing job referrals / interview tips</option>
                    </select>
                  </div>

                  <Button type="submit" className="w-full bg-accent hover:bg-accent/90 text-white font-semibold transition-all flex items-center justify-center gap-2 group/btn">
                    Register Profile <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </AppLayout>
  );
}
