'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CalendarEvent } from '@/app/mockData/eventData';
import { motion, AnimatePresence } from 'framer-motion';
import EventDetails from '../calendar/EventDetails';

interface MobileViewProps {
  events: CalendarEvent[];
}

const WeekViewMobile = ({ events }: MobileViewProps) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);

  return (
    <div className="md:hidden">
      <div className="p-4 space-y-4">
        {events.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            No events scheduled for this day
          </div>
        ) : (
          events.map(event => (
            <motion.div 
              key={event.id}
              layoutId={`event-${event.id}`}
              onClick={() => setSelectedEvent(event)}
              className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer"
            >
              <motion.div layoutId={`content-${event.id}`}>
                <motion.div 
                  className="relative w-full h-32"
                  layoutId={`image-${event.id}`}
                >
                  <Image 
                    src={event.imageUrl} 
                    alt={event.title}
                    className="w-full h-full object-cover"
                    fill
                  />
                  <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                    {event.time}
                  </div>
                </motion.div>
                <motion.div className="p-4" layoutId={`text-${event.id}`}>
                  <motion.h3 
                    className="text-lg font-semibold text-gray-900"
                    layoutId={`title-${event.id}`}
                  >
                    {event.title}
                  </motion.h3>
                  <motion.p 
                    className="mt-1 text-gray-600 line-clamp-2"
                    layoutId={`desc-${event.id}`}
                  >
                    {event.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence>
        {selectedEvent && (
          <EventDetails 
            event={selectedEvent} 
            onClose={() => setSelectedEvent(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeekViewMobile; 