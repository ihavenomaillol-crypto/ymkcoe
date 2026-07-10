import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { CountUp } from "@/components/CountUp";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, GraduationCap, Users, Building, Trophy, CheckCircle2, MessageSquare, Quote, Landmark, History, ChevronLeft, ChevronRight } from "lucide-react";
import { useGetNews } from "@workspace/api-client-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { AdmissionPopup } from "@/components/AdmissionPopup";

const LEADERS = [
  {
    name: "Hon. Shri Ramdas Kakade",
    role: "President",
    organization: "Indrayani Vidya Mandir",
    image: "/president.jpg",
    preview: "\"Indrayani Vidya Mandir has a distinctive mission and history that has made it the leader in the field of education in Maval area. Today's Education not only focuses on imparting knowledge and skills but also on the overall development of the students. The Indrayani Institute of Yashoda Mahadeo Kakade College...\"",
    message: `Message from the President's Desk

Indrayani Vidya Mandir has a distinctive mission and history that has made it the leader in the field of education in Maval area.

Today's Education not only focuses on imparting knowledge and skills but also on the overall development of the students. The Indrayani Institute of Yashoda Mahadeo Kakade College of Engineering is geared up to provide you with the experienced faculty, facilities and infrastructure to prepare you for the tough challenges ahead.

We are providing our students an opportunity for personal development and bringing about social reforms in this very vital sector. We believe that the students leaving this campus should leave with confidence in their abilities, a sense of responsibility towards society and be fully equipped to face the challenges of life with dignity.

President
Indrayani Vidya Mandir.`,
  },
  {
    name: "Hon. Shri Chandrakant Shete",
    role: "Secretary",
    organization: "Indrayani Vidya Mandir",
    image: "/secretary.jpg",
    preview: "\"Learning is not a process that ends with the conclusion of one's college career. It is indeed a lifelong process. This college is oriented to the total formation of a ward and to adaptations of various methods suiting the dynamics of a changing world...\"",
    message: `Message from the Secretary's Desk

Learning is not a process that ends with the conclusion of one's college career. It is indeed a lifelong process.

This college is oriented to the total formation of a ward and to adaptations of various methods suiting the dynamics of a changing world in order to achieve common goals and objectives. Our commitment to such learning will always persist in all our endeavors.

Our faculty continues to provide their expertise through the continuing education programmes. The departments have also established rich and formal relationships with the industry through courses and regular classroom interactions, inviting industry professionals, and conducting seminars and other soft skill programmes.

I sincerely hope that our students will use the facilities provided to them on our campus, find their profession, and justify the trust placed in them by their family, Society, and Nation.

Secretary
Indrayani Vidya Mandir.`,
  },
  {
    name: "Prof. Dr. N. G. Narve",
    role: "Administrative Officer (IVM) | Principal",
    organization: "YMKCOE",
    image: "/director.jpg",
    preview: "\"Academic excellence, scientific research, and disciplined leadership form the core pillars of YMKCOE. We emphasize hands-on project experience, hackathons, and creative student societies to prepare DBATU graduates who are both technically skilled and socially responsible.\"",
    message: `Message from the Principal's Desk

Academic excellence, scientific research, and disciplined leadership form the core pillars of YMKCOE. We emphasize hands-on project experience, hackathons, and creative student societies to prepare DBATU graduates who are both technically skilled and socially responsible.

We look forward to supporting you in shaping a purposeful and successful future.

Principal
YMKCOE.`,
  },
  {
    name: "Dr. Amruta Surana",
    role: "Vice Principal",
    organization: "YMKCOE",
    image: "/vice_principal.png",
    preview: "\"At YMKCOE, our focus is on fostering a dynamic academic environment that bridges the gap between theoretical knowledge and practical application. We strive to nurture young minds...\"",
    message: `Message from the Vice Principal's Desk

At YMKCOE, our focus is on fostering a dynamic academic environment that bridges the gap between theoretical knowledge and practical application. We strive to nurture young minds to become innovative problem solvers.

Through our rigorous curriculum, state-of-the-art facilities, and dedicated faculty, we ensure that every student receives the guidance and support needed to excel in their chosen field of engineering. 

We are committed to empowering our students with the skills and confidence to succeed in the ever-evolving technological landscape.

Vice Principal
YMKCOE.`,
  },
];

