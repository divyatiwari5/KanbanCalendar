"use client";

import { format } from "date-fns";
import { events } from "@/app/mockData/eventData";
import WeekViewMobile from "./WeekView.Mobile";
import WeekViewDesktop from "./WeekView.Desktop";

interface WeekViewProps {
  selectedDate: Date;
}

const WeekView = ({ selectedDate }: WeekViewProps) => {
  // Get events for the selected day (mobile view)
  const getSelectedDayEvents = () => {
    const dateString = format(selectedDate, "yyyy-MM-dd");
    return events[dateString] || [];
  };

  return (
    <div className="w-full relative mt-4 rounded-lg overflow-hidden bg-[#eef1f9]">
      <WeekViewMobile
        events={getSelectedDayEvents()}
        selectedDate={selectedDate}
      />
      <WeekViewDesktop selectedDate={selectedDate} events={events} />
    </div>
  );
};

export default WeekView;
