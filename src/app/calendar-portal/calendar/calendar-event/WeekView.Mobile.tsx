"use client";

import { useState } from "react";
import Image from "next/image";
import { CalendarEvent } from "@/app/mockData/eventData";
import { motion, AnimatePresence } from "framer-motion";
import EventDetails from "./EventDetails";

// Import our custom hook and utilities
import { useDragToDate } from "@/app/hooks/useDragToDate";
import { getItemVariants } from "@/app/utils/animationVariants";
import { formatDateForDisplay } from "@/app/utils/dateHelpers";

interface MobileViewProps {
  events: CalendarEvent[];
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  onMoveEvent?: (eventId: string, fromDate: string, toDate: string) => void;
}

const WeekViewMobile = ({
  events,
  selectedDate,
  onDateChange,
  onMoveEvent,
}: MobileViewProps) => {
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(
    null
  );

  // Use our custom hook for drag-to-date functionality
  const {
    isDragging,
    draggingEventId,
    showDropIndicator,
    draggingEvent,
    containerRef,
    handleDragStart,
    handleDrag,
    handleDragEnd,
    handlePageSwipe,
    currentDateStr,
    slideDirection,
  } = useDragToDate({
    selectedDate,
    onDateChange,
    events,
    onMoveEvent,
  });

  return (
    <motion.div
      ref={containerRef}
      className="md:hidden h-[calc(100vh-200px)] flex flex-col overflow-hidden"
      drag={!isDragging ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handlePageSwipe}
      style={{ x: 0 }}
    >
      {/* Drag indicator that shows when changing dates during drag */}
      {isDragging && showDropIndicator && (
        <div className="bg-blue-50 text-blue-700 p-3 mx-4 my-2 rounded-lg text-center text-sm flex-shrink-0">
          <p>Release to drop event on {formatDateForDisplay(selectedDate)}</p>
          <p className="text-xs mt-1">Drag to screen edges to change dates</p>
        </div>
      )}

      {/* Visual edge indicators for dragging to previous/next day */}
      {isDragging && (
        <>
          <div className="fixed top-0 left-0 w-16 h-full bg-gradient-to-r from-blue-100/50 to-transparent z-10 pointer-events-none flex items-center justify-center">
            <div className="bg-white/80 p-2 rounded-full shadow-md text-blue-500">
              ← Prev
            </div>
          </div>
          <div className="fixed top-0 right-0 w-16 h-full bg-gradient-to-l from-blue-100/50 to-transparent z-10 pointer-events-none flex items-center justify-center">
            <div className="bg-white/80 p-2 rounded-full shadow-md text-blue-500">
              Next →
            </div>
          </div>
        </>
      )}

      {/* Scrollable container with direct standard overflow-y */}
      <div
        className="flex-1 overflow-y-auto touch-pan-y overscroll-contain"
      >
        <motion.div
          className="p-4 space-y-4"
          initial="hidden"
          animate="visible"
          key={`container-${currentDateStr}`}
        >
          {/* Ghost dragged element that remains visible when changing dates */}
          {isDragging &&
            draggingEvent &&
            !events.some((e) => e.id === draggingEventId) && (
              <motion.div
                className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-grabbing ring-2 ring-blue-500 opacity-90"
                animate={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  zIndex: 50,
                }}
                layoutId={`event-${currentDateStr}-${draggingEvent.id}`}
              >
                <div className="relative w-full h-32">
                  <Image
                    src={draggingEvent.imageUrl}
                    alt={draggingEvent.title}
                    className="w-full h-full object-cover"
                    fill
                  />
                  <motion.div
                    className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm"
                    layoutId={`time-${currentDateStr}-${draggingEvent.id}`}
                  >
                    {draggingEvent.time}
                  </motion.div>
                </div>
                <div className="p-4">
                  <motion.h3 
                    layoutId={`title-${currentDateStr}-${draggingEvent.id}`}
                    className="text-lg font-semibold text-gray-900"
                  >
                    {draggingEvent.title}
                  </motion.h3>
                  <motion.div
                    className="mt-1 text-gray-600 line-clamp-2"
                    layoutId={`content-${currentDateStr}-${draggingEvent.id}`}
                  >
                    {draggingEvent.description}
                  </motion.div>
                </div>
              </motion.div>
            )}

          {events.length === 0 && !isDragging ? (
            <motion.div
              className="flex items-center justify-center text-center text-gray-500 min-h-[calc(100vh-250px)] bg-white rounded-2xl shadow-sm"
              variants={getItemVariants(0, slideDirection)}
            >
              <div className="p-8">
                <div className="text-lg font-medium mb-2">No Events</div>
                <div className="text-sm text-gray-400">
                  Swipe left or right to navigate between days
                </div>
              </div>
            </motion.div>
          ) : (
            events.map((event, index) => (
              <motion.div
                key={`${currentDateStr}-${event.id}`}
                layoutId={`event-${currentDateStr}-${event.id}`}
                drag
                dragConstraints={containerRef}
                dragElastic={0.5}
                dragDirectionLock={false}
                onDragStart={() => handleDragStart(event.id)}
                onDrag={(e, info) => handleDrag(e, info)}
                onDragEnd={(e, info) => handleDragEnd(e, info, event.id)}
                variants={getItemVariants(index, slideDirection)}
                whileDrag={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                  zIndex: 50,
                }}
                onClick={() => {
                  if (!isDragging) {
                    setSelectedEvent(event);
                  }
                }}
                whileHover={
                  !isDragging
                    ? {
                        scale: 1.02,
                        transition: { duration: 0.3, ease: "easeOut" },
                      }
                    : {}
                }
                className={`bg-white rounded-2xl shadow-sm overflow-hidden cursor-grab active:cursor-grabbing ${
                  draggingEventId === event.id ? "ring-2 ring-blue-500" : ""
                }`}
              >
                <div className="relative w-full h-32">
                  <Image
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                    fill
                  />
                  <motion.div 
                    layoutId={`time-${currentDateStr}-${event.id}`}
                    className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm"
                  >
                    {event.time}
                  </motion.div>
                </div>
                <div className="p-4">
                  <motion.h3 
                    layoutId={`title-${currentDateStr}-${event.id}`}
                    className="text-lg font-semibold text-gray-900"
                  >
                    {event.title}
                  </motion.h3>
                  <motion.div 
                    layoutId={`content-${currentDateStr}-${event.id}`}
                    className="mt-1 text-gray-600 line-clamp-2"
                  >
                    {event.description}
                  </motion.div>
                </div>
              </motion.div>
            ))
          )}

          {/* Add extra padding at bottom for better scrolling */}
          <div className="h-16"></div>
        </motion.div>
      </div>

      <AnimatePresence mode="wait">
        {selectedEvent && !isDragging && (
          <EventDetails
            event={selectedEvent}
            weekId={currentDateStr}
            onClose={() => setSelectedEvent(null)}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default WeekViewMobile;
