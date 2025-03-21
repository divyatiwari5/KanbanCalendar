"use client";

import TimeGrid from "@/app/shared/TimeGrid";
import EventBlock from "@/app/shared/EventBlock";
import { startOfWeek, addDays, format } from "date-fns";
import { events } from "@/app/mockData/eventData";

interface WeekViewProps {
  selectedDate: Date;
}

const WeekView = ({ selectedDate }: WeekViewProps) => {
  const hourHeight = 60;

  // Get events for the current week
  const getEventsForDay = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    const dayEvents = events[dateString] || [];
    return dayEvents;
  };
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });

  return (
    <div className="w-full relative mt-4 border rounded-lg overflow-hidden bg-white">
      <div className="overflow-y-auto calendar-scroll" style={{ height: "600px" }}>
        <div className="relative" style={{ height: `${hourHeight * 24}px` }}>
          <TimeGrid hourHeight={hourHeight} />
          {/* Events container */}
          <div className="absolute top-0 left-16 right-0">
            <div className="grid grid-cols-7 h-full">
              {Array.from({ length: 7 }, (_, dayIndex) => {
                const currentDay = addDays(weekStart, dayIndex);
                const dayEvents = getEventsForDay(currentDay);
                return (
                  <div key={dayIndex} className="relative h-full border-r last:border-r-0">
                    {dayEvents.map((event) => (
                      <EventBlock
                        key={event.id}
                        event={event}
                        hourHeight={hourHeight}
                      />
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeekView;
