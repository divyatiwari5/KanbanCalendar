"use client";

import { memo, useMemo, useState, useEffect } from "react";
import { startOfWeek } from "date-fns";
import { DragDropContext } from "@hello-pangea/dnd";
import TimeGrid from "./TimeGrid";
import DayColumn from "./DayColumn";
import {
  generateWeekDaysWithEvents,
  calculateCurrentTimePosition,
} from "@/app/utils/dateHelpers";
import { CalendarEvent } from "@/app/mockData/eventData";
import { useEventHandling } from "@/app/hooks/useEventHandling";

interface WeekViewDesktopProps {
  selectedDate: Date;
  events: Record<string, CalendarEvent[]>;
  hourHeight?: number;
  onEventUpdate?: (updatedEvents: Record<string, CalendarEvent[]>) => void;
}

const WeekViewDesktop = memo(
  ({
    selectedDate,
    events,
    hourHeight = 100,
    onEventUpdate,
  }: WeekViewDesktopProps) => {
    // Memoize weekStart to prevent recalculation
    const weekStart = useMemo(
      () => startOfWeek(selectedDate, { weekStartsOn: 0 }),
      [selectedDate]
    );

    // Use custom hook for event handling
    const { handleDragEnd, getEventsForDay } = useEventHandling({
      events,
      onEventUpdate,
    });

    // State and effect for real-time current time updates
    const [currentTime, setCurrentTime] = useState(() => ({
      top: calculateCurrentTimePosition(hourHeight),
    }));

    useEffect(() => {
      const updateCurrentTime = () => {
        setCurrentTime({
          top: calculateCurrentTimePosition(hourHeight),
        });
      };

      const timer = setInterval(updateCurrentTime, 60000); // Update every minute
      return () => clearInterval(timer);
    }, [hourHeight]);

    // Memoize the days array using the utility function
    const days = useMemo(
      () => generateWeekDaysWithEvents(weekStart, getEventsForDay),
      [weekStart, getEventsForDay]
    );

    return (
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="hidden md:block">
          <div
            className="overflow-y-auto calendar-scroll"
            style={{ height: "600px" }}
          >
            <div
              className="relative"
              style={{ height: `${hourHeight * 24}px` }}
            >
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
  }
);

WeekViewDesktop.displayName = "WeekViewDesktop";

export default WeekViewDesktop;
