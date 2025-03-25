"use client";

import { format } from "date-fns";
import { useState } from "react";
import { events as initialEvents, CalendarEvent } from "@/app/mockData/eventData";
import WeekViewMobile from "./WeekView.Mobile";
import WeekViewDesktop from "./WeekView.Desktop";

interface WeekViewProps {
  selectedDate: Date;
  onDateChange: (date: Date) => void;
}

// Define the EventsByDate interface
interface EventsByDate {
  [date: string]: CalendarEvent[];
}

const WeekView = ({ selectedDate, onDateChange }: WeekViewProps) => {
  const [events, setEvents] = useState<EventsByDate>(initialEvents);

  // Get events for the selected day (mobile view)
  const getSelectedDayEvents = () => {
    const dateString = format(selectedDate, "yyyy-MM-dd");
    return events[dateString] || [];
  };

  // Handle event updates (desktop view)
  const handleEventUpdate = (updatedEvents: EventsByDate) => {
    setEvents(updatedEvents);
  };
  
  // Handle event movement between dates (mobile view)
  const handleMoveEvent = (eventId: string, fromDate: string, toDate: string) => {
    console.log(`MOVE EVENT - ID: ${eventId}, From: ${fromDate}, To: ${toDate}`);
    
    try {
      // Create a copy of the current events
      const newEvents = { ...events };
      
      // Find the event in the source date events array
      const sourceEvents = [...(newEvents[fromDate] || [])];
      const eventIndex = sourceEvents.findIndex(event => event.id === eventId);
      
      console.log(`Found event at index: ${eventIndex} in source date`);
      
      if (eventIndex === -1) {
        console.error(`Event with ID ${eventId} not found in source date ${fromDate}`);
        return; // Event not found
      }
      
      // Remove the event from source date
      const [movedEvent] = sourceEvents.splice(eventIndex, 1);
      newEvents[fromDate] = sourceEvents;
      
      // Make sure destination date has an array
      if (!newEvents[toDate]) {
        newEvents[toDate] = [];
      }
      
      // Add to destination date
      const destinationEvents = [...(newEvents[toDate] || [])];
      destinationEvents.push(movedEvent);
      newEvents[toDate] = destinationEvents;
      
      // Update the events state
      setEvents(newEvents);
      
      console.log(`Successfully moved event from ${fromDate} to ${toDate}`);
      console.log(`Events in ${toDate} now:`, newEvents[toDate]);
      
      // Navigate to the destination date to show the moved event
      const [year, month, day] = toDate.split('-').map(Number);
      const newDate = new Date(year, month - 1, day); // month is 0-indexed in JS Date
      onDateChange(newDate);
    } catch (error) {
      console.error("Error moving event:", error);
    }
  };

  return (
    <div className="w-full relative mt-4 rounded-lg overflow-hidden bg-[#eef1f9]">
      <WeekViewMobile
        events={getSelectedDayEvents()}
        selectedDate={selectedDate}
        onDateChange={onDateChange}
        onMoveEvent={handleMoveEvent}
      />
      <WeekViewDesktop 
        selectedDate={selectedDate} 
        events={events} 
        onEventUpdate={handleEventUpdate}
      />
    </div>
  );
};

export default WeekView;
