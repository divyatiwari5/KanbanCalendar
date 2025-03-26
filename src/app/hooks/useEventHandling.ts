import { useCallback } from "react";
import { DropResult } from "@hello-pangea/dnd";
import { format } from "date-fns";
import { CalendarEvent } from "../mockData/eventData";

interface EventHandlingProps {
  events: Record<string, CalendarEvent[]>;
  hourHeight?: number;
  onEventUpdate?: (updatedEvents: Record<string, CalendarEvent[]>) => void;

}

export const useEventHandling = ({ events, onEventUpdate }: EventHandlingProps) => {
  const handleDragEnd = useCallback((result: DropResult) => {
    const { source, destination } = result;

    // Dropped outside a valid drop zone
    if (!destination) return;

    const sourceDate = source.droppableId;
    const destinationDate = destination.droppableId;

    // Create a new events object to maintain immutability
    const newEvents = { ...events };

    // Remove from source
    const sourceEvents = [...(newEvents[sourceDate] || [])];
    const [movedEvent] = sourceEvents.splice(source.index, 1);

    // Add to destination
    const destinationEvents = [...(newEvents[destinationDate] || [])];
    destinationEvents.splice(destination.index, 0, movedEvent);

    // Update the events object
    newEvents[sourceDate] = sourceEvents;
    newEvents[destinationDate] = destinationEvents;

    // Call the update handler
    onEventUpdate?.(newEvents);
  }, [events, onEventUpdate]);

  const getEventsForDay = useCallback((date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return events[dateString] || [];
  }, [events]);

  return {
    handleDragEnd,
    getEventsForDay,
  };
}; 