export default function Home() {
  const { data: news = [] } = useGetNews({ category: "announcement" });

  const [modalOpen, setModalOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const openLeader = (index: number) => {
    setActiveIndex(index);
    setModalOpen(true);
  };

  const prevLeader = () => setActiveIndex((i) => (i - 1 + LEADERS.length) % LEADERS.length);
  const nextLeader = () => setActiveIndex((i) => (i + 1) % LEADERS.length);

  const activeLeader = LEADERS[activeIndex];

  return (
    <AppLayout>
      <AdmissionPopup />
      {/* Hero Section */}
      <section data-scroll-reveal className="relative w-full min-h-[480px] h-[calc(100svh-64px)] md:h-[calc(100svh-80px)] max-h-[800px] flex items-center bg-primary overflow-hidden">
        {/* Left Side Building Image with Responsive Fade Gradients */}
        <div className="absolute left-0 top-0 bottom-0 w-full lg:w-[55%] h-full z-0 select-none">
          <img
            src="/hero-building.png"
            alt="YMKCOE Campus Building"
            className="w-full h-full object-cover object-bottom"
          />
          {/* Gradients to fade building into background: vertical fade for mobile, horizontal fade for desktop */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/80 to-primary lg:hidden"></div>
          <div className="absolute inset-0 hidden lg:block bg-gradient-to-r from-transparent via-primary/50 to-primary"></div>
        </div>

        {/* Abstract Background Elements (shifted to right side) */}
        <div className="absolute inset-0 opacity-20 pointer-events-none z-0">
          <div className="absolute top-[-10%] right-[-5%] w-[50%] h-[60%] rounded-full bg-accent blur-[120px]"></div>
          <div className="absolute bottom-[-20%] right-[10%] w-[40%] h-[50%] rounded-full bg-secondary blur-[100px]"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Empty spacer for the left side image on desktop */}
          <div className="hidden lg:block lg:col-span-6"></div>

          {/* Swapped Text and CTA block on the right */}
          <div className="lg:col-span-6 text-white space-y-6 lg:pl-8 flex flex-col items-start lg:items-end text-left lg:text-right">
            <div className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-3 py-1 text-sm font-medium backdrop-blur-sm">
              <span className="flex h-2 w-2 rounded-full bg-accent mr-2"></span>
              Admissions Open for 2026-27
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1]">
              Engineer Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-yellow-300">Future</span> With Excellence
            </h1>
            <p className="text-lg md:text-xl text-primary-foreground/80 max-w-lg leading-relaxed ml-0 lg:ml-auto">
              Yashoda Mahadeo Kakade College of Engineering — an institution under Indrayani Vidya Mandir — prepares the next generation of innovators, leaders, and problem solvers since 1965.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-start lg:justify-end w-full sm:w-auto">
              <Link href="/admissions">
                <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 h-14 text-base w-full sm:w-auto shadow-lg shadow-accent/20">
                  Apply Now <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link href="/departments">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-base w-full sm:w-auto backdrop-blur-sm"
                >
                  Explore Departments
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Strip */}
      <section data-scroll-reveal className="bg-background border-b border-border relative z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            <div className="py-5 sm:py-8 px-3 sm:px-4 text-center">
              <div className="flex justify-center mb-2 sm:mb-3 text-accent"><GraduationCap className="h-6 w-6 sm:h-8 sm:w-8" /></div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                <CountUp end={1965} useGrouping={false} />
              </div>
              <div className="text-[10px] sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">Established</div>
            </div>
            <div className="py-5 sm:py-8 px-3 sm:px-4 text-center">
              <div className="flex justify-center mb-2 sm:mb-3 text-accent"><Users className="h-6 w-6 sm:h-8 sm:w-8" /></div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                <CountUp end={15} suffix=" Acres" />
              </div>
              <div className="text-[10px] sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">Campus Area</div>
            </div>
            <div className="py-5 sm:py-8 px-3 sm:px-4 text-center">
              <div className="flex justify-center mb-2 sm:mb-3 text-accent"><Building className="h-6 w-6 sm:h-8 sm:w-8" /></div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">
                <CountUp end={360} />
              </div>
              <div className="text-[10px] sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">Total Seats</div>
            </div>
            <div className="py-5 sm:py-8 px-3 sm:px-4 text-center">
              <div className="flex justify-center mb-2 sm:mb-3 text-accent"><Trophy className="h-6 w-6 sm:h-8 sm:w-8" /></div>
              <div className="text-2xl sm:text-3xl font-bold text-primary mb-1">AICTE</div>
              <div className="text-[10px] sm:text-sm font-medium text-muted-foreground uppercase tracking-wider">Approved</div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Society Section */}
      <section data-scroll-reveal className="py-20 bg-muted/20 border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <Landmark className="h-3.5 w-3.5" />
              Founding Legacy
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Indrayani Vidya Mandir (IVM)</h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Serving the Maval region since 1965, Indrayani Vidya Mandir is a premier educational society built on values of social reform and academic empowerment.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            {/* The Society legacy */}
            <Card className="border border-border shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8 md:p-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <History className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">About the Society &amp; Trust</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Established in 1965, Indrayani Vidya Mandir stands as a pioneer institute of educational excellence in the region. The society was founded through the guidance of eminent personalities, including the celebrated writer and social leader <strong>Acharya P. K. Atre</strong>, Dr. M. M. Altekar, and other visionaries who aimed to bring affordable, high-quality instruction to the local community.
                </p>
                <div className="border-t border-border/60 pt-6">
                  <h4 className="font-semibold text-primary mb-3">Blessed by Towering Leaders</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    IVM's journey has been nurtured by prominent figures such as Prof. Ramkrishna More, Balasaheb Kibe, Dadasaheb Dhore, Balasaheb Barmukh, and former VC Dr. G. S. Mahajani, along with Balasaheb Desai (former Finance Minister of Maharashtra).
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Campus & Institutions */}
            <Card className="border border-border shadow-sm hover:shadow-md transition-all duration-300">
              <CardContent className="p-8 md:p-10 space-y-6">
                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
                    <Building className="h-6 w-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-primary">Campus &amp; Institutions</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  Set on a sprawling <strong>15-acre green campus</strong> with top-tier infrastructure, IVM has continuously expanded its offerings. In addition to Yashoda Mahadeo Kakade College of Engineering (YMKCOE), the trust established the Indrayani Institute of Pharmaceutical Education and Research in 2017, offering advanced UG programs in Medicine and Health Sciences (B. Pharmacy) to meet modern healthcare demands.
                </p>
                <div className="border-t border-border/60 pt-6">
                  <h4 className="font-semibold text-primary mb-3">Modern Infrastructure &amp; Amenities</h4>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    The campus features outstanding resources, including a modern auditorium, cafeteria, gymnasium, healthcare assistance, comfortable girls' and boys' hostels, advanced labs, a digital library, and full Wi-Fi connectivity.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Leadership Messages Section */}
      <section data-scroll-reveal className="py-20 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-primary/5 px-3 py-1 text-xs font-semibold text-primary uppercase tracking-wider mb-3">
              <MessageSquare className="h-3.5 w-3.5" />
              Leadership Desk
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Messages from our Leadership</h2>
            <p className="text-lg text-muted-foreground">
              Hear from the leaders guiding our vision and commitment to engineering innovation.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {LEADERS.map((leader, index) => (
              <Card key={leader.name} className="border border-border shadow-sm hover:shadow-md transition-all flex flex-col justify-between h-full">
                <CardContent className="p-8 flex flex-col justify-between h-full space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 border-b border-border pb-4">
                      <img
                        src={leader.image}
                        alt={leader.name}
                        loading="lazy"
                        className="h-14 w-14 rounded-full object-cover shrink-0 shadow-sm border border-border bg-muted"
                      />
                      <div>
                        <h3 className="font-bold text-base text-primary leading-tight">{leader.name}</h3>
                        <p className="text-xs text-muted-foreground mt-0.5">{leader.role}</p>
                        <p className="text-[10px] text-accent font-semibold uppercase tracking-wider">{leader.organization}</p>
                      </div>
                    </div>
                    <div className="text-muted-foreground text-sm leading-relaxed relative italic">
                      <Quote className="absolute -top-3 -left-2 h-8 w-8 text-primary/5 -z-10" />
                      {leader.preview}
                    </div>
                  </div>
                  <Button
                    variant="link"
                    size="sm"
                    onClick={() => openLeader(index)}
                    className="text-accent hover:text-accent/80 font-bold p-0 self-start mt-2 h-auto"
                  >
                    Read Full Message →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section data-scroll-reveal className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">Why Choose YMKCOE?</h2>
            <p className="text-lg text-muted-foreground">
              We don't just teach engineering; we cultivate a mindset of innovation, critical thinking, and practical problem-solving.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <CheckCircle2 className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Industry-Aligned Curriculum</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our syllabus is regularly updated in consultation with industry experts to ensure our graduates are job-ready from day one.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <Building className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">State-of-the-Art Labs</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Experience hands-on learning in our modern laboratories equipped with the latest technology and industrial-grade equipment.
                </p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-md hover:shadow-lg transition-all duration-300">
              <CardContent className="p-8">
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-6">
                  <Users className="h-6 w-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">Exceptional Placement Record</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our dedicated placement cell works tirelessly to bring top-tier companies to campus, resulting in consistently high placement rates.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section data-scroll-reveal className="py-24 bg-primary text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjIiIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')] opacity-30"></div>
        <div className="container mx-auto px-4 relative z-10 text-center max-w-3xl">
          <h2 className="text-2xl md:text-4xl font-bold mb-6">Turn Inspirations into Achievements</h2>
          <p className="text-lg md:text-xl text-primary-foreground/80 mb-10">
            Join thousands of successful alumni who started their careers at YMKCOE. Admissions for the upcoming academic year are now open.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/admissions">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-white font-semibold px-8 h-14 text-base shadow-lg w-full sm:w-auto">
                Apply for Admission
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white/30 text-white hover:bg-white/10 h-14 px-8 text-base backdrop-blur-sm w-full sm:w-auto">
                Contact Admissions Office
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Leadership Full Message Modal — Carousel */}
      <Dialog open={modalOpen} onOpenChange={(open) => !open && setModalOpen(false)}>
        <DialogContent className="max-w-4xl w-[90vw] p-0 overflow-visible bg-background border border-border rounded-lg shadow-2xl">
          {/* Outside arrows — left */}
          <button
            onClick={prevLeader}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-[calc(100%+16px)] h-12 w-12 rounded-full bg-background border border-border shadow-lg text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200 z-50"
            aria-label="Previous leader"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>

          {/* Outside arrows — right */}
          <button
            onClick={nextLeader}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-[calc(100%+16px)] h-12 w-12 rounded-full bg-background border border-border shadow-lg text-primary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-200 z-50"
            aria-label="Next leader"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          <div className="flex flex-col md:flex-row h-full max-h-[85vh] overflow-hidden rounded-lg">

            {/* Left side: Content / Text */}
            <div className="flex-1 p-6 md:p-8 overflow-y-auto flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-center gap-4 border-b border-border pb-4">
                  <img
                    src={activeLeader.image}
                    alt={activeLeader.name}
                    loading="lazy"
                    className="h-16 w-16 rounded-full object-cover shrink-0 shadow-sm border border-border"
                  />
                  <div>
                    <DialogTitle className="font-bold text-xl text-primary leading-tight">
                      {activeLeader.name}
                    </DialogTitle>
                    <p className="text-sm text-muted-foreground mt-0.5">{activeLeader.role}</p>
                    <p className="text-xs text-accent font-semibold uppercase tracking-wider">{activeLeader.organization}</p>
                  </div>
                </div>

                {/* Full Message */}
                <div className="text-muted-foreground text-sm md:text-base leading-relaxed whitespace-pre-line italic relative pl-6 pr-2">
                  <Quote className="absolute top-0 left-0 h-6 w-6 text-primary/10" />
                  {activeLeader.message}
                </div>
              </div>

              {/* Footer: dots + close */}
              <div className="pt-4 border-t border-border flex items-center justify-between gap-4">
                {/* Dot indicators */}
                <div className="flex gap-1.5">
                  {LEADERS.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveIndex(i)}
                      aria-label={`Go to ${LEADERS[i].name}`}
                      className={`h-2 rounded-full transition-all duration-200 ${i === activeIndex
                          ? "bg-primary w-6"
                          : "bg-muted-foreground/30 hover:bg-muted-foreground/60 w-2"
                        }`}
                    />
                  ))}
                </div>

                <Button
                  onClick={() => setModalOpen(false)}
                  variant="outline"
                  className="font-semibold"
                >
                  Close
                </Button>
              </div>
            </div>

            {/* Right side: Large Image */}
            <div className="hidden md:block w-[35%] bg-muted relative shrink-0 border-l border-border select-none overflow-hidden">
              <img
                key={activeLeader.image}
                src={activeLeader.image}
                alt={activeLeader.name}
                loading="lazy"
                className="w-full h-full object-cover transition-opacity duration-300"
              />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </AppLayout>
  );
}
