"use client";

import { useState, useMemo, memo } from "react";
import { addWeeks, startOfWeek, endOfWeek, isWithinInterval } from "date-fns";
import CalendarHeader from "./calendar-header/CalendarHeader";
import WeekView from "./calendar-event/WeekView";

// Memoized components for better performance
const MemoizedCalendarHeader = memo(CalendarHeader);
const MemoizedWeekView = memo(WeekView);

interface CalendarClientContainerProps {
  initialCurrentDate: Date;
  initialSelectedDate: Date;
}

const CalendarClientContainer = ({ initialCurrentDate, initialSelectedDate }: CalendarClientContainerProps) => {
  const [currentDate, setCurrentDate] = useState(initialCurrentDate);
  const [selectedDate, setSelectedDate] = useState(initialSelectedDate);

  // Memoized helper function to get the default selected date for a week
  const getDefaultSelectedDate = useMemo(() => {
    return (weekStartDate: Date) => {
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
  }, []);

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
    <>
      <MemoizedCalendarHeader
        currentDate={currentDate}
        selectedDate={selectedDate}
        onPrevWeek={handlePrevWeek}
        onNextWeek={handleNextWeek}
        onDaySelect={handleDaySelect}
      />
      <MemoizedWeekView
        selectedDate={selectedDate}
        onDateChange={handleDaySelect}
      />
    </>
  );
};

export default CalendarClientContainer;
