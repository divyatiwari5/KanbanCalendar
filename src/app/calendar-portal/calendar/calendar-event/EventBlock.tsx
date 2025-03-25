'use client';

import { useState } from 'react';
import type { CalendarEvent } from '@/app/mockData/eventData';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import EventDetails from './EventDetails';
import { format } from 'date-fns';
import { Draggable } from '@hello-pangea/dnd';

interface EventBlockProps {
  event: CalendarEvent;
  hourHeight: number;
  selectedDate: Date;
  index: number;
}

const EventBlock = ({ event, hourHeight, selectedDate, index }: EventBlockProps) => {
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
      <Draggable draggableId={event.id} index={index}>
        {(provided, snapshot) => (
          // @ts-expect-error - Type conflict between framer-motion and react-beautiful-dnd props
          <motion.div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            layoutId={`event-${weekId}-${event.id}`}
            onClick={() => {
              if (!snapshot.isDragging) {
                setIsInitialRender(false);
                setIsOpen(true);
              }
            }}
            initial={isInitialRender ? { opacity: 1 } : false}
            className={`absolute w-[calc(100%-8px)] ml-1 rounded-xl bg-white shadow-sm hover:shadow-md cursor-grab active:cursor-grabbing ${
              snapshot.isDragging ? 'shadow-lg ring-2 ring-blue-500 z-50' : 'z-10'
            }`}
            style={{
              position: snapshot.isDragging ? 'relative' : 'absolute',
              top: snapshot.isDragging ? 0 : `${top}px`,
              height: `${height}px`,
              ...provided.draggableProps.style,
            }}
          >
            <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-blue-400 rounded-l-xl" />
            <motion.div 
              className="flex flex-col h-full pl-3" 
              layoutId={`content-${weekId}-${event.id}`}
              initial={isInitialRender ? { opacity: 1 } : false}
            >
              <motion.div 
                className="relative w-full flex-1"
                layoutId={`image-${weekId}-${event.id}`}
                initial={isInitialRender ? { opacity: 1 } : false}
              >
                <Image 
                  src={event.imageUrl} 
                  alt={event.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </motion.div>
              <motion.div 
                className="py-2" 
                layoutId={`text-${weekId}-${event.id}`}
                initial={isInitialRender ? { opacity: 1 } : false}
              >
                <motion.div 
                  className="font-normal text-[13px] text-gray-900" 
                  layoutId={`title-${weekId}-${event.id}`}
                  initial={isInitialRender ? { opacity: 1 } : false}
                >
                  {event.title}
                </motion.div>
                <div className="text-xs text-gray-500 mt-1">
                  {event.time}
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </Draggable>

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