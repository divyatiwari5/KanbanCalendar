'use client';

import { useState } from "react";
import { addWeeks, startOfWeek } from "date-fns";
import CalendarHeader from "@/app/shared/CalendarHeader";
import WeekView from "../calendar-event/WeekView";

const Calendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [selectedDate, setSelectedDate] = useState(today);

  const handlePrevWeek = () => {
    const newDate = addWeeks(currentDate, -1);
    setCurrentDate(newDate);
    setSelectedDate(startOfWeek(newDate));
  };

  const handleNextWeek = () => {
    const newDate = addWeeks(currentDate, 1);
    setCurrentDate(newDate);
    setSelectedDate(startOfWeek(newDate));
  };

  const handleDaySelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <div className="flex flex-col h-full">
      <CalendarHeader 
        currentDate={currentDate}
        selectedDate={selectedDate}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onDaySelect={handleDaySelect}
      />
      <WeekView selectedDate={selectedDate} />
    </div>
  );
};

export default Calendar;
