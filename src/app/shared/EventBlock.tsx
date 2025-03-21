'use client';

import type { CalendarEvent } from '@/app/mockData/eventData';

interface EventBlockProps {
  event: CalendarEvent;
  hourHeight: number;
}

const EventBlock = ({ event, hourHeight }: EventBlockProps) => {
  console.log('EVENTTTTTTT::::', event);
  const getEventPosition = () => {
    // Parse time from "09:00 AM" format
    const [time, period] = event.time.split(' ');
    const [hours, minutes] = time.split(':').map(Number);
    
    // Convert to 24-hour format
    let hour24 = hours;
    if (period === 'PM' && hours !== 12) hour24 += 12;
    if (period === 'AM' && hours === 12) hour24 = 0;
    
    const startInMinutes = hour24 * 60 + minutes;
    // Default event duration to 1 hour
    const endInMinutes = startInMinutes + 60;
    
    const top = (startInMinutes / 60) * hourHeight;
    const height = ((endInMinutes - startInMinutes) / 60) * hourHeight;
    
    return { top, height };
  };

  const { top, height } = getEventPosition();
  const bgColors = [
    'bg-blue-500',
    'bg-green-500',
    'bg-purple-500',
    'bg-orange-500',
    'bg-pink-500'
  ];
  // Generate a consistent color based on event ID
  const colorIndex = parseInt(event.id.replace('event-', '')) % bgColors.length;
  const bgColor = bgColors[colorIndex];

  return (
    <div
      className={`absolute w-11/12 left-1/2 -translate-x-1/2 rounded-lg ${bgColor} bg-opacity-90 pointer-events-auto cursor-pointer group hover:bg-opacity-100 z-10`}
      style={{
        top: `${top}px`,
        height: `${height}px`,
      }}
    >
      <div className="p-2 text-white text-sm">
        <div className="font-semibold truncate">{event.title}</div>
        <div className="text-xs opacity-90 group-hover:opacity-100">
          {event.time}
        </div>
      </div>
    </div>
  );
};

export default EventBlock; 