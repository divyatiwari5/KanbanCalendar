import { format } from "date-fns";
import { useCallback, useState } from "react";
import { parseDate } from "../utils/dateHelpers";
import { EventsByDate } from "../calendar-portal/calendar/calendar-event/WeekView";
import { events as initialEvents } from "@/app/mockData/eventData";

export const useWeekEvents = (onDateChange: (date: Date) => void) => {
    const [events, setEvents] = useState<EventsByDate>(initialEvents);
  
    const selectedDayEvents = useCallback((date: Date) => {
      const dateString = format(date, "yyyy-MM-dd");
      return events[dateString] || [];
    }, [events]);
  
    const handleEventUpdate = useCallback((updatedEvents: EventsByDate) => {
      setEvents(updatedEvents);
    }, []);
  
    const handleMoveEvent = useCallback((
      eventId: string, 
      fromDate: string, 
      toDate: string
    ) => {
      setEvents(prevEvents => {
        try {
          const newEvents = { ...prevEvents };
          const sourceEvents = [...(newEvents[fromDate] || [])];
          const eventIndex = sourceEvents.findIndex(event => event.id === eventId);
  
          if (eventIndex === -1) {
            throw new Error(`Event not found: ${eventId}`);
          }
  
          const [movedEvent] = sourceEvents.splice(eventIndex, 1);
          newEvents[fromDate] = sourceEvents;
          newEvents[toDate] = [...(newEvents[toDate] || []), movedEvent];
  
          return newEvents;
        } catch (error) {
          console.error("Error moving event:", error);
          return prevEvents;
        }
      });
  
      try {
        const newDate = parseDate(toDate);
        onDateChange(newDate);
      } catch (error) {
        console.error("Error navigating to date:", error);
      }
    }, [onDateChange]);
  
    return {
      events,
      selectedDayEvents,
      handleEventUpdate,
      handleMoveEvent
    };
  };