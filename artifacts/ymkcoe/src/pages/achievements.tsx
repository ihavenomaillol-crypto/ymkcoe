import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Trophy, Code2, GraduationCap, Flame, Target } from "lucide-react";
import { CountUp } from "@/components/CountUp";

interface Achievement {
  id: string;
  title: string;
  category: "all" | "tech" | "sports" | "academic";
  winner: string;
  department: string;
  event: string;
  year: string;
  description: string;
  icon: typeof Trophy;
}

const ACHIEVEMENTS: Achievement[] = [
  {
    id: "1",
    title: "1st Place - Smart India Hackathon",
    category: "tech",
    winner: "Team InnoCoders",
    department: "Computer Engineering",
    event: "Smart India Hackathon 2025 National Finals",
    year: "2025",
    description: "Won first prize under the Ministry of Education category for designing a blockchain-secured verification platform for student diplomas.",
    icon: Code2,
  },
  {
    id: "2",
    title: "Gold Medal - University Cricket Championship",
    category: "sports",
    winner: "YMKCOE Cricket Team",
    department: "Inter-departmental",
    event: "DBATU Sports Meet",
    year: "2025",
    description: "Defeated DBATU main campus in a thrilling final to secure the championship gold for the second consecutive year.",
    icon: Trophy,
  },
  {
    id: "3",
    title: "Best Research Paper Award",
    category: "academic",
    winner: "Aniket Deshmukh & Dr. S. R. Patil",
    department: "Electronics & Telecommunication",
    event: "IEEE International Conference on Advanced Computing",
    year: "2024",
    description: "Published and presented research on utilizing Edge AI for real-time traffic signal optimization in smart cities.",
    icon: GraduationCap,
  },
  {
    id: "4",
    title: "Winner - National Robotics Championship",
    category: "tech",
    winner: "YMKCOE RoboTeam",
    department: "Mechanical & CSE Joint Team",
    event: "Robotryst IIT Delhi",
    year: "2025",
    description: "Our autonomous maze-solving bot registered the fastest completion time of 14.8 seconds, beating 45 competing institutions.",
    icon: Code2,
  },
  {
    id: "5",
    title: "Outstanding Sportsman of the Year",
    category: "sports",
    winner: "Rohan Gaikwad",
    department: "Information Technology",
    event: "National Athletics Meet",
    year: "2024",
    description: "Secured Silver in the 100m sprint and Gold in Long Jump, registering new college records.",
    icon: Award,
  },
  {
    id: "6",
    title: "Patent Filed for Smart Irrigation System",
    category: "academic",
    winner: "Prof. M. B. Joshi & Students",
    department: "Artificial Intelligence & Data Science",
    event: "Indian Patent Office",
    year: "2025",
    description: "Developed and filed a patent for an automated, low-cost solar-powered soil moisture sensing and irrigation valve control network.",
    icon: Target,
  },
];

const STATS = [
  { label: "Hackathon Wins", val: 12, suffix: "+", icon: Flame, color: "text-orange-500 bg-orange-500/10" },
  { label: "Sports Trophies", val: 45, suffix: "+", icon: Trophy, color: "text-yellow-500 bg-yellow-500/10" },
  { label: "Research Papers", val: 180, suffix: "+", icon: GraduationCap, color: "text-blue-500 bg-blue-500/10" },
  { label: "National Awards", val: 15, suffix: "+", icon: Award, color: "text-green-500 bg-green-500/10" },
];

export default function AchievementsPage() {
  const [filter, setFilter] = useState<"all" | "tech" | "sports" | "academic">("all");

  const filteredAchievements = filter === "all"
    ? ACHIEVEMENTS
    : ACHIEVEMENTS.filter(a => a.category === filter);

  return (
    <AppLayout>
      {/* Header */}
      <section className="relative bg-gradient-to-br from-primary/95 to-slate-900 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.15),transparent)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4 inline-block">
            Student Pride
          </span>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Student Achievements
          </h1>
          <p className="text-slate-300 text-lg">
            At YMKCOE, our students consistently excel beyond the classroom, winning laurels in technology, sports, academics, and research nationwide.
          </p>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {STATS.map((stat, i) => (
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

      {/* Grid Section */}
      <section className="py-16 container mx-auto px-4">
        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {(["all", "tech", "sports", "academic"] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                filter === cat
                  ? "bg-accent text-white shadow-lg shadow-accent/20 scale-105"
                  : "bg-muted hover:bg-muted/80 text-foreground"
              }`}
            >
              {cat === "all" && "🏆 Show All"}
              {cat === "tech" && "💻 Hackathons & Coding"}
              {cat === "sports" && "⚽ Sports & Athletics"}
              {cat === "academic" && "📚 Academic & Research"}
            </button>
          ))}
        </div>

        {/* Achievements Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAchievements.map((item) => {
            const Icon = item.icon;
            return (
              <Card key={item.id} className="group overflow-hidden border-border/50 hover:border-accent/40 bg-card hover:shadow-xl transition-all duration-300 flex flex-col justify-between">
                <CardContent className="p-6 space-y-4 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-xs font-bold text-accent tracking-wider uppercase bg-accent/10 px-2.5 py-1 rounded-md">
                        {item.category === "tech" && "Technology"}
                        {item.category === "sports" && "Sports"}
                        {item.category === "academic" && "Research"}
                      </span>
                      <span className="text-sm font-semibold text-muted-foreground">{item.year}</span>
                    </div>

                    <div className="flex items-start gap-3 mt-4">
                      <div className="p-2.5 rounded-lg bg-accent/5 text-accent border border-accent/10 group-hover:bg-accent group-hover:text-white transition-colors duration-300">
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-bold group-hover:text-accent transition-colors leading-snug">
                        {item.title}
                      </h3>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed mt-4">
                      {item.description}
                    </p>
                  </div>

                  <div className="border-t border-border/50 pt-4 mt-6 space-y-1">
                    <div className="text-xs text-muted-foreground font-medium">Achieved by:</div>
                    <div className="text-sm font-bold text-foreground">{item.winner}</div>
                    <div className="text-xs text-slate-400 font-medium">{item.department}</div>
                    <div className="text-xs text-slate-400 italic font-medium">Venue: {item.event}</div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </AppLayout>
  );
}
