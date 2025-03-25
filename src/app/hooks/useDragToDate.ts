import { useState, useRef, useEffect } from "react";
import { PanInfo } from "framer-motion";
import { format, addDays, subDays } from "date-fns";
import { CalendarEvent } from "@/app/mockData/eventData";

interface UseDragToDateProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
  events: CalendarEvent[];
  onMoveEvent?: (eventId: string, fromDate: string, toDate: string) => void;
}

interface DragToDateResult {
  // State
  isDragging: boolean;
  draggingEventId: string | null;
  showDropIndicator: boolean;
  draggingEvent: CalendarEvent | null;
  slideDirection: "left" | "right" | null;
  
  // Refs
  containerRef: React.RefObject<HTMLDivElement | null>;
  
  // Handlers
  handleDragStart: (eventId: string) => void;
  handleDrag: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  handleDragEnd: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, eventId: string) => void;
  handlePageSwipe: (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  
  // Current formatted date
  currentDateStr: string;
}

export function useDragToDate({
  selectedDate,
  onDateChange,
  events,
  onMoveEvent
}: UseDragToDateProps): DragToDateResult {
  // State for dragging
  const [isDragging, setIsDragging] = useState(false);
  const [draggingEventId, setDraggingEventId] = useState<string | null>(null);
  const [showDropIndicator, setShowDropIndicator] = useState(false);
  const [draggingEvent, setDraggingEvent] = useState<CalendarEvent | null>(null);
  const [dateChangeCooldown, setDateChangeCooldown] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right" | null>(null);
  
  // Refs don't cause re-renders and aren't affected by them
  const startDateRef = useRef<string | null>(null);
  const targetDateRef = useRef<string | null>(null);
  const eventIdRef = useRef<string | null>(null);
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
    }, 200); // Short cooldown to allow rapid date changes
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

  return {
    // State
    isDragging,
    draggingEventId,
    showDropIndicator,
    draggingEvent,
    slideDirection,
    
    // Refs
    containerRef,
    
    // Handlers
    handleDragStart,
    handleDrag,
    handleDragEnd,
    handlePageSwipe,
    
    // Formatted current date
    currentDateStr,
  };
} 