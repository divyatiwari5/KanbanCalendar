import { format } from "date-fns";
import { DayHeaderProps } from "./DayHeader";

interface MobileCalendarHeaderProps {
  days: DayHeaderProps[];
  selectedDate: Date;
  onDaySelect?: (date: Date) => void;
}

const CalendarHeaderMobile = ({
  days,
  selectedDate,
  onDaySelect,
}: MobileCalendarHeaderProps) => {
  return (
    <div className="md:hidden grid grid-cols-7 gap-1">
      {days.map((day) => (
        <button
          key={`${day.date}-${day.day}`}
          onClick={() => onDaySelect?.(day.fullDate)}
          className={`p-2 rounded-xl transition-all ${
            format(day.fullDate, "yyyy-MM-dd") ===
            format(selectedDate, "yyyy-MM-dd")
              ? "bg-gradient-to-tr from-indigo-600 to-violet-600"
              : "bg-white/10 hover:bg-white/20"
          }`}
        >
          <div className="text-xs font-medium">{day.day}</div>
          <div className="text-lg font-semibold mt-1">{day.date}</div>
        </button>
      ))}
    </div>
  );
};

export default CalendarHeaderMobile;
