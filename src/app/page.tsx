'use client';

import { useState } from 'react';
import { addWeeks, startOfWeek, endOfWeek, isWithinInterval } from 'date-fns';
import CalendarHeader from '@/app/shared/CalendarHeader';
import WeekView from '@/app/calendar-portal/calendar-event/WeekView';

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

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
    setSelectedDate(date);
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f6f8ff] to-[#eef1f9]">
      <div className="max-w-7xl mx-auto p-4">
        <CalendarHeader 
          currentDate={currentDate}
          selectedDate={selectedDate}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
          onDaySelect={handleDaySelect}
        />
        <WeekView selectedDate={selectedDate} />
      </div>
    </div>
  );
}
