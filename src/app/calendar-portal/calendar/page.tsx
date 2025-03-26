import { startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import CalendarClientContainer from "./CalendarClientContainer";

export default function CalendarPage() {
  const today = new Date();
  const weekStart = startOfWeek(today, { weekStartsOn: 0 });
  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 0 });
  
  // Calculate initial selected date
  const initialSelectedDate = isWithinInterval(today, { start: weekStart, end: weekEnd })
    ? today
    : weekStart;

  return (
    <div className="flex flex-col h-full py-2.5 px-4">
      <CalendarClientContainer 
        initialCurrentDate={today}
        initialSelectedDate={initialSelectedDate}
      />
    </div>
  );
}
