'use client';

import TimeGrid from '@/app/shared/calendar/TimeGrid';
import type { CalendarEvent } from '@/app/shared/calendar/types';

interface WeekViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
}

const WeekView = ({ events, selectedDate }: WeekViewProps) => {
  const hourHeight = 60;

  return (
    <div className="w-full relative">
      <TimeGrid hourHeight={hourHeight} />
      {/* Events container */}
      <div className="absolute top-0 left-16 right-0 pointer-events-none">
        <div className="grid grid-cols-7 h-full">
        
        </div>
      </div>
    </div>
  );
}

export default WeekView;