import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { GraduationCap, Sparkles } from "lucide-react";

export function AdmissionPopup() {
  const [open, setOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState(12);

  useEffect(() => {
    // Check if the user has already seen the popup in this session
    const hasSeenPopup = sessionStorage.getItem("admission_popup_seen");
    
    if (!hasSeenPopup) {
      // Small delay to make it feel natural
      const timer = setTimeout(() => {
        setOpen(true);
        sessionStorage.setItem("admission_popup_seen", "true");
      }, 500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (open && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (open && timeLeft === 0) {
      setOpen(false);
    }
  }, [open, timeLeft]);

  return (
    <Dialog open={open} onOpenChange={(val) => {
      // Prevent closing by clicking outside or pressing escape if timer is not done
      if (!val && timeLeft > 0) return;
      setOpen(val);
    }}>
      <DialogContent className="sm:max-w-[600px] [&>button]:hidden overflow-hidden p-0 border-primary/20 shadow-2xl z-[100]">
        <div className="bg-gradient-to-r from-primary to-primary/80 px-6 py-8 text-primary-foreground text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-20">
            <Sparkles className="w-24 h-24" />
          </div>
          <GraduationCap className="w-16 h-16 mx-auto mb-4" />
          <DialogTitle className="text-3xl font-bold mb-2">Admissions Open 2026-27</DialogTitle>
          <DialogDescription className="text-primary-foreground/90 text-lg">
            Engineer your future with excellence at YMKCOE!
          </DialogDescription>
        </div>
        
        <div className="p-6 bg-background space-y-6">
          <div className="grid gap-4">
            <h3 className="font-semibold text-lg border-b pb-2">Available B.Tech Programs</h3>
            
            <div className="grid gap-3">
              {[
                { name: "Computer Science & Engineering", code: "1635224210" },
                { name: "Information Technology", code: "1635224610" },
                { name: "Artificial Intelligence & Data Science", code: "1635299510" },
                { name: "Electronics & Telecommunication", code: "1635237210" },
              ].map((course) => (
                <div key={course.code} className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 rounded-lg bg-muted/50 border border-border">
                  <span className="font-medium">{course.name}</span>
                  <span className="text-sm bg-primary/10 text-primary px-3 py-1 rounded-full whitespace-nowrap mt-2 sm:mt-0 font-mono font-semibold">
                    Code: {course.code}
                  </span>
                </div>
              ))}
            </div>
            <div className="text-center mt-2 text-sm text-muted-foreground">
              DTE Choice Code: <strong>16352</strong>
            </div>
          </div>

          <div className="flex justify-end pt-4 border-t">
            <Button 
              onClick={() => setOpen(false)}
              className="w-full sm:w-auto transition-all"
            >
              Continue to Website
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
