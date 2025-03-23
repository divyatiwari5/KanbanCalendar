'use client';

import { startOfWeek, addDays, format } from 'date-fns';
import TimeGrid from '@/app/shared/TimeGrid';
import EventBlock from '../calendar/EventBlock';
import { CalendarEvent } from '@/app/mockData/eventData';

interface DesktopViewProps {
  selectedDate: Date;
  events: Record<string, CalendarEvent[]>;
  hourHeight?: number;
}

const WeekViewDesktop = ({ selectedDate, events, hourHeight = 60 }: DesktopViewProps) => {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });

  const getEventsForDay = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return events[dateString] || [];
  };

  return (
    <div className="hidden md:block">
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
                    {dayEvents.map(event => (
                      <EventBlock 
                        key={event.id}
                        event={event}
                        hourHeight={hourHeight}
                        selectedDate={currentDay}
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

export default WeekViewDesktop; 