import { WeekDayData } from "@/app/utils/dateHelpers";
import DayHeader from "./DayHeader";

interface DesktopCalendarHeaderProps {
  days: WeekDayData[];
  selectedDate: Date;
}

const CalendarHeaderDesktop = ({
  days,
  selectedDate,
}: DesktopCalendarHeaderProps) => {
  return (
    <div className="hidden md:flex">
      {/* Time gutter space */}
      <div className="w-16"></div>
      {/* Days grid */}
      <div className="flex-1 grid grid-cols-7">
        {days.map((day) => (
          <DayHeader
            key={`${day.date}-${day.day}`}
            {...day}
            selectedDate={selectedDate}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarHeaderDesktop;
