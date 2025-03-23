'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CalendarEvent } from '@/app/mockData/eventData';
import { motion, AnimatePresence } from 'framer-motion';
import EventDetails from '../calendar/EventDetails';
import { format } from 'date-fns';

interface MobileViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
}

const WeekViewMobile = ({ events, selectedDate }: MobileViewProps) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  
  const weekId = format(selectedDate, 'yyyy-MM-dd');

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
              key={`${weekId}-${event.id}`}
              layoutId={`event-${weekId}-${event.id}`}
              onClick={() => {
                setIsInitialRender(false);
                setSelectedEvent(event);
              }}
              initial={isInitialRender ? { opacity: 1 } : false}
              className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-pointer"
            >
              <motion.div 
                layoutId={`content-${weekId}-${event.id}`}
                initial={isInitialRender ? { opacity: 1 } : false}
              >
                <motion.div 
                  className="relative w-full h-32"
                  layoutId={`image-${weekId}-${event.id}`}
                  initial={isInitialRender ? { opacity: 1 } : false}
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
                <motion.div 
                  className="p-4" 
                  layoutId={`text-${weekId}-${event.id}`}
                  initial={isInitialRender ? { opacity: 1 } : false}
                >
                  <motion.h3 
                    className="text-lg font-semibold text-gray-900"
                    layoutId={`title-${weekId}-${event.id}`}
                    initial={isInitialRender ? { opacity: 1 } : false}
                  >
                    {event.title}
                  </motion.h3>
                  <motion.p 
                    className="mt-1 text-gray-600 line-clamp-2"
                    layoutId={`desc-${weekId}-${event.id}`}
                    initial={isInitialRender ? { opacity: 1 } : false}
                  >
                    {event.description}
                  </motion.p>
                </motion.div>
              </motion.div>
            </motion.div>
          ))
        )}
      </div>

      <AnimatePresence mode="wait">
        {selectedEvent && (
          <EventDetails 
            event={selectedEvent}
            weekId={weekId}
            onClose={() => setSelectedEvent(null)} 
            isInitialRender={isInitialRender}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default WeekViewMobile;