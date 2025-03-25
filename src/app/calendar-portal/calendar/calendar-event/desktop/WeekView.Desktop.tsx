"use client";

import { memo, useMemo, useCallback, useEffect, useState } from "react";
import { startOfWeek, addDays, format } from "date-fns";
import { CalendarEvent } from "@/app/mockData/eventData";
import TimeGrid from "./TimeGrid";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import DayColumn from "./DayColumn";

interface DesktopViewProps {
  selectedDate: Date;
  events: Record<string, CalendarEvent[]>;
  hourHeight?: number;
  onEventUpdate?: (updatedEvents: Record<string, CalendarEvent[]>) => void;
}

const WeekViewDesktop = memo(({
  selectedDate,
  events,
  hourHeight = 100,
  onEventUpdate,
}: DesktopViewProps) => {
  // Memoize weekStart to prevent recalculation
  const weekStart = useMemo(() => 
    startOfWeek(selectedDate, { weekStartsOn: 0 }),
    [selectedDate]
  );

  // Memoize getEventsForDay function
  const getEventsForDay = useCallback((date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return events[dateString] || [];
  }, [events]);

  // Handle drag end with useCallback
  const handleDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside a valid drop zone
    if (!destination) return;

    const sourceDate = source.droppableId;
    const destinationDate = destination.droppableId;

    // Create a new events object to maintain immutability
    const newEvents = { ...events };

    // Remove from source
    const sourceEvents = [...(newEvents[sourceDate] || [])];
    const [movedEvent] = sourceEvents.splice(source.index, 1);

    // Add to destination
    const destinationEvents = [...(newEvents[destinationDate] || [])];
    destinationEvents.splice(destination.index, 0, movedEvent);

    // Update the events object
    newEvents[sourceDate] = sourceEvents;
    newEvents[destinationDate] = destinationEvents;

    // Call the update handler
    onEventUpdate?.(newEvents);
  }, [events, onEventUpdate]);

  // State and effect for real-time current time updates
  const [currentTime, setCurrentTime] = useState(() => ({
    top: (new Date().getHours() * 60 + new Date().getMinutes()) * (hourHeight / 60),
  }));

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime({
        top: (new Date().getHours() * 60 + new Date().getMinutes()) * (hourHeight / 60),
      });
    };

    const timer = setInterval(updateCurrentTime, 60000); // Update every minute
    return () => clearInterval(timer);
  }, [hourHeight]);

  // Memoize the days array to prevent recreation on every render
  const days = useMemo(() => 
    Array.from({ length: 7 }, (_, dayIndex) => {
      const currentDay = addDays(weekStart, dayIndex);
      const dateString = format(currentDay, "yyyy-MM-dd");
      const dayEvents = getEventsForDay(currentDay);
      
      return {
        currentDay,
        dateString,
        dayEvents,
      };
    }),
    [weekStart, getEventsForDay]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="hidden md:block">
        <div
          className="overflow-y-auto calendar-scroll"
          style={{ height: "600px" }}
        >
          <div className="relative" style={{ height: `${hourHeight * 24}px` }}>
            <TimeGrid hourHeight={hourHeight} />
            <div className="absolute top-0 left-20 right-4">
              <div className="grid grid-cols-7 gap-px h-full bg-gray-200">
                {days.map(({ currentDay, dateString, dayEvents }) => (
                  <DayColumn
                    key={dateString}
                    dateString={dateString}
                    currentDay={currentDay}
                    dayEvents={dayEvents}
                    hourHeight={hourHeight}
                    currentTime={currentTime}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
});

WeekViewDesktop.displayName = 'WeekViewDesktop';

export default WeekViewDesktop;
