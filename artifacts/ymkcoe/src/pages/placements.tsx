import { AppLayout } from "@/components/layout/AppLayout";
import { useGetPlacementStats, useGetPlacements } from "@workspace/api-client-react";
import { Card, CardContent } from "@/components/ui/card";
import { Briefcase, TrendingUp, Award, Building2 } from "lucide-react";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip as RechartsTooltip, CartesianGrid } from "recharts";
import { Skeleton } from "@/components/ui/skeleton";

export default function Placements() {
  const { data: statsData, isLoading: statsLoading } = useGetPlacementStats();
  const { data: placementsData, isLoading: placementsLoading } = useGetPlacements();
  
  const stats = (statsData as any) || {};
  const placements = Array.isArray(placementsData) ? placementsData : [];

  return (
    <AppLayout>
      {/* Header */}
      <section data-scroll-reveal className="bg-background text-foreground py-16 md:py-20 border-b">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-primary">Our Recruiters</h1>
          <p className="text-lg text-muted-foreground leading-relaxed text-center">
            Yashoda Mahadeo Kakade College of Engineering has built strong corporate relations with leading recruiters to enhance campus employability and provide students with excellent placement opportunities. Our collaboration with industry partners ensures that students are well-prepared to meet the demands of the professional world.
          </p>
        </div>
      </section>

      {/* Recruiter Grid */}
      <section data-scroll-reveal className="py-12 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 items-center justify-items-center">
            {[
              { name: "Hyundai Steel", domain: "hyundaisteel.com" },
              { name: "Hyundai Materials", domain: "hyundai-materials.com" },
              { name: "Mahindra", domain: "mahindra.com" },
              { name: "Mahindra Accelo", domain: "mahindraaccelo.com" },
              { name: "Tata Hendrickson", domain: "tata.com" },
              { name: "Gestamp", domain: "gestamp.com" },
              { name: "Danfoss", domain: "danfoss.com" },
              { name: "Unitherm", domain: "unitherm.com" },
              { name: "Hicool", domain: "hicool.com" },
              { name: "Sogefi", domain: "sogefigroup.com" },
              { name: "Abhijeet", domain: "abhijeet.in" },
              { name: "FM Logistic", domain: "fmlogistic.com" },
              { name: "RMK Spaces", domain: "rmkspaces.com" },
              { name: "ALF", domain: "alfengineering.com" },
              { name: "Dhoot Transmissions", domain: "dhoottransmission.com" },
              { name: "Revoltech", domain: "revoltech.com" },
              { name: "CIE Composites", domain: "cieautomotive.com" },
              { name: "CIE Stampings", domain: "cieautomotive.com" },
              { name: "CIE Gears", domain: "cieautomotive.com" },
              { name: "CIE Castings", domain: "cieautomotive.com" },
              { name: "Yinlun TDI", domain: "yinlun.com" },
              { name: "Bonfiglioli", domain: "bonfiglioli.com" },
              { name: "BVG", domain: "bvgindia.com" },
              { name: "Emitec", domain: "emitec.com" },
              { name: "NVH", domain: "nvh.com" },
              { name: "ADM", domain: "adm.com" },
              { name: "PHA", domain: "pha.com" },
              { name: "AML", domain: "aml.com" },
              { name: "Ognibene Power", domain: "ognibene.com" },
              { name: "Doowon", domain: "doowon.com" },
              { name: "Komos", domain: "komos.com" }
            ].map((company, idx) => (
              <div key={idx} className="group bg-background border rounded-md px-4 py-3 shadow-sm w-full text-center flex items-center justify-center min-h-[80px] hover:shadow-md transition-shadow relative overflow-hidden" title={company.name}>
                <img 
                  src={`https://logo.clearbit.com/${company.domain}`} 
                  alt={company.name} 
                  className="max-h-12 max-w-full object-contain filter grayscale opacity-70 transition-all duration-300 group-hover:grayscale-0 group-hover:opacity-100 group-hover:-translate-y-2"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src.includes('clearbit')) {
                      target.src = `https://t3.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=http://${company.domain}&size=128`;
                    } else {
                      target.style.display = 'none';
                      target.nextElementSibling?.classList.remove('hidden');
                    }
                  }}
                />
                <span className="hidden font-semibold text-sm text-foreground/80 relative z-10">{company.name}</span>
                
                {/* Sliding name banner on hover */}
                <div className="absolute bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t text-foreground text-[11px] font-semibold py-1 translate-y-full group-hover:translate-y-0 transition-transform duration-300 z-20">
                  {company.name}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* High Level Stats */}
      <section data-scroll-reveal className="py-12 bg-background border-b border-border -mt-8">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-lg border-accent/20">
              <CardContent className="p-8 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Briefcase className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Total Placements</p>
                  <h3 className="text-4xl font-bold text-primary">
                    {statsLoading ? <Skeleton className="h-10 w-24" /> : `${stats?.totalPlaced || 0}+`}
                  </h3>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-primary/20">
              <CardContent className="p-8 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <Briefcase className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Average Package</p>
                  <h3 className="text-4xl font-bold text-primary">
                    {statsLoading ? <Skeleton className="h-10 w-24" /> : stats?.averagePackage || "0"}
                  </h3>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-lg border-secondary/20">
              <CardContent className="p-8 flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                  <TrendingUp className="h-8 w-8 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-1">Highest Package</p>
                  <h3 className="text-4xl font-bold text-primary">
                    {statsLoading ? <Skeleton className="h-10 w-24" /> : stats?.highestPackage || "0"}
                  </h3>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section data-scroll-reveal className="py-20 bg-muted/20">
        <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Charts & Graphs */}
          <div className="lg:col-span-8 space-y-12">
            <div>
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <TrendingUp className="h-6 w-6 text-accent" /> Placement Trends by Year
              </h2>
              <Card className="border-border shadow-sm">
                <CardContent className="p-6">
                  {statsLoading ? (
                    <Skeleton className="h-[400px] w-full" />
                  ) : stats?.byYear && stats.byYear.length > 0 ? (
                    <div className="h-[400px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={stats.byYear} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                          <XAxis dataKey="year" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
                          <RechartsTooltip 
                            cursor={{ fill: 'hsl(var(--muted))' }}
                            contentStyle={{ borderRadius: '8px', border: '1px solid hsl(var(--border))', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                          />
                          <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Students Placed" />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="h-[400px] flex items-center justify-center text-muted-foreground bg-muted/30 rounded-lg">
                      No trend data available.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2">
                <Award className="h-6 w-6 text-accent" /> Recent Successful Placements
              </h2>
              {placementsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {[1,2,3,4].map(i => <Skeleton key={i} className="h-32 w-full" />)}
                </div>
              ) : placements.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {placements.map(placement => (
                    <Card key={placement.id} className="border-border shadow-sm">
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <div>
                            <h3 className="font-bold text-lg text-primary">{placement.studentName}</h3>
                            <p className="text-sm text-muted-foreground">{placement.department} • {placement.year}</p>
                          </div>
                          <div className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm font-semibold">
                            {placement.package}
                          </div>
                        </div>
                        <div className="pt-3 border-t border-border flex items-center justify-between">
                          <span className="font-semibold text-secondary">{placement.company}</span>
                          <span className="text-sm text-muted-foreground">{placement.role}</span>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground bg-card rounded-lg border border-border border-dashed">
                  No recent placement records available.
                </div>
              )}
            </div>
          </div>

          {/* Sidebar / Top Companies */}
          <div className="lg:col-span-4">
            <Card className="border-border shadow-md sticky top-28">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-primary mb-6 flex items-center gap-2">
                  <Building2 className="h-5 w-5 text-secondary" /> Top Recruiters
                </h3>
                
                {statsLoading ? (
                  <div className="space-y-4">
                    {[1,2,3,4,5].map(i => <Skeleton key={i} className="h-12 w-full" />)}
                  </div>
                ) : stats?.topCompanies && stats.topCompanies.length > 0 ? (
                  <div className="space-y-4">
                    {stats.topCompanies?.map((tc: any, idx: any) => (
                      <div key={idx} className="flex items-center justify-between p-3 rounded-lg hover:bg-muted transition-colors border border-transparent hover:border-border">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded bg-card border border-border flex items-center justify-center font-bold text-xl text-primary/30">
                            {tc.company.charAt(0)}
                          </div>
                          <span className="font-semibold text-foreground">{tc.company}</span>
                        </div>
                        <span className="text-sm bg-secondary/10 text-secondary px-2 py-1 rounded font-medium">
                          {tc.count} hires
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-4">No top recruiter data available.</p>
                )}
              </CardContent>
            </Card>
          </div>

        </div>
      </section>
    </AppLayout>
  );
}
