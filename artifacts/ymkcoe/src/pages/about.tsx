import { useState, useEffect } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Building2, Target, Eye, Award, GraduationCap, Flame, Calendar, Quote, CheckCircle2 } from "lucide-react";
import { CountUp } from "@/components/CountUp";

interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: "1965",
    title: "IVM Trust Foundation",
    description: "Indrayani Vidya Mandir (IVM) educational trust is registered. Celebrated writer and social reformer Acharya P. K. Atre and co-founders establish the society to provide high-quality education to the rural and semi-urban communities of the Maval region.",
  },
  {
    year: "1990",
    title: "Campus Development",
    description: "Extensive expansion of the physical infrastructure at Talegaon Dabhade, laying down modern administrative facilities and classrooms to support multi-stream curriculum tracks.",
  },
  {
    year: "2012",
    title: "Inception of YMKCOE",
    description: "Yashoda Mahadeo Kakade College of Engineering is established, launching premium degree courses in engineering fields, equipping local youth with competitive industrial capabilities.",
  },
  {
    year: "2026",
    title: "DBATU Affiliation & Smart Campus",
    description: "YMKCOE transitions into a smart digital campus, securing DBATU affiliation, launching advanced research incubators, and modernizing labs in Artificial Intelligence, CSE, and E&TC.",
  },
];

interface Leader {
  id: string;
  name: string;
  title: string;
  image: string;
  message: string;
  tabLabel?: string;
}

const LEADERS: Leader[] = [
  {
    id: "president",
    name: "Shri. Ramdas Kakade",
    title: "President, Indrayani Vidya Mandir (IVM)",
    image: "/president.jpg",
    message: "Since 1965, Indrayani Vidya Mandir has stood as a beacon of educational transformation in the Maval region. Our mission is to democratize high-quality technical instruction, ensuring that every bright mind, regardless of economic background, has the tools to excel, innovate, and contribute to our nation's progress.",
    tabLabel: "Ramdas Kakade",
  },
  {
    id: "secretary",
    name: "Shri. Chandrakant Shete",
    title: "Secretary, Indrayani Vidya Mandir (IVM)",
    image: "/secretary.jpg",
    message: "A modern engineering campus must bridge the gap between academic theory and industry reality. At YMKCOE, we invest in state-of-the-art laboratory infrastructure, nurture strong corporate partnerships, and foster career development to guide our students straight into top-tier tech roles.",
    tabLabel: "Chandrakant Shete",
  },
  {
    id: "principal",
    name: "Prof. Dr. N. G. Narve",
    title: "Principal, YMKCOE",
    image: "/director.jpg",
    message: "Academic excellence, scientific research, and disciplined leadership form the core pillars of YMKCOE. We emphasize hands-on project experience, hackathons, and creative student societies to prepare DBATU graduates who are both technically skilled and socially responsible.",
    tabLabel: "Prof. Dr. N. G. Narve",
  },
];

