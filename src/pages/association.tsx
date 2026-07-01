import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { User, Mail, ShieldAlert, BookOpen, Star, HelpCircle } from "lucide-react";

interface Member {
  name: string;
  role: string;
  dept: string;
  email: string;
  year: string;
  initials: string;
  quote: string;
}

const COUNCIL_BOARD: Member[] = [
  {
    name: "Akshay Deshpande",
    role: "President",
    dept: "Computer Engineering",
    year: "Final Year (BE)",
    email: "president.sc@ymkcoe.com",
    initials: "AD",
    quote: "Striving to bridge the gap between students and administration while fostering a culture of innovation, inclusivity, and campus integrity.",
  },
  {
    name: "Snehal Salunke",
    role: "Vice President",
    dept: "Electronics & Telecommunication",
    year: "Final Year (BE)",
    email: "vp.sc@ymkcoe.com",
    initials: "SS",
    quote: "Empowering female engineering voices and promoting collaborative cross-departmental technical and social events.",
  },
  {
    name: "Pratik Gaikwad",
    role: "General Secretary",
    dept: "Mechanical Engineering",
    year: "Final Year (BE)",
    email: "gensec.sc@ymkcoe.com",
    initials: "PG",
    quote: "Dedicated to organizing efficient operational workflows, grievance handling, and maintaining college event structures.",
  },
  {
    name: "Neha Kulkarni",
    role: "Cultural Secretary",
    dept: "Information Technology",
    year: "Third Year (TE)",
    email: "cultural.sc@ymkcoe.com",
    initials: "NK",
    quote: "Creating platforms for student creative expression, coordinating our signature Tarang Fest, and hosting creative workshops.",
  },
  {
    name: "Aditya Jadhav",
    role: "Sports Secretary",
    dept: "Artificial Intelligence & Data Science",
    year: "Third Year (TE)",
    email: "sports.sc@ymkcoe.com",
    initials: "AJ",
    quote: "Promoting physical fitness, inter-collegiate tournaments, and regular exercise programs for student well-being.",
  },
];

const REPRESENTATIVES = [
  { branch: "Computer Engineering", crName: "Rohan Patil (BE)", lrName: "Divya Shah (TE)" },
  { branch: "Information Technology", crName: "Saurabh Joshi (TE)", lrName: "Anjali Gore (SE)" },
  { branch: "AI & Data Science", crName: "Harsh Vardhan (SE)", lrName: "Vaishnavi Mane (FE)" },
  { branch: "Electronics & TC", crName: "Ninad Shinde (BE)", lrName: "Rucha Gokhale (TE)" },
  { branch: "Mechanical Engineering", crName: "Mayur Patil (BE)", lrName: "Trupti Deshmukh (SE)" },
];

export default function AssociationPage() {
  return (
    <AppLayout>
      {/* Header */}
      <section className="relative bg-gradient-to-br from-primary/95 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.15),transparent)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4 inline-block">
            Student Governance
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Student Association & Council
          </h1>
          <p className="text-slate-300 text-lg">
            Meet the elected student leaders who represent student interests, organize college events, coordinate grievances, and foster student life at YMKCOE.
          </p>
        </div>
      </section>

      {/* Council Board */}
      <section className="py-20 container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
          Office Bearers 2025 - 2026
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {COUNCIL_BOARD.map((member, i) => (
            <Card key={i} className="group overflow-hidden border border-border bg-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
              <CardContent className="p-6 space-y-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4">
                    {/* Initials Avatar */}
                    <div className="h-16 w-16 rounded-2xl bg-accent/15 text-accent font-bold text-xl flex items-center justify-center border border-accent/20 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                      {member.initials}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold text-foreground leading-tight group-hover:text-accent transition-colors">
                        {member.name}
                      </h3>
                      <div className="text-sm font-semibold text-accent mt-0.5">{member.role}</div>
                      <div className="text-xs text-muted-foreground mt-0.5">{member.dept}</div>
                    </div>
                  </div>

                  <p className="text-muted-foreground text-sm italic leading-relaxed mt-6 relative pl-4 border-l-2 border-accent/40">
                    "{member.quote}"
                  </p>
                </div>

                <div className="border-t border-border/50 pt-4 mt-6 flex justify-between items-center text-xs text-muted-foreground">
                  <span>{member.year}</span>
                  <a href={`mailto:${member.email}`} className="flex items-center gap-1 hover:text-accent transition-colors font-medium">
                    <Mail className="h-3.5 w-3.5" /> Contact
                  </a>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Class Representatives Table */}
      <section className="py-16 bg-muted/20 border-t border-b border-border">
        <div className="container mx-auto px-4 max-w-4xl">
          <h2 className="text-2xl font-bold text-center mb-2 text-foreground">Department Representatives</h2>
          <p className="text-sm text-muted-foreground text-center mb-10">
            Student council representatives from each academic department.
          </p>

          <Card className="border border-border/60 bg-card overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted text-foreground text-xs uppercase font-bold border-b border-border">
                  <tr>
                    <th className="px-6 py-4">Department Branch</th>
                    <th className="px-6 py-4">Class Representative (CR)</th>
                    <th className="px-6 py-4">Ladies Representative (LR)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/60">
                  {REPRESENTATIVES.map((rep, idx) => (
                    <tr key={idx} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-semibold text-foreground">{rep.branch}</td>
                      <td className="px-6 py-4 text-muted-foreground">{rep.crName}</td>
                      <td className="px-6 py-4 text-muted-foreground">{rep.lrName}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </section>

      {/* Student Welfare Section */}
      <section className="py-20 container mx-auto px-4 max-w-4xl text-center space-y-8">
        <h2 className="text-3xl font-bold text-foreground">Student Support & Welfare</h2>
        <p className="text-muted-foreground text-base max-w-2xl mx-auto leading-relaxed">
          The Council works alongside college faculty sub-committees to resolve academic concerns, ensure hostel safety, organize travel concessions, and promote anti-ragging measures.
        </p>

        <div className="grid md:grid-cols-3 gap-6 pt-4 text-left">
          <div className="p-6 rounded-xl border border-border/60 bg-card space-y-3">
            <ShieldAlert className="h-6 w-6 text-accent" />
            <h3 className="font-bold text-foreground">Anti-Ragging Squad</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Zero tolerance policy. Secure, anonymous portal for students to report code violations directly.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border/60 bg-card space-y-3">
            <BookOpen className="h-6 w-6 text-accent" />
            <h3 className="font-bold text-foreground">Library Council</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Enables regular student voting for procuring new tech journals, references, and books.
            </p>
          </div>
          <div className="p-6 rounded-xl border border-border/60 bg-card space-y-3">
            <Star className="h-6 w-6 text-accent" />
            <h3 className="font-bold text-foreground">Student Grievances</h3>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Direct council support channels for catering food safety, clean drinking water, and infrastructure needs.
            </p>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
