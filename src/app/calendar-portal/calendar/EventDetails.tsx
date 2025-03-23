'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import type { CalendarEvent } from '@/app/mockData/eventData';

interface EventDetailsProps {
  event: CalendarEvent;
  onClose: () => void;
}

const EventDetails = ({ event, onClose }: EventDetailsProps) => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black z-40"
      />
      <motion.div
        layoutId={`event-${event.id}`}
        className="fixed inset-4 md:inset-24 bg-blue-600 rounded-lg z-50 overflow-hidden"
      >
        <motion.div className="h-full flex flex-col" layoutId={`content-${event.id}`}>
          <motion.div 
            className="relative w-full h-64"
            layoutId={`image-${event.id}`}
          >
            <Image 
              src={event.imageUrl} 
              alt={event.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </motion.div>
          <motion.div className="flex-1 p-6 text-white" layoutId={`text-${event.id}`}>
            <motion.h2 
              className="text-2xl font-bold mb-2"
              layoutId={`title-${event.id}`}
            >
              {event.title}
            </motion.h2>
            <motion.div className="text-lg mb-4">
              {event.time}
            </motion.div>
            <motion.p 
              className="text-base opacity-90"
              layoutId={`desc-${event.id}`}
            >
              {event.description}
            </motion.p>
          </motion.div>
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white hover:opacity-75"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </motion.div>
      </motion.div>
    </>
  );
};

export default EventDetails; 