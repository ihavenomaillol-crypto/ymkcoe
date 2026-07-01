import { Link, useLocation } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import {
  Home,
  Wifi,
  UtensilsCrossed,
  ShieldCheck,
  BedDouble,
  Clock,
  Phone,
  Mail,
  ChevronRight,
  Dumbbell,
} from "lucide-react";

const HOSTEL_CONFIG = {
  girls: {
    type: "Girls' Hostel",
    pronoun: "Girls'",
    icon: "🏠",
    heroColor: "from-pink-700 to-primary",
    capacity: "Accommodation for girl students of YMKCOE",
    description:
      "YMKCOE's Girls' Hostel provides a safe, comfortable, and conducive residential facility for female engineering students. Located within close proximity of the college campus, the hostel ensures a secure and supportive environment.",
    features: [
      { icon: BedDouble, title: "Furnished Rooms", desc: "Well-furnished rooms available in single, double, and triple occupancy configurations." },
      { icon: UtensilsCrossed, title: "Mess Facility", desc: "Nutritious and hygienic meals served thrice daily by the in-house mess committee." },
      { icon: Wifi, title: "24/7 Wi-Fi", desc: "High-speed internet connectivity throughout the hostel premises." },
      { icon: ShieldCheck, title: "24-Hour Security", desc: "Round-the-clock security with CCTV surveillance and trained security personnel." },
      { icon: Dumbbell, title: "Recreation Area", desc: "Common room with indoor games, TV, and reading area for leisure activities." },
      { icon: Clock, title: "Timings", desc: "Strict entry/exit timings maintained for the safety and discipline of all residents." },
    ],
    rules: [
      "All residents must return to the hostel by the prescribed curfew time.",
      "Visitors are allowed only in the designated areas during visiting hours.",
      "Residents must maintain cleanliness and discipline in the hostel premises.",
      "Consumption of tobacco, alcohol, or any prohibited substances is strictly forbidden.",
      "Any damage to hostel property will be recovered from the responsible resident.",
      "All residents must register their local guardian details with the hostel warden.",
    ],
    contact: {
      warden: "Warden, Girls' Hostel, YMKCOE",
      phone: "+91 89836 83005",
      email: "hostel.girls@ymkcoe.com",
    },
  },
  boys: {
    type: "Boys' Hostel",
    pronoun: "Boys'",
    icon: "🏠",
    heroColor: "from-blue-800 to-primary",
    capacity: "Accommodation for boy students of YMKCOE",
    description:
      "YMKCOE's Boys' Hostel offers a comfortable and disciplined residential environment for male engineering students. The hostel is designed to foster academic excellence while providing all essential amenities.",
    features: [
      { icon: BedDouble, title: "Furnished Rooms", desc: "Well-furnished rooms available in single, double, and triple occupancy configurations." },
      { icon: UtensilsCrossed, title: "Mess Facility", desc: "Nutritious and hygienic meals served thrice daily by the in-house mess committee." },
      { icon: Wifi, title: "24/7 Wi-Fi", desc: "High-speed internet connectivity throughout the hostel premises." },
      { icon: ShieldCheck, title: "24-Hour Security", desc: "Round-the-clock security with CCTV surveillance and trained security personnel." },
      { icon: Dumbbell, title: "Sports & Recreation", desc: "Indoor games room, gym access, and outdoor sports facilities for physical well-being." },
      { icon: Clock, title: "Timings", desc: "Regulated entry/exit timings maintained for the safety and discipline of all residents." },
    ],
    rules: [
      "All residents must return to the hostel by the prescribed curfew time.",
      "Visitors are allowed only in the designated areas during visiting hours.",
      "Residents must maintain cleanliness and discipline in the hostel premises.",
      "Consumption of tobacco, alcohol, or any prohibited substances is strictly forbidden.",
      "Any damage to hostel property will be recovered from the responsible resident.",
      "All residents must register their parent/guardian details with the hostel warden.",
    ],
    contact: {
      warden: "Warden, Boys' Hostel, YMKCOE",
      phone: "+91 89836 73005",
      email: "hostel.boys@ymkcoe.com",
    },
  },
};

