"use client";

import { memo, useMemo } from "react";
import WeekViewMobile from "./WeekView.Mobile";
import WeekViewDesktop from "./WeekView.Desktop";
import { useWeekEvents } from "@/app/hooks/useWeekEvents";
import type { CalendarEvent } from "@/app/mockData/eventData";

interface WeekViewProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

// Define the EventsByDate interface
export interface EventsByDate {
  [date: string]: CalendarEvent[];
}

const WeekView = ({ selectedDate, onDateChange }: WeekViewProps) => {
  const { 
    events, 
    selectedDayEvents, 
    handleEventUpdate, 
    handleMoveEvent 
  } = useWeekEvents(onDateChange);

  // Memoize the current day's events
  const currentDayEvents = useMemo(() => 
    selectedDayEvents(selectedDate),
    [selectedDayEvents, selectedDate]
  );

  // Memoize props for child components to prevent unnecessary re-renders
  const mobileViewProps = useMemo(() => ({
    events: currentDayEvents,
    selectedDate,
    onDateChange,
    onMoveEvent: handleMoveEvent
  }), [currentDayEvents, selectedDate, onDateChange, handleMoveEvent]);

  const desktopViewProps = useMemo(() => ({
    selectedDate,
    events,
    onEventUpdate: handleEventUpdate
  }), [selectedDate, events, handleEventUpdate]);

  return (
    <div className="w-full relative mt-4 rounded-lg overflow-hidden bg-[#eef1f9]">
      <WeekViewMobile {...mobileViewProps} />
      <WeekViewDesktop {...desktopViewProps} />
    </div>
  );
};

export default memo(WeekView);
