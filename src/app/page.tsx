'use client';

import { useState } from 'react';
import { addWeeks } from 'date-fns';
import CalendarHeader from '@/app/shared/CalendarHeader';
import WeekView from '@/app/calendar-portal/WeekView';

export default function Home() {
  const [currentDate, setCurrentDate] = useState(new Date());

  const handlePrevWeek = () => {
    setCurrentDate(prev => addWeeks(prev, -1));
  };

  const handleNextWeek = () => {
    setCurrentDate(prev => addWeeks(prev, 1));
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f6f8ff] to-[#eef1f9]">
      <div className="max-w-7xl mx-auto p-4">
        <CalendarHeader 
          currentDate={currentDate}
          onPrevWeek={handlePrevWeek}
          onNextWeek={handleNextWeek}
        />
        <WeekView selectedDate={currentDate} />
      </div>
    </div>
  );
}