export default function HostelPage() {
  const [location] = useLocation();

  if (location === "/students/hostels" || location.endsWith("/hostels")) {
    return (
      <AppLayout>
        {/* Portal Hero */}
        <section className="relative bg-gradient-to-br from-primary/95 to-slate-900 text-white py-20 overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(120,119,198,0.15),transparent)] pointer-events-none" />
          <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
            <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold mb-4 inline-block">
              Accommodation
            </span>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
              Residential Hostels
            </h1>
            <p className="text-slate-300 text-lg">
              YMKCOE offers secure, clean, and comfortable living spaces for students. Our hostels provide a supportive community that helps transition smoothly into engineering studies.
            </p>
          </div>
        </section>

        {/* Portals Grid */}
        <section className="py-20 container mx-auto px-4 max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Girls Hostel */}
            <Card className="group overflow-hidden border border-border bg-card hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="h-4 bg-gradient-to-r from-pink-500 to-pink-700" />
              <CardContent className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">👩‍🎓</span>
                    <h2 className="text-2xl font-bold group-hover:text-pink-600 transition-colors">Girls' Hostel</h2>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    A safe, comfortable, and disciplined residential building equipped with modern facilities, providing female students with a peaceful environment.
                  </p>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-center gap-2">✅ Well-furnished study spaces</li>
                    <li className="flex items-center gap-2">✅ Nutritious in-house dining</li>
                    <li className="flex items-center gap-2">✅ 24/7 CCTV & Security</li>
                    <li className="flex items-center gap-2">✅ Dedicated resident warden</li>
                  </ul>
                </div>
                <Link href="/students/girls-hostel">
                  <span className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-pink-600 hover:bg-pink-700 text-white font-semibold transition-all hover:translate-x-1 cursor-pointer w-full justify-center">
                    Explore Girls' Hostel <ChevronRight className="h-4 w-4" />
                  </span>
                </Link>
              </CardContent>
            </Card>

            {/* Boys Hostel */}
            <Card className="group overflow-hidden border border-border bg-card hover:shadow-2xl transition-all duration-300 flex flex-col">
              <div className="h-4 bg-gradient-to-r from-blue-600 to-blue-800" />
              <CardContent className="p-8 flex-1 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl">👨‍🎓</span>
                    <h2 className="text-2xl font-bold group-hover:text-blue-600 transition-colors">Boys' Hostel</h2>
                  </div>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    A lively yet disciplined residential complex fostering camaraderie, academic progress, and physical well-being.
                  </p>
                  <ul className="space-y-2 text-sm text-foreground/80">
                    <li className="flex items-center gap-2">✅ Spacious rooms with storage</li>
                    <li className="flex items-center gap-2">✅ Sports ground & gym access</li>
                    <li className="flex items-center gap-2">✅ High-speed Wi-Fi network</li>
                    <li className="flex items-center gap-2">✅ Healthy food facilities</li>
                  </ul>
                </div>
                <Link href="/students/boys-hostel">
                  <span className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition-all hover:translate-x-1 cursor-pointer w-full justify-center">
                    Explore Boys' Hostel <ChevronRight className="h-4 w-4" />
                  </span>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </AppLayout>
    );
  }

  const hostelType = location.includes("girls") ? "girls" : "boys";
  const hostel = HOSTEL_CONFIG[hostelType];

  return (
    <AppLayout>
      {/* Hero */}
      <section data-scroll-reveal className={`bg-gradient-to-br ${hostel.heroColor} text-white py-16 md:py-20 relative overflow-hidden`}>
        <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "radial-gradient(circle at 70% 30%, white 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="text-4xl">{hostel.icon}</div>
            <span className="text-sm font-semibold bg-white/20 px-3 py-1 rounded-full">Student's Corner</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{hostel.type}</h1>
          <p className="text-base md:text-lg text-white/80 max-w-2xl leading-relaxed">
            {hostel.description}
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section data-scroll-reveal className="py-14 bg-background">
        <div className="container mx-auto px-4 space-y-10">
          <div>
            <h2 className="text-2xl font-bold text-primary mb-2">Facilities & Amenities</h2>
            <p className="text-sm text-muted-foreground">
              We provide a supportive residential experience that allows students to focus on their academics.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {hostel.features.map((f, i) => (
              <Card key={i} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6 space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                    <f.icon className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-semibold text-primary">{f.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Rules & Contact */}
      <section data-scroll-reveal className="py-14 bg-muted/30 border-t border-border">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Rules */}
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-1">Hostel Rules & Regulations</h2>
              <p className="text-sm text-muted-foreground">All residents are expected to abide by the following rules.</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <ul className="space-y-3">
                  {hostel.rules.map((rule, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                      <ChevronRight className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Contact */}
          <div className="space-y-5">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-1">Contact & Enquiry</h2>
              <p className="text-sm text-muted-foreground">For admissions, queries, or more details about the hostel.</p>
            </div>
            <Card>
              <CardContent className="p-6 space-y-5">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                    <Home className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="font-semibold text-primary text-sm">{hostel.contact.warden}</p>
                    <p className="text-xs text-muted-foreground">
                      Yashoda Mahadeo Kakade College of Engineering, Pune – Nashik Highway, Wadgaon BK, Pune – 412106
                    </p>
                  </div>
                </div>
                <div className="border-t border-border pt-4 space-y-3">
                  <a href={`tel:${hostel.contact.phone}`} className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors">
                    <Phone className="h-4 w-4 text-accent" />
                    <span>{hostel.contact.phone}</span>
                  </a>
                  <a href={`mailto:${hostel.contact.email}`} className="flex items-center gap-3 text-sm text-foreground hover:text-accent transition-colors">
                    <Mail className="h-4 w-4 text-accent" />
                    <span>{hostel.contact.email}</span>
                  </a>
                </div>
              </CardContent>
            </Card>
            <Card className="border-accent/30 bg-accent/5">
              <CardContent className="p-5">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">Note:</span> Hostel allocation is done on a first-come, first-served basis. Admission to the hostel is separate from college admission. Contact the hostel office for availability and fee structure.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
