import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { useCreateAdmissionLead } from "@workspace/api-client-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  GraduationCap, 
  CheckCircle, 
  HelpCircle, 
  Building2, 
  ClipboardList, 
  FileText, 
  IndianRupee, 
  Phone, 
  Mail,
  ExternalLink
} from "lucide-react";

const DEPARTMENTS = [
  "Computer Science & Engineering",
  "Artificial Intelligence & Data Science",
  "Electronics & Telecommunication Engineering",
  "Information Technology",
];

const admissionSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Valid phone number is required"),
  courseInterest: z.string().min(1, "Please select a course"),
  qualification: z.string().optional(),
  message: z.string().optional(),
});

type AdmissionFormValues = z.infer<typeof admissionSchema>;

export default function Admissions() {
  const { toast } = useToast();
  const createLead = useCreateAdmissionLead();
  const [location] = useLocation();

  const [activeTab, setActiveTab] = useState("eligibility");
  const [search, setSearch] = useState(window.location.search);

  // Listen to wouter / history changes including query parameters
  useEffect(() => {
    const handleLocationChange = () => {
      setSearch(window.location.search);
    };

    window.addEventListener("popstate", handleLocationChange);
    window.addEventListener("pushstate", handleLocationChange);
    window.addEventListener("replacestate", handleLocationChange);

    // Override pushState and replaceState to trigger the custom events
    const originalPushState = history.pushState;
    history.pushState = function (...args) {
      originalPushState.apply(history, args);
      window.dispatchEvent(new Event("pushstate"));
    };

    const originalReplaceState = history.replaceState;
    history.replaceState = function (...args) {
      originalReplaceState.apply(history, args);
      window.dispatchEvent(new Event("replacestate"));
    };

    return () => {
      window.removeEventListener("popstate", handleLocationChange);
      window.removeEventListener("pushstate", handleLocationChange);
      window.removeEventListener("replacestate", handleLocationChange);
      history.pushState = originalPushState;
      history.replaceState = originalReplaceState;
    };
  }, []);

  // Parse URL query parameter on load or location change
  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      if (tabParam === "eligibility") setActiveTab("eligibility");
      else if (tabParam === "process") setActiveTab("process");
      else if (tabParam === "documents") setActiveTab("documents");
      else if (tabParam === "institute-level" || tabParam === "institute") setActiveTab("institute");
      else if (tabParam === "fee-structure" || tabParam === "fra" || tabParam === "tfw-code" || tabParam === "fees") setActiveTab("fees");
    }
  }, [search]);

  // Handle scrolling to targeted dropdown section within the active tab
  useEffect(() => {
    const searchParams = new URLSearchParams(search);
    const tabParam = searchParams.get("tab");
    if (tabParam) {
      setTimeout(() => {
        const element = document.getElementById(tabParam);
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
          
          // Temporary highlight styling to guide user eye
          element.classList.add("ring-2", "ring-accent", "ring-offset-2");
          setTimeout(() => {
            element.classList.remove("ring-2", "ring-accent", "ring-offset-2");
          }, 2000);
        }
      }, 400); // Allow DOM rendering & transition animation to complete
    }
  }, [activeTab, search]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    const newUrl = `${window.location.pathname}?tab=${value}`;
    window.history.pushState(null, "", newUrl);
  };

  const form = useForm<AdmissionFormValues>({
    resolver: zodResolver(admissionSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      courseInterest: "",
      qualification: "",
      message: "",
    },
  });

  const onSubmit = (data: AdmissionFormValues) => {
    createLead.mutate({ data }, {
      onSuccess: () => {
        toast({
          title: "Application Submitted",
          description: "Our admissions team will contact you shortly.",
        });
        form.reset();
      },
      onError: () => {
        toast({
          variant: "destructive",
          title: "Error",
          description: "There was a problem submitting your application. Please try again.",
        });
      }
    });
  };

  return (
    <AppLayout>
      <section data-scroll-reveal className="bg-primary text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-secondary/30 via-primary/50 to-primary pointer-events-none" />
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight">Admissions</h1>
          <p className="text-lg text-primary-foreground/80 max-w-2xl mx-auto">
            Admissions to the B. Tech program are governed by the rules of the Government of Maharashtra, Directorate of Technical Education (DTE), and affiliated to Dr. Babasaheb Ambedkar Technological University, Lonere (BATU).
          </p>
        </div>
      </section>

      <section data-scroll-reveal className="py-16 bg-background">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Info Side */}
          <div className="lg:col-span-7 space-y-8">
            <div>
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="grid grid-cols-2 md:grid-cols-5 h-auto gap-2 bg-muted/50 p-1.5 mb-8 rounded-xl border border-border">
                  <TabsTrigger value="eligibility" className="py-2.5 px-3 rounded-lg text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm transition-all cursor-pointer">
                    Eligibility
                  </TabsTrigger>
                  <TabsTrigger value="process" className="py-2.5 px-3 rounded-lg text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm transition-all cursor-pointer">
                    Process
                  </TabsTrigger>
                  <TabsTrigger value="institute" className="py-2.5 px-3 rounded-lg text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm transition-all cursor-pointer">
                    Institute Level
                  </TabsTrigger>
                  <TabsTrigger value="documents" className="py-2.5 px-3 rounded-lg text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm transition-all cursor-pointer">
                    Documents
                  </TabsTrigger>
                  <TabsTrigger value="fees" className="py-2.5 px-3 rounded-lg text-xs font-semibold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground shadow-sm transition-all col-span-2 md:col-span-1 cursor-pointer">
                    Fees &amp; Scholarships
                  </TabsTrigger>
                </TabsList>

                {/* ── Eligibility Criteria Content ── */}
                <TabsContent value="eligibility" className="space-y-6 animate-in fade-in-50 duration-300">
                  <div id="eligibility" className="space-y-4 scroll-mt-6">
                    <div className="flex items-center gap-3">
                      <GraduationCap className="h-6 w-6 text-accent" />
                      <h2 className="text-2xl font-bold text-primary">Eligibility Criteria</h2>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Admissions to the B. Tech program are governed by the rules of the Government of Maharashtra, Directorate of Technical Education (DTE), and affiliated to Dr. Babasaheb Ambedkar Technological University, Lonere (BATU).
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="text-base font-bold text-primary mb-4 pb-2 border-b border-border">A. For Maharashtra State Candidates:</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2.5">
                            <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span>Candidate must be an Indian National.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span>Passed HSC or its equivalent examination with Physics and Mathematics as compulsory subjects along with one of the Chemistry / Biotechnology / Biology / Technical / Vocational subjects.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span>Secured at least 45% marks (40% for reserved category) in the above subjects taken together.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span>Must have appeared for MHT-CET conducted by the State Common Entrance Test Cell, Maharashtra.</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>

                    <Card className="border-border shadow-sm hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <h3 className="text-base font-bold text-primary mb-4 pb-2 border-b border-border">B. For All India Candidates:</h3>
                        <ul className="space-y-3 text-sm text-muted-foreground">
                          <li className="flex items-start gap-2.5">
                            <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span>Must have appeared for JEE (Main) Paper-I.</span>
                          </li>
                          <li className="flex items-start gap-2.5">
                            <CheckCircle className="h-4 w-4 text-accent shrink-0 mt-0.5" />
                            <span>Should have obtained at least 45% marks (40% for reserved category) in PCM subjects at HSC or equivalent level.</span>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* ── Admission Process Content ── */}
                <TabsContent value="process" className="space-y-6 animate-in fade-in-50 duration-300">
                  <div id="process" className="space-y-4 scroll-mt-6">
                    <div className="flex items-center gap-3">
                      <ClipboardList className="h-6 w-6 text-accent" />
                      <h2 className="text-2xl font-bold text-primary">Admission Process</h2>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Admissions are conducted through the Centralized Admission Process (CAP) by the Directorate of Technical Education, Maharashtra.
                    </p>
                  </div>

                  <Card className="border-border shadow-sm">
                    <CardContent className="p-6">
                      <h3 className="text-base font-bold text-primary mb-6">Step-by-Step Process</h3>
                      <div className="relative border-l-2 border-muted pl-6 space-y-8 ml-3">
                        {[
                          {
                            title: "Online Registration",
                            desc: "Candidates must register on the State CET Cell website: https://cetcell.mahacet.org. Fill out the application form and upload required documents.",
                            link: "https://cetcell.mahacet.org"
                          },
                          {
                            title: "Document Verification & Confirmation",
                            desc: "Document Verification & Confirmation of Application Form can be done through Facilitation Centers (FCs) designated by CET Cell."
                          },
                          {
                            title: "Provisional Merit List",
                            desc: "Released based on CET/JEE scores and academic credentials."
                          },
                          {
                            title: "Option Form Filling & CAP Rounds",
                            desc: "Candidates must fill the Option Form for institute and branch preferences during CAP Rounds I, II, III and IV."
                          },
                          {
                            title: "Seat Allotment",
                            desc: "Seats are allotted based on merit, reservation, and preferences filled."
                          },
                          {
                            title: "Admission Confirmation",
                            desc: "Visit the Admission Reporting Centre (ARC) and later report to YMK COE for final admission confirmation."
                          }
                        ].map((step, idx) => (
                          <div key={idx} className="relative">
                            <span className="absolute -left-[35px] top-0 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-xs font-bold ring-4 ring-background">
                              {idx + 1}
                            </span>
                            <div className="space-y-1">
                              <h4 className="text-sm font-bold text-primary">{step.title}</h4>
                              <p className="text-sm text-muted-foreground leading-relaxed">{step.desc}</p>
                              {step.link && (
                                <a 
                                  href={step.link} 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="inline-flex items-center gap-1 text-xs text-accent hover:underline font-medium mt-1"
                                >
                                  Visit CET Cell Website <ExternalLink className="h-3 w-3" />
                                </a>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* ── Admission at Institute Level Content ── */}
                <TabsContent value="institute" className="space-y-6 animate-in fade-in-50 duration-300">
                  <div id="institute" className="space-y-4 scroll-mt-6">
                    <div className="flex items-center gap-3">
                      <Building2 className="h-6 w-6 text-accent" />
                      <h2 className="text-2xl font-bold text-primary">Admission at Institute Level</h2>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      A limited number of seats are available under the Institute Level / Management Quota, filled by the institute as per DTE norms.
                    </p>
                  </div>

                  <Card id="institute-level" className="border-border shadow-sm scroll-mt-6">
                    <CardContent className="p-6">
                      <ul className="space-y-4 text-sm text-muted-foreground">
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <span className="leading-relaxed">Candidates must register separately at YMK COE.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <span className="leading-relaxed">Submit all necessary documents and appear for Personal interaction.</span>
                        </li>
                        <li className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                          <span className="leading-relaxed">Eligibility and fee criteria remain as per government regulation.</span>
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* ── Required Documents Content ── */}
                <TabsContent value="documents" className="space-y-6 animate-in fade-in-50 duration-300">
                  <div id="documents" className="space-y-4 scroll-mt-6">
                    <div className="flex items-center gap-3">
                      <FileText className="h-6 w-6 text-accent" />
                      <h2 className="text-2xl font-bold text-primary">Required Documents</h2>
                    </div>
                    <p className="text-muted-foreground text-sm font-semibold italic">
                      (Original and 2 sets of photocopies required)
                    </p>
                  </div>

                  <Card className="border-border shadow-sm">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-2.5 mb-5">
                        <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Original documents + 2 sets of self-attested photocopies required</span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Academic Records */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-2 h-2 rounded-full bg-blue-500 shrink-0"></span>
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Academic Records</h4>
                          </div>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {["SSC (10th) Mark Sheet & Passing Certificate","HSC (12th) Mark Sheet & Passing Certificate","School / College Leaving Certificate"].map((d,i) => (
                              <li key={i} className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" /><span>{d}</span></li>
                            ))}
                          </ul>
                        </div>
                        {/* Entrance Exams */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-2 h-2 rounded-full bg-green-500 shrink-0"></span>
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Entrance Exam Scores</h4>
                          </div>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {["MHT-CET Score Card (Maharashtra candidates)","JEE Main Score Card (All India candidates)","Hall Ticket / Admit Card of Entrance Exam"].map((d,i) => (
                              <li key={i} className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-green-500 shrink-0 mt-0.5" /><span>{d}</span></li>
                            ))}
                          </ul>
                        </div>
                        {/* Identity & Domicile */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-2 h-2 rounded-full bg-purple-500 shrink-0"></span>
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Identity & Domicile</h4>
                          </div>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {["Nationality Certificate / Passport / Birth Certificate","Domicile Certificate (Maharashtra candidates)","Aadhaar Card (for identification)"].map((d,i) => (
                              <li key={i} className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-purple-500 shrink-0 mt-0.5" /><span>{d}</span></li>
                            ))}
                          </ul>
                        </div>
                        {/* Category / Reservation */}
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 mb-3">
                            <span className="w-2 h-2 rounded-full bg-orange-500 shrink-0"></span>
                            <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Category / Reservation (if applicable)</h4>
                          </div>
                          <ul className="space-y-2 text-sm text-muted-foreground">
                            {["Caste Certificate","Caste Validity Certificate","Non-Creamy Layer Certificate (OBC/NT/SBC)","Income Certificate (for EBC/EWS)"].map((d,i) => (
                              <li key={i} className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-orange-500 shrink-0 mt-0.5" /><span>{d}</span></li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      {/* Miscellaneous */}
                      <div className="mt-6 pt-5 border-t border-border space-y-2">
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-2 h-2 rounded-full bg-rose-500 shrink-0"></span>
                          <h4 className="text-xs font-bold text-primary uppercase tracking-wider">Miscellaneous</h4>
                        </div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-muted-foreground">
                          {["GAP Certificate (if gap year between studies)","Migration Certificate (for other boards/universities)","Recent Passport-size Photographs (minimum 6 copies)","Transfer Certificate from last institution attended"].map((d,i) => (
                            <li key={i} className="flex items-start gap-2"><CheckCircle className="h-4 w-4 text-rose-500 shrink-0 mt-0.5" /><span>{d}</span></li>
                          ))}
                        </ul>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* ── Fees & Scholarships Content ── */}
                <TabsContent value="fees" className="space-y-6 animate-in fade-in-50 duration-300">
                  <div id="fees" className="space-y-4 scroll-mt-6">
                    <div className="flex items-center gap-3">
                      <IndianRupee className="h-6 w-6 text-accent" />
                      <h2 className="text-2xl font-bold text-primary">Fees & Scholarships</h2>
                    </div>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Tuition and development fees are set in strict accordance with the Fee Regulating Authority (FRA) guidelines.
                    </p>
                  </div>

                  <div className="space-y-6">
                    {/* Fee Structure */}
                    <Card id="fee-structure" className="border-border shadow-sm scroll-mt-6 transition-all duration-300">
                      <CardContent className="p-6 space-y-2">
                        <h3 className="text-base font-bold text-primary">Fee Structure</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Tuition and development fees are as per Fee Regulating Authority (FRA) guidelines.
                        </p>
                      </CardContent>
                    </Card>

                    {/* TFWS & Scholarships */}
                    <Card id="tfw-code" className="border-border shadow-sm scroll-mt-6 transition-all duration-300">
                      <CardContent className="p-6 space-y-4">
                        <div className="space-y-1">
                          <h3 className="text-base font-bold text-primary">TFWS Choice Codes & Scholarships</h3>
                          <p className="text-sm text-muted-foreground leading-relaxed">
                            For the <span className="font-semibold">Tuition Fee Waiver Scheme (TFWS)</span>, candidates must select the specific TFWS Choice Codes ending with &apos;T&apos; (e.g., Choice Code for Computer Science &amp; Engineering is generally formatted under DTE Code 16352) during the CAP Option Form Filling rounds.
                          </p>
                        </div>
                        <div className="space-y-2 pt-2 border-t border-border">
                          <h4 className="text-sm font-semibold text-primary">Available Scholarships:</h4>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-muted-foreground pl-1">
                            {[
                              "Social Welfare Department",
                              "Tribal Development Department",
                              "Minority Development Department",
                              "EBC (Economically Backward Class)",
                              "TFWS (Tuition Fee Waiver Scheme)",
                            ].map((sch, idx) => (
                              <li key={idx} className="flex items-center gap-2">
                                <CheckCircle className="h-4 w-4 text-accent shrink-0" />
                                <span>{sch}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>

                    {/* FRA */}
                    <Card id="fra" className="border-border shadow-sm scroll-mt-6 transition-all duration-300">
                      <CardContent className="p-6 space-y-2">
                        <h3 className="text-base font-bold text-primary">Fee Regulating Authority (FRA)</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          All fee structures are approved by the Fee Regulating Authority (FRA), Government of Maharashtra. Detailed fee distributions can be verified on the official FRA portal.
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* Help box */}
            <div className="bg-muted/50 border border-border p-6 rounded-xl space-y-4">
              <div className="flex items-start gap-4">
                <HelpCircle className="h-6 w-6 text-primary shrink-0 mt-1" />
                <div className="space-y-1">
                  <h3 className="text-base font-bold text-primary">Need help with your application?</h3>
                  <p className="text-sm text-muted-foreground">
                    Our admission desk is open Monday to Saturday, 9:00 AM to 5:00 PM.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2 border-t border-border text-sm">
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent shrink-0" />
                  <span className="font-semibold text-primary">+91 89836 83005 / +91 89836 73005</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent shrink-0" />
                  <a href="mailto:admission@ymkcoe.com" className="font-semibold text-primary hover:text-accent transition-colors">
                    admission@ymkcoe.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form Side */}
          <div className="lg:col-span-5">
            <Card className="border-t-4 border-t-accent shadow-xl">
              <CardHeader className="text-center pb-2">
                <CardTitle className="text-2xl font-bold text-primary">Apply Now</CardTitle>
                <p className="text-sm text-muted-foreground">Submit your details to start the admission process.</p>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Name *</FormLabel>
                          <FormControl>
                            <Input placeholder="John Doe" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email Address *</FormLabel>
                            <FormControl>
                              <Input type="email" placeholder="john@example.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone Number *</FormLabel>
                            <FormControl>
                              <Input placeholder="+91 9876543210" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    <FormField
                      control={form.control}
                      name="courseInterest"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Interested Program *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a department" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {DEPARTMENTS.map((dept) => (
                                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="qualification"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Current Qualification</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., 12th Science / Diploma" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Any questions?</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Type your query here..." className="resize-none" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button 
                      type="submit" 
                      className="w-full bg-accent hover:bg-accent/90 text-white h-12 text-lg mt-4 cursor-pointer"
                      disabled={createLead.isPending}
                    >
                      {createLead.isPending ? "Submitting..." : "Submit Application"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

        </div>
      </section>
    </AppLayout>
  );
}
