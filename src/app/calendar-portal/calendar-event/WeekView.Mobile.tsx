'use client';

import Image from 'next/image';
import { CalendarEvent } from '@/app/mockData/eventData';

interface MobileViewProps {
  events: CalendarEvent[];
}

const WeekViewMobile = ({ events }: MobileViewProps) => {
  return (
    <div className="md:hidden">
      <div className="p-4 space-y-4">
        {events.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No events scheduled for this day
          </div>
        ) : (
          events.map(event => (
            <div 
              key={event.id}
              className="bg-white rounded-xl shadow-sm overflow-hidden"
            >
              <div className="relative h-48 w-full">
                <Image 
                  src={event.imageUrl} 
                  alt={event.title}
                  className="w-full h-full object-cover"
                  fill
                />
                <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                  {event.time}
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                <p className="mt-1 text-gray-600">{event.description}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default WeekViewMobile; 