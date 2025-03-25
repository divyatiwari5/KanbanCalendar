"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CalendarEvent } from "@/app/mockData/eventData";
import { useDragToDate } from "@/app/hooks/useDragToDate";
import EventDetails from "../EventDetails";
import DragIndicators from "./DragIndicators";
import EmptyStateView from "./EmptyStateView";
import EventCard from "./EventCard";
import GhostEventCard from "./GhostEventCard";

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
      <DragIndicators
        isDragging={isDragging}
        showDropIndicator={showDropIndicator}
        selectedDate={selectedDate}
      />

      <div className="flex-1 overflow-y-auto touch-pan-y overscroll-contain">
        <motion.div
          className="p-4 space-y-4"
          initial="hidden"
          animate="visible"
          key={`container-${currentDateStr}`}
        >
          {isDragging &&
            draggingEvent &&
            !events.some((e) => e.id === draggingEventId) && (
              <GhostEventCard
                event={draggingEvent}
                currentDateStr={currentDateStr}
              />
            )}

          {events.length === 0 && !isDragging ? (
            <EmptyStateView slideDirection={slideDirection} />
          ) : (
            events.map((event, index) => (
              <EventCard
                key={`${currentDateStr}-${event.id}`}
                event={event}
                currentDateStr={currentDateStr}
                index={index}
                slideDirection={slideDirection}
                isDragging={isDragging}
                draggingEventId={draggingEventId}
                containerRef={containerRef}
                onDragStart={handleDragStart}
                onDrag={handleDrag}
                onDragEnd={handleDragEnd}
                onEventClick={setSelectedEvent}
              />
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
