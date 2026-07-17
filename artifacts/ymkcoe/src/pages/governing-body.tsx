import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { FileText, Download, Calendar, Users, Landmark, FileCheck } from "lucide-react";

interface GoverningBodyMember {
  name: string;
  designation: string;
  image?: string;
}

const MEMBERS: GoverningBodyMember[] = [
  { name: "Hon. Mr. Ramdas Kakade", designation: "President", image: "https://ymkcoe.com/upload/Gov/1.PNG" },
  { name: "Hon. Mr. Shailesh Shah", designation: "Vice President", image: "https://ymkcoe.com/upload/Gov/2.PNG" },
  { name: "Hon. Mr. Sanjay Sane", designation: "Vice President", image: "/vice_president.png" },
  { name: "Hon. Mr. Chandrakant Shete", designation: "Secretary", image: "https://ymkcoe.com/upload/Gov/4.PNG" },
  { name: "Hon. Mrs. Nirupa Kanitkar", designation: "Treasurer", image: "https://ymkcoe.com/upload/Gov/5.PNG" },
  { name: "Hon. Mr. Gorakhnath Kalokhe", designation: "Trustee", image: "https://ymkcoe.com/upload/Gov/3.PNG" },
  { name: "Hon. Mr. Sanjay Bhegade", designation: "Trustee", image: "https://ymkcoe.com/upload/Gov/7.PNG" },
  { name: "Hon. Mr. Ganesh Khandge", designation: "Trustee", image: "https://ymkcoe.com/upload/Gov/8.PNG" },
  { name: "Hon. Mr. Vilas Kalokhe", designation: "Trustee", image: "https://ymkcoe.com/upload/Gov/9.PNG" },
  { name: "Hon. Mr. Sandeep Kakade", designation: "Trustee", image: "https://ymkcoe.com/upload/Gov/10.PNG" },
  { name: "Hon. Dr. Deepak Shah", designation: "Trustee", image: "https://ymkcoe.com/upload/Gov/11.PNG" },
  { name: "Hon. Mr. Yuvraj Kakade", designation: "Trustee", image: "https://ymkcoe.com/upload/Gov/12.PNG" },
  { name: "Hon. Mr. Ranjeet Kakade", designation: "Trustee", image: "https://ymkcoe.com/upload/Gov/13.PNG" }
];

const MINUTES = [
  { title: "Governing Body Constitution & Members 2025-26", date: "January 2026", url: "/404" },
  { title: "AICTE Guidelines for Governing Body", date: "April 2025", url: "/404" },
  { title: "Minutes of Meeting - 11 February 2023", date: "February 11, 2023", url: "/404" },
  { title: "Minutes of Meeting - 08 October 2022", date: "October 8, 2022", url: "/404" },
  { title: "Minutes of Meeting - 12 February 2022", date: "February 12, 2022", url: "/404" },
  { title: "Minutes of Meeting - 09 October 2021", date: "October 9, 2021", url: "/404" },
  { title: "Minutes of Meeting - 13 February 2021", date: "February 13, 2021", url: "/404" },
  { title: "Minutes of Meeting - 10 October 2020", date: "October 10, 2020", url: "/404" },
  { title: "Minutes of Meeting - 08 February 2020", date: "February 8, 2020", url: "/404" },
  { title: "Minutes of Meeting - 12 October 2019", date: "October 12, 2019", url: "/404" },
  { title: "Minutes of Meeting - 19 February 2019", date: "February 19, 2019", url: "/404" },
  { title: "Minutes of Meeting - 13 October 2018", date: "October 13, 2018", url: "/404" },
  { title: "Minutes of Meeting - 14 April 2018", date: "April 14, 2018", url: "/404" },
];

export default function GoverningBody() {
  return (
    <AppLayout>
      {/* Hero */}
      <section className="bg-primary text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/30 via-primary/50 to-primary pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-4">
            <div className="bg-accent/20 p-3 rounded-full">
              <Landmark className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">College Governing Body</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            The apex executive body responsible for directing academic policies, strategic planning, and overall governance at Yashoda Mahadeo Kakade College of Engineering.
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl space-y-16">
          
          {/* Members Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-4">
              <Users className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-bold text-primary">Governing Body Members</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {MEMBERS.map((member, i) => (
                <Card key={i} className="hover:shadow-md transition-all duration-300 border-border">
                  <CardContent className="p-6 flex items-center gap-4">
                    <div className="w-14 h-14 shrink-0 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xl font-bold overflow-hidden border-2 border-primary/20">
                      {member.image ? (
                        <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                      ) : (
                        member.name.replace('Hon. ', '').replace('Mr. ', '').replace('Mrs. ', '').replace('Dr. ', '').split(' ').map(n => n[0]).slice(0, 2).join('')
                      )}
                    </div>
                    <div>
                      <h3 className="font-bold text-primary text-base leading-tight mb-1">{member.name}</h3>
                      <p className="text-xs text-accent font-semibold uppercase tracking-wider">{member.designation}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Meeting Minutes / Documents Section */}
          <div className="space-y-6">
            <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-4">
              <FileCheck className="h-6 w-6 text-accent" />
              <h2 className="text-2xl font-bold text-primary">Minutes of Meetings & Resolutions</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {MINUTES.map((doc, idx) => (
                <div 
                  key={idx}
                  className="flex items-center justify-between p-5 bg-muted/30 border border-border rounded-xl hover:bg-muted/50 hover:border-accent/30 transition-all duration-200 group"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-red-100 dark:bg-red-950/30 text-red-600 rounded-lg">
                      <FileText className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary text-sm line-clamp-1 group-hover:text-accent transition-colors">
                        {doc.title}
                      </h3>
                      <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                        <Calendar className="h-3.5 w-3.5" />
                        <span>Published: {doc.date}</span>
                      </div>
                    </div>
                  </div>
                  <Button 
                    asChild 
                    variant="ghost" 
                    size="icon" 
                    className="h-9 w-9 text-muted-foreground hover:text-accent hover:bg-accent/10"
                  >
                    <Link href={doc.url} title="View PDF Document">
                      <Download className="h-4.5 w-4.5" />
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </AppLayout>
  );
}
