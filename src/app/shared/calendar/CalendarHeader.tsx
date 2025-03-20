"use client";

import { useState } from "react";
import DayHeader, { DayHeaderProps } from "./DayHeader";
import { addWeeks, format, startOfWeek, addDays, isToday } from "date-fns";

const CalendarHeader = () => {
  const [currentDate, setCurrentDate] = useState(new Date());

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

  const handlePrevWeek = () => {
    setCurrentDate((prev) => addWeeks(prev, -1));
  };

  const handleNextWeek = () => {
    setCurrentDate((prev) => addWeeks(prev, 1));
  };

  const days = generateWeekDays(currentDate);

  return (
    <div className="bg-blue-500 text-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl">Your Schedule</h2>
        <div className="flex gap-2">
          <button
            onClick={handlePrevWeek}
            className="p-2 hover:bg-blue-600 rounded-full transition-colors"
          >
            ←
          </button>
          <button
            onClick={handleNextWeek}
            className="p-2 hover:bg-blue-600 rounded-full transition-colors"
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
