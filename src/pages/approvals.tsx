import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, FileCheck, Building2, GraduationCap, Landmark, ExternalLink, ChevronRight } from "lucide-react";

const APPROVAL_DOCS = [
  {
    id: "mh-affiliation",
    title: "Govt. of Maharashtra Affiliation",
    icon: Landmark,
    description:
      "YMKCOE is officially affiliated with the Government of Maharashtra under the Directorate of Technical Education (DTE). The college is recognized and approved by the state government for offering degree programs in engineering and technology.",
    details: [
      "Affiliated with Dr. Babasaheb Ambedkar Technological University (BATU), Lonere",
      "Governed by DTE, Government of Maharashtra",
      "DTE Code: 16352",
      "Recognized under the Maharashtra Universities Act",
    ],
  },
  {
    id: "dte-gr",
    title: "DTE Government Resolution (GR)",
    icon: FileCheck,
    description:
      "The Directorate of Technical Education (DTE), Maharashtra, has issued formal Government Resolutions (GR) sanctioning the establishment and operation of YMKCOE as a technical education institution.",
    details: [
      "GR issued by DTE, Government of Maharashtra",
      "Covers intake capacity and branch approvals",
      "Updated periodically as per DTE norms",
      "Available for public reference at DTE offices",
    ],
  },
  {
    id: "eoa-aicte",
    title: "EOA – AICTE",
    icon: Shield,
    description:
      "YMKCOE holds a valid Extension of Approval (EOA) from the All India Council for Technical Education (AICTE), the statutory body that regulates technical education in India. The EOA is renewed every academic year.",
    details: [
      "AICTE Approved institution",
      "Extension of Approval (EOA) renewed annually",
      "Covers all engineering branches offered",
      "Verified through AICTE web portal: www.aicte-india.org",
    ],
    link: { label: "Verify on AICTE Portal", url: "https://www.aicte-india.org" },
  },
  {
    id: "aicte-affiliation",
    title: "AICTE Affiliation",
    icon: Building2,
    description:
      "YMKCOE is formally affiliated with AICTE, ensuring that all programs offered meet the national standards for technical education. AICTE affiliation certifies the quality of education and infrastructure at the institution.",
    details: [
      "Permanent AICTE affiliation for B.Tech programs",
      "Adherence to AICTE norms for faculty, labs, and curriculum",
      "Regular inspections and compliance verifications",
      "AICTE approval visible on official college documents",
    ],
  },
  {
    id: "university-affiliation",
    title: "University Affiliation",
    icon: GraduationCap,
    description:
      "YMKCOE is affiliated with Dr. Babasaheb Ambedkar Technological University (BATU), Lonere, Raigad, Maharashtra. All academic programs, examinations, and degree certificates are issued under BATU.",
    details: [
      "Affiliated University: Dr. Babasaheb Ambedkar Technological University (BATU)",
      "Location: Lonere, Raigad, Maharashtra",
      "All degrees awarded by BATU",
      "Curriculum and syllabi follow BATU guidelines",
    ],
    link: { label: "Visit BATU Website", url: "https://www.dbatu.ac.in" },
  },
];

export default function Approvals() {
  const [location] = useLocation();
  const [activeDocId, setActiveDocId] = useState<string | null>(null);

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const doc = searchParams.get("doc");
    if (doc) {
      setActiveDocId(doc);
      setTimeout(() => {
        const el = document.getElementById(doc);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 300);
    }
  }, [location]);

  return (
    <AppLayout>
      {/* Hero */}
      <section data-scroll-reveal className="bg-primary text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/30 via-primary/50 to-primary pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-4">
            <div className="bg-accent/20 p-3 rounded-full">
              <Shield className="h-8 w-8 text-accent" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Approvals & Affiliations</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            YMKCOE is fully recognized and approved by all relevant national and state regulatory bodies, ensuring a high-quality technical education experience.
          </p>
        </div>
      </section>

      {/* Quick Nav Pills */}
      <section data-scroll-reveal className="bg-muted/30 border-b border-border sticky top-0 z-40 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-3 flex items-center gap-2 overflow-x-auto scrollbar-none">
          {APPROVAL_DOCS.map((doc) => (
            <a
              key={doc.id}
              href={`#${doc.id}`}
              onClick={() => setActiveDocId(doc.id)}
              className={`shrink-0 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                activeDocId === doc.id
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary hover:text-primary"
              }`}
            >
              <doc.icon className="h-3 w-3" />
              {doc.title}
            </a>
          ))}
        </div>
      </section>

      {/* Document Sections */}
      <section data-scroll-reveal className="py-16 bg-background">
        <div className="container mx-auto px-4 space-y-10">
          {APPROVAL_DOCS.map((doc, idx) => (
            <div
              key={doc.id}
              id={doc.id}
              className="scroll-mt-24"
            >
              <Card className={`border-border shadow-sm hover:shadow-md transition-all duration-300 ${activeDocId === doc.id ? "ring-2 ring-accent ring-offset-2" : ""}`}>
                <CardContent className="p-8">
                  <div className="flex flex-col md:flex-row md:items-start gap-6">
                    {/* Icon & Number */}
                    <div className="shrink-0 flex flex-col items-center gap-2">
                      <div className="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent">
                        <doc.icon className="h-7 w-7" />
                      </div>
                      <span className="text-xs font-bold text-muted-foreground">0{idx + 1}</span>
                    </div>

                    {/* Content */}
                    <div className="flex-1 space-y-4">
                      <div>
                        <h2 className="text-xl font-bold text-primary mb-2">{doc.title}</h2>
                        <p className="text-sm text-muted-foreground leading-relaxed">{doc.description}</p>
                      </div>

                      <div className="bg-muted/50 rounded-xl p-4 space-y-2">
                        <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-3">Key Details</h3>
                        <ul className="space-y-2">
                          {doc.details.map((detail, i) => (
                            <li key={i} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                              <ChevronRight className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                              <span>{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {doc.link && (
                        <a
                          href={doc.link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:underline"
                        >
                          {doc.link.label} <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>
    </AppLayout>
  );
}
