import { Link } from "wouter";
import { AppLayout } from "@/components/layout/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ArrowRight, GraduationCap } from "lucide-react";
import { BTECH_PROGRAMS, DEPARTMENTS, DTE_CODE, getDepartmentHref } from "@/lib/departments";
import { cn } from "@/lib/utils";
import { SEO } from "@/components/SEO";

const deptBorderMap: Record<string, string> = {
  cse: "border-l-blue-500",
  aids: "border-l-violet-500",
  entc: "border-l-emerald-500",
  it: "border-l-orange-500",
  fe: "border-l-rose-500",
};

export default function Departments() {
  const totalIntake = BTECH_PROGRAMS.reduce((sum, program) => sum + program.intake, 0);

  return (
    <AppLayout>
      <SEO 
        title="Departments & B.Tech Programs" 
        description="Explore the B.Tech programs offered at YMKCOE. We offer degrees in Computer Science, Artificial Intelligence & Data Science, IT, and E&TC Engineering."
        keywords="btech programs, engineering departments, cse, aids, it, entc, ymkcoe"
        canonicalUrl="/departments"
      />
      <section data-scroll-reveal className="bg-primary text-white py-14 md:py-20">
        <div className="container mx-auto px-4 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-accent mb-3">
            DTE Code {DTE_CODE}
          </p>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Departments</h1>
          <p className="text-base md:text-lg text-primary-foreground/80 max-w-3xl mx-auto">
            B.Tech programs offered by Yashoda Mahadeo Kakade College of Engineering — AICTE approved, DBATU affiliated.
          </p>
        </div>
      </section>

      <section data-scroll-reveal className="py-12 md:py-16 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-primary">
                B.Tech Programs Offered by YMKCOE
              </h2>
              <p className="text-sm text-muted-foreground mt-1">
                DTE Code: {DTE_CODE} · Total intake: {totalIntake} seats across {BTECH_PROGRAMS.length} programs
              </p>
            </div>
            <Link href="/admissions">
              <Button className="bg-accent text-accent-foreground hover:bg-accent/90 font-semibold">
                Apply Now <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>

          <Card className="border-border shadow-md overflow-hidden">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-accent hover:bg-accent">
                      <TableHead className="text-accent-foreground font-bold whitespace-nowrap">Program</TableHead>
                      <TableHead className="text-accent-foreground font-bold min-w-[220px]">Name of Course</TableHead>
                      <TableHead className="text-accent-foreground font-bold text-center whitespace-nowrap">Intake</TableHead>
                      <TableHead className="text-accent-foreground font-bold whitespace-nowrap">Choice Code</TableHead>
                      <TableHead className="text-accent-foreground font-bold whitespace-nowrap">Choice Code (TFWS)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {BTECH_PROGRAMS.map((program, index) => (
                      <TableRow
                        key={program.deptId}
                        className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}
                      >
                        <TableCell className="font-medium whitespace-nowrap">{program.program}</TableCell>
                        <TableCell>
                          <Link href={getDepartmentHref(program.deptId)}>
                            <span className="font-medium text-primary dark:text-white hover:text-accent transition-colors">
                              {program.courseName}
                            </span>
                          </Link>
                        </TableCell>
                        <TableCell className="text-center font-semibold">{program.intake}</TableCell>
                        <TableCell className="font-mono text-xs sm:text-sm">{program.choiceCode}</TableCell>
                        <TableCell className="font-mono text-xs sm:text-sm">{program.choiceCodeTfws}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section data-scroll-reveal className="py-12 md:py-16 bg-muted/20 border-t border-border">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="mb-8 text-center">
            <h2 className="text-2xl font-bold text-primary mb-2">Explore Each Department</h2>
            <p className="text-sm text-muted-foreground">
              Select a department to view faculty, academics, syllabus, and more.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {DEPARTMENTS.map((dept) => {
              const program = BTECH_PROGRAMS.find((p) => p.deptId === dept.id);

              return (
                <Link key={dept.id} href={getDepartmentHref(dept.id)}>
                  <Card className={cn("group h-full border border-border border-l-4 hover:shadow-md transition-all duration-200 cursor-pointer", deptBorderMap[dept.id])}>
                    <CardContent className="p-5 flex items-start gap-4">
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-xs font-bold ${dept.color}`}>{dept.short}</span>
                          <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                            {program ? program.intake : dept.intake} seats
                          </span>
                        </div>
                        <p className="text-sm font-semibold text-primary dark:text-white group-hover:text-accent transition-colors">
                          {dept.label}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{dept.tagline}</p>
                      </div>
                      <ArrowRight className="h-4 w-4 shrink-0 text-accent opacity-0 -translate-x-1 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0" />
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 rounded-xl border border-border bg-background p-5">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <GraduationCap className="h-4 w-4 text-accent" />
              CSE · AI &amp; DS · IT · ENTC
            </div>
            <Link href="/admissions">
              <Button variant="outline" className="border-accent text-accent hover:bg-accent hover:text-accent-foreground font-semibold">
                Apply Now
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </AppLayout>
  );
}
