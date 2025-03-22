"use client";

import { format, startOfWeek, addDays, isToday } from "date-fns";
import DayHeader, { DayHeaderProps } from "./DayHeader";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

const CalendarHeader = ({ currentDate, onPrevWeek, onNextWeek }: CalendarHeaderProps) => {
  const generateWeekDays = (startDate: Date): DayHeaderProps[] => {
    const days: DayHeaderProps[] = [];
    const start = startOfWeek(startDate, { weekStartsOn: 0 });

    for (let i = 0; i < 7; i++) {
      const date = addDays(start, i);
      days.push({
        date: parseInt(format(date, "d")),
        day: format(date, "EEE"),
        isToday: isToday(date),
      });
    }
    return days;
  };

  const days = generateWeekDays(currentDate);
  const currentMonth = format(currentDate, 'MMMM yyyy');

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Your Schedule {currentMonth}</h2>
        <div className="flex gap-2">
          <button
            onClick={onPrevWeek}
            className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            ←
          </button>
          <button
            onClick={onNextWeek}
            className="p-2 bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            →
          </button>
        </div>
      </div>
      <div className="flex justify-between">
        {days.map((day) => (
          <DayHeader
            key={`${day.date}-${day.day}`}
            date={day.date}
            day={day.day}
            isToday={day.isToday}
          />
        ))}
      </div>
    </div>
  );
};

export default CalendarHeader;
