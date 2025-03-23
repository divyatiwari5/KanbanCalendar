'use client';

import { useState } from 'react';
import type { CalendarEvent } from '@/app/mockData/eventData';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import EventDetails from './EventDetails';
import { format } from 'date-fns';

interface EventBlockProps {
  event: CalendarEvent;
  hourHeight: number;
  selectedDate: Date;
}

const EventBlock = ({ event, hourHeight, selectedDate }: EventBlockProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const weekId = format(selectedDate, 'yyyy-MM-dd');

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

  return (
    <>
      <motion.div
        layoutId={`event-${weekId}-${event.id}`}
        onClick={() => {
          setIsInitialRender(false);
          setIsOpen(true);
        }}
        initial={isInitialRender ? { opacity: 1 } : false}
        className="absolute w-11/12 left-1/2 -translate-x-1/2 rounded-lg bg-blue-600 bg-opacity-90 pointer-events-auto cursor-pointer group hover:bg-opacity-100 z-10 overflow-hidden"
        style={{
          top: `${top}px`,
          height: `${height}px`,
        }}
      >
        <motion.div 
          className="flex h-full p-2" 
          layoutId={`content-${weekId}-${event.id}`}
          initial={isInitialRender ? { opacity: 1 } : false}
        >
          <motion.div 
            className="relative h-12 w-12 flex-shrink-0 rounded-lg overflow-hidden"
            layoutId={`image-${weekId}-${event.id}`}
            initial={isInitialRender ? { opacity: 1 } : false}
          >
            <Image 
              src={event.imageUrl} 
              alt={event.title}
              fill
              className="object-cover"
              sizes="48px"
            />
          </motion.div>
          <motion.div 
            className="flex-1 ml-2 text-white text-sm" 
            layoutId={`text-${weekId}-${event.id}`}
            initial={isInitialRender ? { opacity: 1 } : false}
          >
            <motion.div 
              className="font-semibold truncate" 
              layoutId={`title-${weekId}-${event.id}`}
              initial={isInitialRender ? { opacity: 1 } : false}
            >
              {event.title}
            </motion.div>
            <motion.div 
              className="text-xs opacity-75 truncate mt-1" 
              layoutId={`desc-${weekId}-${event.id}`}
              initial={isInitialRender ? { opacity: 1 } : false}
            >
              {event.description}
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {isOpen && (
          <EventDetails 
            event={event} 
            weekId={weekId}
            onClose={() => setIsOpen(false)} 
            isInitialRender={isInitialRender}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default EventBlock; 