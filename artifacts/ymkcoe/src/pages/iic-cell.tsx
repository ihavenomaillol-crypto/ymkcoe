import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Target, Users, Sparkles, BookOpen, Rocket, ShieldCheck, ArrowRight, UserCircle, Briefcase } from "lucide-react";

const initiatives = [
  {
    title: "Innovation & Entrepreneurship Promotion",
    description: "Encouraging student-led innovation, startup thinking, and prototype development through campus activities and mentorship.",
    icon: Lightbulb,
  },
  {
    title: "Ideation to Incubation Support",
    description: "Helping students transform ideas into practical solutions with guidance from faculty, mentors, and industry collaborators.",
    icon: Rocket,
  },
  {
    title: "Collaborative Learning & Mentorship",
    description: "Creating a platform for faculty, students, and external experts to exchange knowledge and build impactful projects.",
    icon: Users,
  },
];

const focusAreas = [
  "Promote innovation culture among students and faculty",
  "Support prototype development and problem-solving initiatives",
  "Encourage participation in innovation challenges and startup ecosystems",
  "Create awareness of intellectual property, design thinking, and entrepreneurship",
  "Bridging the gap between Industry and Academia",
  "Facilitating internships, industrial visits, and expert lectures"
];

export default function IICCell() {
  return (
    <AppLayout>
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/95 to-slate-900 text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(249,115,22,0.25),transparent_45%)]" />
        <div className="container mx-auto px-4 py-20 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 border-white/20 bg-white/10 text-white hover:bg-white/20">
              Institution's Innovation Council & Industry Interaction
            </Badge>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
              IIIC Cell at YMKCOE
            </h1>
            <p className="mt-6 text-lg md:text-xl text-slate-200 leading-relaxed">
              The Industry-Institution Interaction Cell (IIIC) at Yashoda Mahadeo Kakade College of Engineering nurtures creativity, entrepreneurship, and industry-aligned innovation among students and faculty.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] items-start">
            <Card className="border-border/70 shadow-sm">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-full bg-accent/10 p-3 text-accent">
                    <Briefcase className="h-6 w-6" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">About IIIC</p>
                    <h2 className="text-2xl font-bold text-primary">Industry-Institution Interaction</h2>
                  </div>
                </div>
                <p className="text-muted-foreground leading-relaxed text-base mb-4">
                  An ongoing interaction between the Industry and Institute is essential in today's dynamic world. To strengthen the relationship between industry and our institute, the Industry-Institution Interaction Cell (IIIC) provides an excellent platform for both the students and the faculty.
                </p>
                <p className="text-muted-foreground leading-relaxed text-base">
                  YMKCOE’s IIIC works as a bridge between academic learning and real-world innovation. It encourages students to think beyond classrooms, explore new ideas, and develop solutions that can create social and industrial impact while adapting to industry needs.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Badge variant="secondary" className="rounded-full px-3 py-1">Industry Connect</Badge>
                  <Badge variant="secondary" className="rounded-full px-3 py-1">Entrepreneurship</Badge>
                  <Badge variant="secondary" className="rounded-full px-3 py-1">Innovation Culture</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/70 shadow-sm bg-muted/20">
              <CardContent className="p-8 md:p-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="rounded-full bg-primary/10 p-3 text-primary">
                    <UserCircle className="h-6 w-6" />
                  </div>
                  <h2 className="text-2xl font-bold text-primary">Coordinator's Desk</h2>
                </div>
                <blockquote className="border-l-4 border-accent pl-4 italic text-muted-foreground mb-6">
                  "Our goal is to foster a strong bond between industry and academia, bridging the gap to produce highly skilled, industry-ready professionals. We actively seek to provide our students with the best exposure to current industrial practices."
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 font-bold text-xl">
                    <UserCircle className="h-8 w-8" />
                  </div>
                  <div>
                    <p className="font-bold text-primary">IIIC Coordinator</p>
                    <p className="text-sm text-muted-foreground">YMKCOE</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-muted/25 border-t border-b border-border">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid gap-8 lg:grid-cols-2 items-start">
            <div>
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Key Focus</p>
                <h2 className="text-3xl font-bold text-primary mt-2">Objectives & Focus Areas</h2>
              </div>
              <Card className="border-border/70 shadow-sm">
                <CardContent className="p-6 md:p-8">
                  <ul className="space-y-4">
                    {focusAreas.map((item) => (
                      <li key={item} className="flex items-start gap-3 text-sm text-muted-foreground">
                        <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
            
            <div>
              <div className="mb-8">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">What the cell does</p>
                <h2 className="text-3xl font-bold text-primary mt-2">Driving innovation through engagement</h2>
              </div>
              <div className="flex flex-col gap-4">
                {initiatives.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Card key={item.title} className="border-border/70 shadow-sm hover:-translate-y-1 transition-transform">
                      <CardContent className="p-5 flex gap-4">
                        <div className="rounded-xl bg-accent/10 p-3 h-fit text-accent shrink-0">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-primary mb-1">{item.title}</h3>
                          <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <Card className="border-border/70 shadow-sm overflow-hidden">
            <CardContent className="p-8 md:p-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-accent">Join the journey</p>
                  <h2 className="text-2xl font-bold text-primary mt-2">Be a part of YMKCOE’s innovation ecosystem</h2>
                  <p className="text-muted-foreground mt-3 max-w-2xl">
                    The IIIC Cell empowers students to explore, create, and contribute with confidence through guided innovation activities, industrial exposure, and student-centric initiatives.
                  </p>
                </div>
                <a
                  href="/contact"
                  className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 whitespace-nowrap"
                >
                  Contact the college <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </AppLayout>
  );
}