export default function About() {
  const [activeLeader, setActiveLeader] = useState<string>("president");
  const [activeTimelineIdx, setActiveTimelineIdx] = useState<number>(0);

  // Cyclic animation to automatically progress the timeline every 4 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setActiveTimelineIdx((prev) => (prev + 1) % TIMELINE_EVENTS.length);
    }, 4000);
    return () => clearTimeout(timer);
  }, [activeTimelineIdx]);

  const selectedLeader = LEADERS.find(l => l.id === activeLeader) || LEADERS[0];
  const selectedEvent = TIMELINE_EVENTS[activeTimelineIdx];

  return (
    <AppLayout>
      {/* Hero Header */}
      <section className="relative bg-gradient-to-br from-primary/95 to-slate-900 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(249,115,22,0.12),transparent)] pointer-events-none" />
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4 inline-block tracking-wider uppercase">
            About YMKCOE
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-100 to-slate-300">
            Yashoda Mahadeo Kakade
          </h1>
          <p className="text-xl md:text-2xl text-accent font-semibold tracking-wide mb-6">
            College of Engineering
          </p>
          <p className="text-slate-300 text-lg leading-relaxed">
            Founded under the legendary Indrayani Vidya Mandir (IVM) trust, YMKCOE has been preparing pioneers, innovators, and engineering leaders since its legacy started in 1965.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-accent to-yellow-500 mx-auto rounded-full mt-6" />
        </div>
      </section>

      {/* Stats Counter Strip */}
      <section className="py-12 bg-muted/30 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { label: "Established", val: 1965, suffix: "", useGrouping: false, icon: Calendar, color: "text-blue-600 bg-blue-500/10" },
              { label: "Campus Area", val: 15, suffix: " Acres", useGrouping: true, icon: Building2, color: "text-orange-500 bg-orange-500/10" },
              { label: "Total Seats", val: 360, suffix: "", useGrouping: true, icon: GraduationCap, color: "text-purple-600 bg-purple-500/10" },
              { label: "Lab Facilities", val: 40, suffix: "+", useGrouping: true, icon: Flame, color: "text-green-600 bg-green-500/10" },
            ].map((stat, idx) => (
              <Card key={idx} className="border-border/60 bg-card hover:shadow-md transition-shadow">
                <CardContent className="p-6 flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${stat.color}`}>
                    <stat.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="text-3xl font-bold tracking-tight text-foreground">
                      <CountUp end={stat.val} suffix={stat.suffix} useGrouping={stat.useGrouping} />
                    </div>
                    <div className="text-sm text-muted-foreground font-medium">{stat.label}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Messages Tab Switcher */}
      <section className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="text-center mb-12">
            <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full">
              Leadership Messages
            </span>
            <h2 className="text-3xl font-bold text-primary mt-3">From the Desk of Leaders</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">
              Our administrative leaders steer YMKCOE with values of social equity, academic rigor, and professional excellence.
            </p>
          </div>

          {/* Leader Tab Buttons */}
          <div className="flex justify-center flex-wrap gap-2 md:gap-4 mb-10">
            {LEADERS.map((leader) => (
              <Button
                key={leader.id}
                variant={activeLeader === leader.id ? "default" : "outline"}
                className={`rounded-full h-11 px-6 font-semibold transition-all ${
                  activeLeader === leader.id 
                    ? "bg-primary text-primary-foreground shadow-lg" 
                    : "border-border hover:bg-muted text-foreground"
                }`}
                onClick={() => setActiveLeader(leader.id)}
              >
                {leader.tabLabel || leader.name}
              </Button>
            ))}
          </div>

          {/* Active Leader Message Card */}
          <Card className="border-border/60 overflow-hidden shadow-lg bg-card">
            <CardContent className="p-0">
              <div className="grid grid-cols-1 md:grid-cols-12">
                {/* Photo Column */}
                <div className="md:col-span-4 bg-muted flex items-center justify-center relative min-h-[300px]">
                  <img
                    src={selectedLeader.image}
                    alt={selectedLeader.name}
                    className="w-full h-full object-cover absolute inset-0 filter brightness-95"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:hidden" />
                  <div className="absolute bottom-4 left-4 text-white md:hidden">
                    <h3 className="text-xl font-bold">{selectedLeader.
                    name}</h3>
                    <p className="text-xs text-slate-300 font-medium">{selectedLeader.title}</p>
                  </div>
                </div>

                {/* Text Message Column */}
                <div className="md:col-span-8 p-8 md:p-12 flex flex-col justify-center space-y-6">
                  <div className="hidden md:block">
                    <h3 className="text-2xl font-bold text-primary">{selectedLeader.name}</h3>
                    <p className="text-sm font-semibold text-accent mt-1">{selectedLeader.title}</p>
                  </div>
                  
                  <div className="relative">
                    <Quote className="absolute -top-6 -left-6 h-10 w-10 text-accent/15 transform -scale-x-100" />
                    <p className="text-muted-foreground text-base md:text-lg leading-relaxed italic relative z-10 pl-2">
                      "{selectedLeader.message}"
                    </p>
                  </div>

                  <div className="pt-4 border-t border-border/60 flex items-center gap-2.5 text-xs text-muted-foreground font-semibold uppercase tracking-wider">
                    <CheckCircle2 className="h-4 w-4 text-green-500" /> Verified Welcome Address
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Vision & Mission Card Grid */}
      <section className="py-20 bg-muted/20 border-b border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Vision */}
            <Card className="border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 bg-card group hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                  <Eye className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Our Vision</h3>
                <p className="text-muted-foreground leading-relaxed text-base">
                  "To provide higher &amp; quality education and enable the students from economically weaker sections to become professionals in today's competitive world."
                </p>
              </CardContent>
            </Card>

            {/* Mission */}
            <Card className="border border-border/80 shadow-md hover:shadow-xl transition-all duration-300 bg-card group hover:-translate-y-1">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-xl bg-orange-500/10 border border-orange-500/30 flex items-center justify-center text-orange-500 mb-6 group-hover:scale-110 transition-transform">
                  <Target className="h-6 w-6" />
                </div>
                <h3 className="text-2xl font-bold text-primary mb-4">Our Mission</h3>
                <ul className="space-y-3">
                  {[
                    "To foster excellence in teaching, scholarship & service to develop a cadre of students with positive attitude, leadership skills & habit of lifelong learning.",
                    "To create an academic environment where the highest standards of scholarship & professional practice are observed.",
                    "To ensure achievement of overall education goals through effective, fair & efficient administration of career enhancement programs.",
                    "To use latest technology for the betterment of students and staff."
                  ].map((item, idx) => (
                    <li key={idx} className="flex gap-2.5 text-sm text-muted-foreground leading-relaxed">
                      <span className="text-accent font-black text-base select-none">&bull;</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Interactive History Timeline Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-accent uppercase tracking-wider bg-accent/10 px-3 py-1 rounded-full">
              Legacy Roadmap
            </span>
            <h2 className="text-3xl font-bold text-primary mt-3">History &amp; Milestones</h2>
            <p className="text-muted-foreground mt-2">
              Trace our roots and see how we evolved from a regional welfare trust to a digital engineering college.
            </p>
          </div>

          {/* Timeline Bar */}
          <div className="relative mb-12">
            <div className="absolute top-1/2 left-0 right-0 h-1 bg-border transform -translate-y-1/2 rounded-full" />
            <div 
              className="absolute top-1/2 left-0 h-1 bg-accent transform -translate-y-1/2 rounded-full transition-all duration-500"
              style={{ width: `${(activeTimelineIdx / (TIMELINE_EVENTS.length - 1)) * 100}%` }}
            />

            <div className="relative flex justify-between">
              {TIMELINE_EVENTS.map((event, idx) => (
                <button
                  key={event.year}
                  onClick={() => setActiveTimelineIdx(idx)}
                  className="flex flex-col items-center focus:outline-none group relative z-10"
                >
                  <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all duration-300 ${
                      activeTimelineIdx === idx 
                        ? "bg-accent border-accent text-white scale-110 shadow-lg shadow-accent/20" 
                        : "bg-background border-border text-muted-foreground group-hover:border-accent group-hover:text-accent"
                    }`}
                  >
                    {event.year}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Event Content Panel */}
          <Card className="border border-border/80 shadow-md bg-card transform transition-all duration-300 hover:shadow-lg">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl font-black text-accent">{selectedEvent.year}</span>
                <div className="h-5 w-[2px] bg-border" />
                <h4 className="text-lg font-bold text-primary">{selectedEvent.title}</h4>
              </div>
              <p className="text-muted-foreground leading-relaxed text-base">
                {selectedEvent.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </AppLayout>
  );
}
