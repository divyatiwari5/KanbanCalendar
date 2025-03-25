'use client';

import { useState } from 'react';
import Image from 'next/image';
import { CalendarEvent } from '@/app/mockData/eventData';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { format, addDays } from 'date-fns';
import EventDetails from './EventDetails';

interface MobileViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

const WeekViewMobile = ({ events, selectedDate, onDateChange }: MobileViewProps) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [slideDirection, setSlideDirection] = useState<'left' | 'right' | null>(null);
  
  const weekId = format(selectedDate, 'yyyy-MM-dd');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.6,
        ease: "easeOut"
      }
    }
  };

  const getItemVariants = (index: number) => ({
    hidden: { 
      opacity: 0,
      scale: 0.8,
      x: slideDirection === 'left' ? 300 : slideDirection === 'right' ? -300 : 0,
      rotateX: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      x: 0,
      rotateX: 0,
      transition: {
        type: "spring",
        stiffness: 80,
        damping: 20,
        mass: 1,
        delay: index * 0.4,
        duration: 1,
        ease: "easeInOut"
      }
    }
  });

  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const swipe = info.offset.x + info.velocity.x * 50;
    if (Math.abs(swipe) > 50) {
      if (swipe > 0) {
        setSlideDirection('left');
        onDateChange(addDays(selectedDate, -1));
      } else {
        setSlideDirection('right');
        onDateChange(addDays(selectedDate, 1));
      }
    }
  };

  return (
    <motion.div 
      className="md:hidden min-h-[calc(100vh-200px)]"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handleDragEnd}
    >
      <motion.div 
        className="p-4 space-y-4 h-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        key={weekId}
      >
        {events.length === 0 ? (
          <motion.div 
            className="flex items-center justify-center text-center text-gray-500 min-h-[calc(100vh-250px)] bg-white rounded-2xl shadow-sm"
            variants={getItemVariants(0)}
          >
            <div className="p-8">
              <div className="text-lg font-medium mb-2">No Events</div>
              <div className="text-sm text-gray-400">Swipe left or right to navigate between days</div>
            </div>
          </motion.div>
        ) : (
          events.map((event, index) => (
            <motion.div 
              key={`${weekId}-${event.id}`}
              layoutId={`event-${weekId}-${event.id}`}
              onClick={() => {
                setIsInitialRender(false);
                setSelectedEvent(event);
              }}
              variants={getItemVariants(index)}
              whileHover={{ 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
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
                  <motion.div 
                    className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm"
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      delay: 1 + index * 0.4,
                      duration: 0.5,
                      ease: "easeOut"
                    }}
                  >
                    {event.time}
                  </motion.div>
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
      </motion.div>

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
    </motion.div>
  );
};

export default WeekViewMobile;