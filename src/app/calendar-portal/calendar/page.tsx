'use client';

import { useState } from "react";
import { addWeeks } from "date-fns";
import CalendarHeader from "@/app/shared/CalendarHeader";
import WeekView from "../WeekView";

const Calendar = () => {
  // Initialize with March 21, 2025
  const [currentDate, setCurrentDate] = useState(new Date(2025, 2, 21));

  const handlePrevWeek = () => {
    setCurrentDate(prev => addWeeks(prev, -1));
  };

  const handleNextWeek = () => {
    setCurrentDate(prev => addWeeks(prev, 1));
  };

  return (
    <div className="flex flex-col h-full">
      <CalendarHeader 
        currentDate={currentDate}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
      />
      <WeekView selectedDate={currentDate} />
    </div>
  );
};

export default Calendar;
