'use client';

import { useState } from "react";
import { addWeeks, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import CalendarHeader from "./calendar-header/CalendarHeader";
import WeekView from "./calendar-event/WeekView";

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  // Helper function to get the default selected date for a week
  const getDefaultSelectedDate = (weekStartDate: Date) => {
    const today = new Date();
    const weekStart = startOfWeek(weekStartDate, { weekStartsOn: 0 });
    const weekEnd = endOfWeek(weekStart, { weekStartsOn: 0 });

    // If today is within the week range, select today
    if (isWithinInterval(today, { start: weekStart, end: weekEnd })) {
      return today;
    }

    // Otherwise select the first day of the week
    return weekStart;
  };

  const handlePrevWeek = () => {
    const newDate = addWeeks(currentDate, -1);
    setCurrentDate(newDate);
    setSelectedDate(getDefaultSelectedDate(newDate));
  };

  const handleNextWeek = () => {
    const newDate = addWeeks(currentDate, 1);
    setCurrentDate(newDate);
    setSelectedDate(getDefaultSelectedDate(newDate));
  };

  const handleDaySelect = (date: Date) => {
    setCurrentDate(date);
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col h-full py-2.5 px-4">
      <CalendarHeader 
        currentDate={currentDate}
        selectedDate={selectedDate}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onDaySelect={handleDaySelect}
      />
      <WeekView 
        selectedDate={selectedDate} 
        onDateChange={handleDaySelect}
      />
    </div>
  );
};

export default Calendar;
