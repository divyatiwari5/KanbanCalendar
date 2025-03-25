"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { CalendarEvent } from "@/app/mockData/eventData";
import { motion, AnimatePresence, PanInfo, useMotionValue } from "framer-motion";
import { format, addDays, subDays } from "date-fns";
import EventDetails from "./EventDetails";

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
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [draggingEventId, setDraggingEventId] = useState<string | null>(null);
  const [showDropIndicator, setShowDropIndicator] = useState(false);
  const [draggingEvent, setDraggingEvent] = useState<CalendarEvent | null>(null);
  const [dateChangeCooldown, setDateChangeCooldown] = useState(false);
  
  // Refs don't cause re-renders and aren't affected by them
  const startDateRef = useRef<string | null>(null);
  const targetDateRef = useRef<string | null>(null);
  const eventIdRef = useRef<string | null>(null);
  
  // Motion values for tracking drag
  const dragX = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Current date in yyyy-MM-dd format
  const currentDateStr = format(selectedDate, "yyyy-MM-dd");
  
  // Update target date ref whenever selectedDate changes
  useEffect(() => {
    if (isDragging) {
      const formatted = format(selectedDate, "yyyy-MM-dd");
      targetDateRef.current = formatted;
      console.log(`useEffect: Target date updated to: ${formatted} (ref = ${targetDateRef.current})`);
      setShowDropIndicator(true);
    }
  }, [selectedDate, isDragging]);

  const getItemVariants = (index: number) => ({
    hidden: {
      opacity: 0,
      scale: 0.8,
      x: slideDirection === "left" ? 300 : slideDirection === "right" ? -300 : 0,
      rotateX: 20,
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
        delay: index * 0.2,
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  });

  // Handle page swiping
  const handlePageSwipe = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    // Don't trigger page swipe if we're dragging an event
    if (isDragging) return;
    
    const swipe = info.offset.x;
    if (Math.abs(swipe) > 50) {
      if (swipe > 0) {
        setSlideDirection("left");
        onDateChange(subDays(selectedDate, 1)); // Previous day
      } else {
        setSlideDirection("right");
        onDateChange(addDays(selectedDate, 1)); // Next day
      }
    }
  };
  
  // Start dragging an event
  const handleDragStart = (eventId: string) => {
    const startDateStr = format(selectedDate, "yyyy-MM-dd");
    
    // Store in both state and ref
    setIsDragging(true);
    setDraggingEventId(eventId);
    setShowDropIndicator(false);
    
    // Set in refs (these won't be lost during render)
    startDateRef.current = startDateStr;
    targetDateRef.current = startDateStr;
    eventIdRef.current = eventId;
    
    // Store the event being dragged
    const event = events.find(e => e.id === eventId) || null;
    setDraggingEvent(event);
    
    console.log(`Started dragging event: ${eventId} from date ${startDateStr} (refs: start=${startDateRef.current}, target=${targetDateRef.current})`);
  };
  
  // Change date based on screen position during drag
  const changeDate = (direction: "prev" | "next") => {
    if (dateChangeCooldown) return;
    
    // Set cooldown to prevent rapid date changes, but make it very short
    // to allow multiple navigations
    setDateChangeCooldown(true);
    
    // Make sure we preserve the dragging state
    const currentDragEvent = draggingEvent;
    const currentDragEventId = draggingEventId;
    const oldTarget = targetDateRef.current;
    
    let newDate: Date;
    if (direction === "prev") {
      console.log(`Moving to previous day (refs: start=${startDateRef.current}, target=${targetDateRef.current})`);
      setSlideDirection("left");
      newDate = subDays(selectedDate, 1);
      onDateChange(newDate);
    } else {
      console.log(`Moving to next day (refs: start=${startDateRef.current}, target=${targetDateRef.current})`);
      setSlideDirection("right");
      newDate = addDays(selectedDate, 1);
      onDateChange(newDate);
    }
    
    // Update the target date immediately in the ref
    const newTargetDate = format(newDate, "yyyy-MM-dd");
    targetDateRef.current = newTargetDate;
    console.log(`DIRECT: Changing targetDateStr from ${oldTarget} to ${newTargetDate} (ref = ${targetDateRef.current})`);
    
    // Ensure we maintain drag state
    setTimeout(() => {
      if (currentDragEvent && currentDragEventId) {
        setDraggingEvent(currentDragEvent);
        setDraggingEventId(currentDragEventId);
        console.log(`Drag state maintained: ref startDate=${startDateRef.current}, ref targetDate=${targetDateRef.current}`);
      }
    }, 50);
    
    // Reset cooldown after a VERY short delay to allow rapid navigation
    setTimeout(() => {
      setDateChangeCooldown(false);
    }, 200); // Reduced from 500ms to 200ms
  };
  
  // Update while dragging - check if we need to change date
  const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    // Get absolute position on screen
    const x = info.point.x;
    const screenWidth = window.innerWidth;
    
    // If close to left edge (first 15% of screen) - go to PREVIOUS day
    if (x < screenWidth * 0.15) {
      changeDate("prev");
    }
    // If close to right edge (last 15% of screen) - go to NEXT day
    else if (x > screenWidth * 0.85) {
      changeDate("next");
    }
  };
  
  // End dragging an event
  const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, eventId: string) => {
    // Use refs for guaranteed accurate values
    const startDate = startDateRef.current;
    const targetDate = targetDateRef.current;
    const draggedEventId = eventIdRef.current;
    
    console.log(`Drag ended. Event ID: ${eventId}`);
    console.log(`USING REFS - startDate: ${startDate}, targetDate: ${targetDate}, eventId: ${draggedEventId}`);
    
    // Only proceed if we have valid data
    if (startDate && targetDate && draggedEventId && onMoveEvent) {
      console.log(`Comparing dates - Start: ${startDate}, End: ${targetDate}`);
      
      if (startDate !== targetDate) {
        console.log(`SUCCESS: Moving event from ${startDate} to ${targetDate}`);
        onMoveEvent(draggedEventId, startDate, targetDate);
      } else {
        console.log(`PROBLEM: Same date detected in refs (${startDate} === ${targetDate}), not moving event`);
      }
    } else {
      console.warn("Missing data for move operation:", {
        refStartDate: startDate,
        refTargetDate: targetDate,
        refEventId: draggedEventId,
        hasOnMoveEvent: !!onMoveEvent
      });
    }
    
    // Reset all state and refs
    setIsDragging(false);
    setDraggingEventId(null);
    setShowDropIndicator(false);
    setDraggingEvent(null);
    setDateChangeCooldown(false);
    
    // Clear refs
    startDateRef.current = null;
    targetDateRef.current = null;
    eventIdRef.current = null;
  };

  return (
    <motion.div
      ref={containerRef}
      className="md:hidden min-h-[calc(100vh-200px)]"
      drag={!isDragging ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.2}
      onDragEnd={handlePageSwipe}
      style={{ x: dragX }}
    >
      {/* Drag indicator that shows when changing dates during drag */}
      {isDragging && showDropIndicator && (
        <div className="bg-blue-50 text-blue-700 p-3 mx-4 my-2 rounded-lg text-center text-sm">
          <p>Release to drop event on {format(selectedDate, 'MMMM d')}</p>
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
      
      <motion.div
        className="p-4 space-y-4 h-full"
        initial="hidden"
        animate="visible"
        key={`container-${currentDateStr}`}
      >
        {/* Ghost dragged element that remains visible when changing dates */}
        {isDragging && draggingEvent && !events.some(e => e.id === draggingEventId) && (
          <motion.div
            className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-grabbing ring-2 ring-blue-500 opacity-90"
            animate={{
              scale: 1.05,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              zIndex: 50
            }}
          >
            <div className="relative w-full h-32">
              <Image
                src={draggingEvent.imageUrl}
                alt={draggingEvent.title}
                className="w-full h-full object-cover"
                fill
              />
              <div className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm">
                {draggingEvent.time}
              </div>
            </div>
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {draggingEvent.title}
              </h3>
              <p className="mt-1 text-gray-600 line-clamp-2">
                {draggingEvent.description}
              </p>
            </div>
          </motion.div>
        )}
        
        {events.length === 0 && !isDragging ? (
          <motion.div
            className="flex items-center justify-center text-center text-gray-500 min-h-[calc(100vh-250px)] bg-white rounded-2xl shadow-sm"
            variants={getItemVariants(0)}
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
              drag
              dragConstraints={containerRef}
              dragElastic={0.5}
              dragDirectionLock={false}
              onDragStart={() => handleDragStart(event.id)}
              onDrag={(e, info) => handleDrag(e, info)}
              onDragEnd={(e, info) => handleDragEnd(e, info, event.id)}
              variants={getItemVariants(index)}
              whileDrag={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                zIndex: 50
              }}
              onClick={() => {
                if (!isDragging) {
                  setSelectedEvent(event);
                }
              }}
              whileHover={!isDragging ? {
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" },
              } : {}}
              className={`bg-white rounded-2xl shadow-sm overflow-hidden cursor-grab active:cursor-grabbing ${
                draggingEventId === event.id ? 'ring-2 ring-blue-500' : ''
              }`}
            >
              <div className="relative w-full h-32">
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
                <h3 className="text-lg font-semibold text-gray-900">
                  {event.title}
                </h3>
                <p className="mt-1 text-gray-600 line-clamp-2">
                  {event.description}
                </p>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

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
