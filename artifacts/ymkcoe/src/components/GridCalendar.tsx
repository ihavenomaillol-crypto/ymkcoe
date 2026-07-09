import { useState, useMemo } from "react";
import { format, isSameDay, isWithinInterval, startOfDay, endOfDay, isSameMonth } from "date-fns";
import { Calendar, CalendarDayButton } from "@/components/ui/calendar";
import { DayButton } from "react-day-picker";
import { Sun, BookOpen, Edit3, Activity, Calendar as CalendarIcon, CheckCircle2, ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

type EventType = "academic" | "exam" | "activity" | "holiday";

interface CalendarEvent {
  id: string;
  title: string;
  type: EventType;
  startDate: Date;
  endDate: Date;
  description: string;
  metadata?: { label: string; value: string }[];
}

const TYPE_COLORS = {
  academic: "bg-blue-500",
  exam: "bg-purple-500",
  activity: "bg-orange-500",
  holiday: "bg-emerald-500",
};

const TYPE_TEXT_COLORS = {
  academic: "text-blue-500",
  exam: "text-purple-500",
  activity: "text-orange-500",
  holiday: "text-emerald-500",
};

const TYPE_BG_LIGHT = {
  academic: "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-400",
  exam: "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-400",
  activity: "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400",
  holiday: "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400",
};

const TYPE_ICONS = {
  academic: <BookOpen className="w-4 h-4" />,
  exam: <Edit3 className="w-4 h-4" />,
  activity: <Activity className="w-4 h-4" />,
  holiday: <Sun className="w-4 h-4" />,
};

// Generate some realistic mock data for YMKCOE
const MOCK_EVENTS: CalendarEvent[] = [
  {
    id: "1",
    title: "Commencement of Classes (Odd Semester)",
    type: "academic",
    startDate: new Date(2025, 7, 1), // Aug 1, 2025
    endDate: new Date(2025, 7, 1),
    description: "Official start of the odd semester classes for all branches (Second year onwards).",
    metadata: [{ label: "Applicable to", value: "SE, TE, BE" }]
  },
  {
    id: "2",
    title: "Independence Day Flag Hoisting",
    type: "activity",
    startDate: new Date(2025, 7, 15), // Aug 15, 2025
    endDate: new Date(2025, 7, 15),
    description: "Flag hoisting ceremony at the main campus ground followed by cultural programs.",
    metadata: [{ label: "Time", value: "7:30 AM" }, { label: "Venue", value: "Main Ground" }]
  },
  {
    id: "3",
    title: "Internal Assessment I",
    type: "exam",
    startDate: new Date(2025, 7, 25), // Aug 25, 2025
    endDate: new Date(2025, 7, 29),
    description: "First mid-semester examinations as per DBATU guidelines.",
    metadata: [{ label: "Weightage", value: "20 Marks" }]
  },
  {
    id: "4",
    title: "Ganesh Chaturthi Break",
    type: "holiday",
    startDate: new Date(2025, 7, 27),
    endDate: new Date(2025, 8, 2), // To Sept 2
    description: "College will remain closed for the auspicious occasion of Ganesh Chaturthi.",
  },
  {
    id: "5",
    title: "Techfest '25 - Innovate",
    type: "activity",
    startDate: new Date(2025, 8, 15),
    endDate: new Date(2025, 8, 16),
    description: "Annual national-level technical symposium featuring hackathons, paper presentations, and robotics.",
    metadata: [{ label: "Registrations", value: "Open till Sept 10" }]
  },
  {
    id: "6",
    title: "Internal Assessment II",
    type: "exam",
    startDate: new Date(2025, 9, 15), // Oct 15
    endDate: new Date(2025, 9, 19),
    description: "Second mid-semester examinations.",
  },
  {
    id: "7",
    title: "Diwali Vacation",
    type: "holiday",
    startDate: new Date(2025, 9, 20),
    endDate: new Date(2025, 10, 5), // Nov 5
    description: "Festival break. Hostel students must vacate within 24 hours of starting.",
  },
  {
    id: "8",
    title: "End Semester Practical Exams",
    type: "exam",
    startDate: new Date(2025, 10, 10),
    endDate: new Date(2025, 10, 20),
    description: "DBATU University practical and oral examinations.",
  },
  {
    id: "9",
    title: "DBATU Winter Examinations",
    type: "exam",
    startDate: new Date(2025, 10, 25), // Nov 25
    endDate: new Date(2025, 11, 20), // Dec 20
    description: "Final written examinations for the odd semester.",
  }
];

export default function GridCalendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2025, 7, 25)); // Default to Aug 25, 2025
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date(2025, 7, 1)); // Default month to Aug 2025

  // Memoized helper to get events for a specific date
  const getEventsForDate = (date: Date) => {
    return MOCK_EVENTS.filter(event => 
      isWithinInterval(startOfDay(date), { 
        start: startOfDay(event.startDate), 
        end: endOfDay(event.endDate) 
      })
    );
  };

  // Events for the selected date
  const selectedDateEvents = useMemo(() => getEventsForDate(selectedDate), [selectedDate]);

  // Events for the currently viewed month
  const currentMonthEvents = useMemo(() => {
    return MOCK_EVENTS.filter(event => 
      isSameMonth(event.startDate, currentMonth) || isSameMonth(event.endDate, currentMonth)
    ).sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
  }, [currentMonth]);

  // Custom DayButton renderer to include colored dots
  const CustomDayButton = (props: React.ComponentProps<typeof DayButton>) => {
    const { day } = props;
    const events = getEventsForDate(day.date);
    
    // Deduplicate event types to avoid showing 5 blue dots for 5 academic events
    const uniqueTypes = Array.from(new Set(events.map(e => e.type)));

    return (
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <CalendarDayButton 
          {...props} 
          className={cn(
            props.className, 
            "rounded-full w-10 h-10 transition-colors",
            props.modifiers.selected && "bg-slate-900 text-white hover:bg-slate-800 dark:bg-white dark:text-slate-900",
            props.modifiers.today && !props.modifiers.selected && "bg-slate-100 dark:bg-slate-800"
          )} 
        />
        {uniqueTypes.length > 0 && (
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1 z-10 pointer-events-none">
            {uniqueTypes.map((type) => (
              <span key={type} className={cn("w-1.5 h-1.5 rounded-full", TYPE_COLORS[type])} />
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="w-full flex flex-col lg:flex-row gap-8 py-8 bg-white dark:bg-slate-950 rounded-[32px] p-6 lg:p-10 border border-slate-100 dark:border-slate-800 shadow-sm">
      
      {/* Left Pane: Calendar Grid */}
      <div className="w-full lg:w-1/2 flex flex-col">
        
        {/* Custom Header */}
        <div className="flex flex-col items-center mb-8 relative">
          <div className="flex justify-between items-center w-full mb-2">
            <button 
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}
              className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            
            <div className="flex flex-col items-center text-center">
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                {format(currentMonth, "MMMM yyyy")}
              </h2>
              <span className="text-[10px] font-bold tracking-widest uppercase text-amber-500 mt-1">
                Academic Year 2025-26
              </span>
            </div>

            <button 
              onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}
              className="p-2 text-slate-400 hover:text-slate-900 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Calendar */}
        <div className="flex justify-center w-full">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            month={currentMonth}
            onMonthChange={setCurrentMonth}
            showOutsideDays={false}
            // Hide default nav and caption as we built a custom one above
            classNames={{
              nav: "hidden",
              month_caption: "hidden",
              head_row: "flex w-full justify-between mb-4",
              head_cell: "w-10 text-slate-400 text-xs font-bold uppercase",
              row: "flex w-full justify-between mt-4",
              cell: "w-10 h-10 p-0 relative", // relative to allow dots positioning
              months: "w-full",
              month: "w-full space-y-4",
              table: "w-full",
            }}
            components={{
              DayButton: CustomDayButton
            }}
          />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center justify-center gap-6 mt-12 pt-6 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Academics</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Exams / sessionals</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-orange-500" />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Activities</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">Holidays</span>
          </div>
        </div>
      </div>

      {/* Right Pane: Day Details & Events list */}
      <div className="w-full lg:w-1/2 flex flex-col bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 lg:p-8">
        
        {/* Selected Day Details */}
        <div className="mb-10">
          <h3 className="text-[11px] font-bold tracking-widest uppercase text-amber-500 mb-4 flex items-center gap-2">
            Day Details: {format(selectedDate, "MMM dd, yyyy")}
          </h3>

          {selectedDateEvents.length > 0 ? (
            <div className="space-y-4">
              {selectedDateEvents.map((event) => (
                <div key={event.id} className="bg-white dark:bg-slate-900 rounded-xl p-5 shadow-sm border border-slate-100 dark:border-slate-800">
                  <div className={cn("inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase mb-3", TYPE_BG_LIGHT[event.type])}>
                    {TYPE_ICONS[event.type]}
                    <span>{event.type}</span>
                  </div>
                  
                  <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight">
                    {event.title}
                  </h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
                    {event.description}
                  </p>

                  {event.metadata && (
                    <div className="space-y-2 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                      {event.metadata.map((meta, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs">
                          <CheckCircle2 className="w-3.5 h-3.5 text-slate-400 mt-0.5" />
                          <div>
                            <span className="font-semibold text-slate-700 dark:text-slate-300">{meta.label}: </span>
                            <span className="text-slate-500 dark:text-slate-400">{meta.value}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-slate-900 rounded-xl p-8 flex flex-col items-center justify-center text-center border border-slate-100 dark:border-slate-800 border-dashed">
              <CalendarIcon className="w-8 h-8 text-slate-300 mb-3" />
              <p className="text-sm font-medium text-slate-500">No scheduled events on this date.</p>
            </div>
          )}
        </div>

        {/* Monthly Events Summary */}
        <div className="mt-auto">
          <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-3 mb-4">
            <h3 className="text-[11px] font-bold tracking-widest uppercase text-slate-500">
              Events in {format(currentMonth, "MMMM")}
            </h3>
            <span className="text-[10px] font-bold text-slate-400 uppercase">
              {currentMonthEvents.length} Scheduled
            </span>
          </div>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {currentMonthEvents.length > 0 ? (
              currentMonthEvents.map((event) => {
                const isActive = isWithinInterval(new Date(), { start: startOfDay(event.startDate), end: endOfDay(event.endDate) });
                const isPast = endOfDay(event.endDate) < new Date();
                
                return (
                  <div key={`summary-${event.id}`} className="flex items-center justify-between group cursor-pointer" onClick={() => setSelectedDate(event.startDate)}>
                    <div className="pr-4">
                      <h5 className="text-sm font-bold text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors line-clamp-1">
                        {event.title}
                      </h5>
                      <p className="text-xs text-slate-500 mt-0.5">
                        {isSameDay(event.startDate, event.endDate) 
                          ? format(event.startDate, "MMM dd, yyyy")
                          : `${format(event.startDate, "MMM dd")} - ${format(event.endDate, "MMM dd, yyyy")}`
                        }
                      </p>
                    </div>
                    <div>
                      {isActive ? (
                        <Badge variant="default" className="bg-amber-500 hover:bg-amber-600 text-[9px] uppercase">Active Now</Badge>
                      ) : isPast ? (
                        <Badge variant="secondary" className="text-[9px] uppercase bg-slate-100 text-slate-500">Completed</Badge>
                      ) : (
                        <Badge variant="outline" className="text-[9px] uppercase border-slate-200 text-slate-400">Upcoming</Badge>
                      )}
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-xs text-slate-400 italic">No events scheduled for this month.</p>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
