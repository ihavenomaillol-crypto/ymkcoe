import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Spinner } from "@/components/ui/spinner";
import { ThemeProvider } from "next-themes";

const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const Faculty = lazy(() => import("@/pages/faculty"));
const Admissions = lazy(() => import("@/pages/admissions"));
const Placements = lazy(() => import("@/pages/placements"));
const News = lazy(() => import("@/pages/news"));
const Media = lazy(() => import("@/pages/media"));
const Contact = lazy(() => import("@/pages/contact"));
const Courses = lazy(() => import("@/pages/courses"));
const AdminLogin = lazy(() => import("@/pages/admin-login"));
const AdminDashboard = lazy(() => import("@/pages/admin-dashboard"));
const Approvals = lazy(() => import("@/pages/approvals"));
const Departments = lazy(() => import("@/pages/departments"));
const Department = lazy(() => import("@/pages/department"));
const HostelPage = lazy(() => import("@/pages/hostel"));
const Achievements = lazy(() => import("@/pages/achievements"));
const Clubs = lazy(() => import("@/pages/clubs"));
const Association = lazy(() => import("@/pages/association"));
const Alumni = lazy(() => import("@/pages/alumni"));
const GoverningBody = lazy(() => import("@/pages/governing-body"));
const StudentCouncil = lazy(() => import("@/pages/student-council"));
const GovernancePage = lazy(() => import("@/pages/governance-page"));
const TriverseSolutions = lazy(() => import("@/pages/triverse-solutions"));
const NotFound = lazy(() => import("@/pages/not-found"));

function PageLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Spinner className="size-8 text-primary" />
    </div>
  );
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/faculty" component={Faculty} />
        <Route path="/admissions" component={Admissions} />
        <Route path="/placements" component={Placements} />
        <Route path="/news" component={News} />
        <Route path="/media" component={Media} />
        <Route path="/contact" component={Contact} />
        <Route path="/courses" component={Courses} />
        
        {/* Department Pages */}
        <Route path="/departments" component={Departments} />
        <Route path="/department/:deptId" component={Department} />
        <Route path="/hostel" component={HostelPage} />
        
        {/* Governance & Committees */}
        <Route path="/governance" component={GovernancePage} />
        <Route path="/governing-body" component={GoverningBody} />
        <Route path="/student-council" component={StudentCouncil} />
        <Route path="/associations" component={Association} />
        
        {/* Events & Alumni */}
        <Route path="/clubs" component={Clubs} />
        <Route path="/achievements" component={Achievements} />
        <Route path="/alumni" component={Alumni} />

        {/* Developer Info */}
        <Route path="/triversesolutions" component={TriverseSolutions} />
        <Route path="/admin" component={AdminLogin} />
        <Route path="/admin/dashboard" component={AdminDashboard} />
        <Route path="/approvals" component={Approvals} />
        <Route path="/students/hostels" component={HostelPage} />
        <Route path="/students/girls-hostel" component={HostelPage} />
        <Route path="/students/boys-hostel" component={HostelPage} />
        <Route path="/students/achievements" component={Achievements} />
        <Route path="/students/clubs" component={Clubs} />
        <Route path="/students/association" component={Association} />
        <Route path="/students/alumni" component={Alumni} />
        <Route path="/governance/governing-body" component={GoverningBody} />
        <Route path="/governance/student-council" component={StudentCouncil} />
        <Route path="/governance/:slug" component={GovernancePage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function ScrollToTop() {
  const [pathname] = useLocation();

  useEffect(() => {
    // Use a small timeout to ensure DOM has updated before scrolling
    setTimeout(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    }, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" forcedTheme="light" disableTransitionOnChange>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
            <ScrollToTop />
            <Router />
          </WouterRouter>
          <Toaster />
        </TooltipProvider>
      </QueryClientProvider>
    </ThemeProvider>
  );
}

export default App;
