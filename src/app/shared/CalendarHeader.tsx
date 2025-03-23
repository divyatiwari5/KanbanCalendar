"use client";

import { format, startOfWeek, addDays, isToday } from "date-fns";
import DayHeader, { DayHeaderProps } from "./DayHeader";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onDaySelect?: (date: Date) => void;
  selectedDate: Date;
}

const CalendarHeader = ({ currentDate, onPrevWeek, onNextWeek, onDaySelect, selectedDate }: CalendarHeaderProps) => {
  const generateWeekDays = (startDate: Date): DayHeaderProps[] => {
    const days: DayHeaderProps[] = [];
    const start = startOfWeek(startDate, { weekStartsOn: 0 });

    for (let i = 0; i < 7; i++) {
      const date = addDays(start, i);
      days.push({
        date: parseInt(format(date, "d")),
        day: format(date, "EEE"),
        isToday: isToday(date),
        fullDate: date,
      });
    }
    return days;
  };

  const days = generateWeekDays(currentDate);
  const currentMonth = format(currentDate, 'MMMM yyyy');

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl">Your Schedule</h2>
          <h3 className="text-sm mt-1 opacity-80">{currentMonth}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPrevWeek}
            className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            ←
          </button>
          <button
            onClick={onNextWeek}
            className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            →
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden grid grid-cols-7 gap-1">
        {days.map((day) => (
          <button
            key={`${day.date}-${day.day}`}
            onClick={() => onDaySelect?.(day.fullDate)}
            className={`p-2 rounded-xl transition-all ${
              format(day.fullDate, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
                ? 'bg-gradient-to-tr from-indigo-600 to-violet-600'
                : 'bg-white/10 hover:bg-white/20'
            }`}
          >
            <div className="text-xs font-medium">{day.day}</div>
            <div className="text-lg font-semibold mt-1">{day.date}</div>
          </button>
        ))}
      </div>

      {/* Desktop View */}
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
    </div>
  );
};

export default CalendarHeader;
