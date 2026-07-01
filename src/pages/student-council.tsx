import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { Users, Star, BookOpen, Megaphone, Award, Handshake, ChevronRight, FileText, Download, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CouncilMember {
  name: string;
  post: string;
  branch: string;
  year: string;
  avatar?: string;
}

interface CommitteePillar {
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  bg: string;
}

const COUNCIL_MEMBERS: CouncilMember[] = [
  { name: "To Be Announced", post: "General Secretary", branch: "Computer Science & Engineering", year: "Third Year" },
  { name: "To Be Announced", post: "Cultural Secretary", branch: "Electronics & Telecommunication", year: "Third Year" },
  { name: "To Be Announced", post: "Sports Secretary", branch: "Mechanical Engineering", year: "Third Year" },
  { name: "To Be Announced", post: "Technical Secretary", branch: "Civil Engineering", year: "Second Year" },
  { name: "To Be Announced", post: "Ladies Representative", branch: "Computer Science & Engineering", year: "Second Year" },
  { name: "To Be Announced", post: "NSS Representative", branch: "Artificial Intelligence & DS", year: "Second Year" },
];

const PILLARS: CommitteePillar[] = [
  {
    icon: Megaphone,
    title: "Voice of Students",
    description: "The Student Council acts as a formal bridge between student community and college administration, ensuring student opinions are heard and addressed.",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-100 dark:bg-blue-950/30",
  },
  {
    icon: BookOpen,
    title: "Academic Excellence",
    description: "Promoting a culture of learning through seminars, workshops, peer tutoring programs, and collaboration with faculty for curriculum improvement.",
    color: "text-green-600 dark:text-green-400",
    bg: "bg-green-100 dark:bg-green-950/30",
  },
  {
    icon: Award,
    title: "Extracurricular Activities",
    description: "Organizing inter-collegiate events, cultural fests, technical competitions, and sports tournaments to bring out diverse talents of students.",
    color: "text-orange-600 dark:text-orange-400",
    bg: "bg-orange-100 dark:bg-orange-950/30",
  },
  {
    icon: Handshake,
    title: "Social Initiatives",
    description: "Driving NSS activities, community outreach programs, and environmental campaigns to build socially responsible graduates.",
    color: "text-purple-600 dark:text-purple-400",
    bg: "bg-purple-100 dark:bg-purple-950/30",
  },
];

const DOCUMENTS = [
  { title: "Student Council Constitution 2025-26", date: "July 2025" },
  { title: "Student Council Election Results 2025-26", date: "August 2025" },
  { title: "Annual Activities Report 2024-25", date: "June 2025" },
  { title: "Minutes of Meeting - February 2025", date: "February 2025" },
  { title: "Minutes of Meeting - October 2024", date: "October 2024" },
];

export default function StudentCouncil() {
  return (
    <AppLayout>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-secondary/30 via-primary/50 to-primary pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-4">
            <div className="bg-accent/20 p-3 rounded-full">
              <Users className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Student Council</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            The elected representative body of students at YMKCOE — empowering student voices, fostering leadership, and enriching campus life.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 items-center">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-accent/10 text-accent text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">
                <Star className="h-3.5 w-3.5" />
                About the Council
              </div>
              <h2 className="text-3xl font-bold text-primary">Representing Every Student</h2>
              <p className="text-muted-foreground leading-relaxed">
                The Student Council of Yashoda Mahadeo Kakade College of Engineering (YMKCOE) is an elected body formed annually to represent the interests of all students. The council works in close coordination with the college administration, faculty, and various committees to provide students a platform for academic, cultural, and social growth.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Guided by the principles set forth by the All India Council for Technical Education (AICTE) and affiliated university norms, the council ensures transparent and democratic student governance on campus.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {PILLARS.map((pillar, i) => (
                <Card key={i} className="hover:shadow-md transition-all duration-300">
                  <CardContent className="p-5 space-y-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${pillar.bg}`}>
                      <pillar.icon className={`h-5 w-5 ${pillar.color}`} />
                    </div>
                    <h3 className="font-bold text-sm text-primary">{pillar.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{pillar.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Council Members */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-4 mb-8">
            <Users className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-primary">Council Members 2025–26</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {COUNCIL_MEMBERS.map((member, i) => (
              <Card key={i} className="hover:shadow-md transition-all duration-300 border-border group">
                <CardContent className="p-6 space-y-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center text-accent font-bold text-lg shrink-0">
                      {member.name === "To Be Announced" ? "?" : member.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm text-primary group-hover:text-accent transition-colors">
                        {member.name}
                      </p>
                      <p className="text-xs text-accent font-semibold">{member.post}</p>
                    </div>
                  </div>
                  <div className="border-t pt-3 space-y-1">
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <ChevronRight className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{member.branch}</span>
                    </div>
                    <div className="flex items-start gap-2 text-xs text-muted-foreground">
                      <ChevronRight className="h-3.5 w-3.5 text-accent shrink-0 mt-0.5" />
                      <span>{member.year}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <p className="text-center text-xs text-muted-foreground mt-6 italic">
            * Council member details will be updated after formal elections. Contact the college for current information.
          </p>
        </div>
      </section>

      {/* Documents */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-4 mb-8">
            <FileText className="h-6 w-6 text-accent" />
            <h2 className="text-2xl font-bold text-primary">Official Documents</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DOCUMENTS.map((doc, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-5 bg-background border border-border rounded-xl hover:bg-muted/50 hover:border-accent/30 transition-all duration-200 group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-red-100 dark:bg-red-950/30 text-red-600 rounded-lg">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary text-sm group-hover:text-accent transition-colors">
                      {doc.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                      <Calendar className="h-3.5 w-3.5" />
                      <span>{doc.date}</span>
                    </div>
                  </div>
                </div>
                <Button asChild variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-accent hover:bg-accent/10">
                  <Link href="/404" title="Document coming soon">
                    <Download className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
