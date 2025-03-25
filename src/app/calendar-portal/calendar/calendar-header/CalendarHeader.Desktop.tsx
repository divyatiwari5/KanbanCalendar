import DayHeader from "./DayHeader";
import { DayHeaderProps } from "./DayHeader";

interface DesktopCalendarHeaderProps {
  days: DayHeaderProps[];
}

const CalendarHeaderDesktop = ({ days }: DesktopCalendarHeaderProps) => {
  return (
    <div className="hidden md:flex">
      {/* Time gutter space */}
      <div className="w-16"></div>
      {/* Days grid */}
      <div className="flex-1 grid grid-cols-7">
        {days.map((day) => (
          <DayHeader
            key={`${day.date}-${day.day}`}
            date={day.date}
            day={day.day}
            isToday={day.isToday}
            fullDate={day.fullDate}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarHeaderDesktop;
