"use client";

import { format } from "date-fns";
import { useState } from "react";
import { events as initialEvents } from "@/app/mockData/eventData";
import WeekViewMobile from "./WeekView.Mobile";
import WeekViewDesktop from "./WeekView.Desktop";

interface WeekViewProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const WeekView = ({ selectedDate, onDateChange }: WeekViewProps) => {
  const [events, setEvents] = useState(initialEvents);

  // Get events for the selected day (mobile view)
  const getSelectedDayEvents = () => {
    const dateString = format(selectedDate, "yyyy-MM-dd");
    return events[dateString] || [];
  };

  const handleEventUpdate = (updatedEvents: typeof events) => {
    setEvents(updatedEvents);
  };

  return (
    <div className="w-full relative mt-4 rounded-lg overflow-hidden bg-[#eef1f9]">
      <WeekViewMobile
        events={getSelectedDayEvents()}
        selectedDate={selectedDate}
        onDateChange={onDateChange}
      />
      <WeekViewDesktop 
        selectedDate={selectedDate} 
        events={events} 
        onEventUpdate={handleEventUpdate}
      />
    </div>
  );
};

export default WeekView;
