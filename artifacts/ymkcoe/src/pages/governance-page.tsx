import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link, useRoute } from "wouter";
import { FileText, Download, Calendar, Users, FileCheck, CheckCircle2 } from "lucide-react";
import { GOVERNANCE_DATA } from "@/lib/governance-data";
import NotFound from "./not-found";
import React from "react";

export default function GovernancePage() {
  const [, params] = useRoute("/governance/:slug");
  const slug = params?.slug;
  
  if (!slug || !GOVERNANCE_DATA[slug]) {
    return <NotFound />;
  }

  const data = GOVERNANCE_DATA[slug];
  const Icon = data.icon;

  return (
    <AppLayout>
      {/* Hero Section */}
      <section className="bg-primary text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/30 via-primary/50 to-primary pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-4">
            <div className="bg-accent/20 p-4 rounded-full border border-accent/20 shadow-[0_0_15px_rgba(var(--accent-rgb),0.3)] backdrop-blur-sm animate-in zoom-in duration-500">
              <Icon className="h-10 w-10 text-accent" />
            </div>
          </div>
          <h1 className="text-3xl md:text-5xl font-bold mb-4 tracking-tight animate-in fade-in slide-in-from-bottom-4 duration-500 delay-100">{data.title}</h1>
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500 delay-200">
            {data.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-6xl space-y-16">
          
          {/* Objectives Section (if any) */}
          {data.objectives && data.objectives.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-4">
                <CheckCircle2 className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-bold text-primary">Objectives & Responsibilities</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.objectives.map((obj, i) => (
                  <div key={i} className="flex items-start gap-3 bg-muted/40 p-4 rounded-xl border border-border">
                    <div className="mt-1 h-2 w-2 rounded-full bg-accent shrink-0" />
                    <p className="text-foreground text-sm leading-relaxed">{obj}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Members Section (if any) */}
          {data.members && data.members.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-4">
                <Users className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-bold text-primary">Committee Members</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.members.map((member, i) => (
                  <Card key={i} className="hover:shadow-md transition-all duration-300 border-border group overflow-hidden">
                    <CardContent className="p-0">
                      <div className="bg-primary/5 p-4 border-b border-border group-hover:bg-primary/10 transition-colors">
                        <h3 className="font-bold text-primary text-base line-clamp-1">{member.name}</h3>
                        <p className="text-xs text-accent font-semibold uppercase tracking-wider mt-1">{member.role}</p>
                      </div>
                      <div className="p-4 bg-card">
                        <p className="text-sm font-medium text-foreground">{member.designation}</p>
                        {member.organization && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-1">{member.organization}</p>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Form/Link Special Section */}
          {data.type === "form" && (
            <div className="bg-primary/5 border border-primary/10 rounded-2xl p-8 text-center max-w-2xl mx-auto">
              <FileText className="h-12 w-12 text-primary mx-auto mb-4 opacity-80" />
              <h3 className="text-xl font-bold text-primary mb-3">Submit a Grievance</h3>
              <p className="text-muted-foreground text-sm mb-6">
                Click the button below to open the official secure student grievance form. All submissions will be treated with strict confidentiality.
              </p>
              <Button asChild className="bg-accent text-accent-foreground hover:bg-accent/90 px-8 py-6 text-lg rounded-full shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                <a href="#" target="_blank" rel="noopener noreferrer">Open Form</a>
              </Button>
            </div>
          )}

          {/* Documents Section (if any) */}
          {data.documents && data.documents.length > 0 && (
            <div className="space-y-6">
              <div className="flex items-center gap-3 border-b-2 border-primary/10 pb-4">
                <FileCheck className="h-6 w-6 text-accent" />
                <h2 className="text-2xl font-bold text-primary">Documents & Disclosures</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.documents.map((doc, idx) => (
                  <div 
                    key={idx}
                    className="flex items-center justify-between p-5 bg-muted/30 border border-border rounded-xl hover:bg-muted/50 hover:border-accent/30 transition-all duration-200 group shadow-sm"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-red-100 dark:bg-red-950/30 text-red-600 rounded-lg group-hover:scale-110 transition-transform">
                        <FileText className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-primary text-sm line-clamp-1 group-hover:text-accent transition-colors">
                          {doc.title}
                        </h3>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-1">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{doc.date}</span>
                        </div>
                      </div>
                    </div>
                    <Button 
                      asChild 
                      variant="ghost" 
                      size="icon" 
                      className="h-10 w-10 rounded-full text-muted-foreground hover:text-accent hover:bg-accent/10"
                    >
                      <Link href={doc.url} title="View PDF Document">
                        <Download className="h-5 w-5" />
                      </Link>
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </section>
    </AppLayout>
  );
}
