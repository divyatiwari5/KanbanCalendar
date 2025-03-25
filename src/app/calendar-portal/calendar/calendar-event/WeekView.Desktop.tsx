"use client";

import { startOfWeek, addDays, format, isToday } from "date-fns";
import { CalendarEvent } from "@/app/mockData/eventData";
import EventBlock from "./EventBlock";
import TimeGrid from "./TimeGrid";
import { DragDropContext, Droppable, DropResult } from "@hello-pangea/dnd";

interface DesktopViewProps {
  selectedDate: Date;
  events: Record<string, CalendarEvent[]>;
  hourHeight?: number;
  onEventUpdate?: (updatedEvents: Record<string, CalendarEvent[]>) => void;
}

const WeekViewDesktop = ({
  selectedDate,
  events,
  hourHeight = 100,
  onEventUpdate,
}: DesktopViewProps) => {
  const weekStart = startOfWeek(selectedDate, { weekStartsOn: 0 });

  const getEventsForDay = (date: Date) => {
    const dateString = format(date, "yyyy-MM-dd");
    return events[dateString] || [];
  };

  const handleDragEnd = (result: DropResult) => {
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
  };

  const currentTime = {
    top:
      (new Date().getHours() * 60 + new Date().getMinutes()) *
      (hourHeight / 60),
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div className="hidden md:block">
        <div
          className="overflow-y-auto calendar-scroll"
          style={{ height: "600px" }}
        >
          <div className="relative" style={{ height: `${hourHeight * 24}px` }}>
            <TimeGrid hourHeight={hourHeight} />
            {/* Events container */}
            <div className="absolute top-0 left-20 right-4">
              <div className="grid grid-cols-7 gap-px h-full bg-gray-200">
                {Array.from({ length: 7 }, (_, dayIndex) => {
                  const currentDay = addDays(weekStart, dayIndex);
                  const dateString = format(currentDay, "yyyy-MM-dd");
                  const dayEvents = getEventsForDay(currentDay);
                  const isCurrentDay = isToday(currentDay);

                  return (
                    <Droppable
                      key={dateString}
                      droppableId={dateString}
                      type="EVENT"
                      direction="vertical"
                      mode="standard"
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className={`relative h-full bg-white transition-colors duration-150 ${
                            snapshot.isDraggingOver 
                              ? 'bg-blue-50/70 shadow-[inset_0_0_0_2px_rgba(59,130,246,0.2)]' 
                              : ''
                          }`}
                          style={{
                            height: `${hourHeight * 24}px`,
                            minHeight: `${hourHeight * 24}px`,
                          }}
                        >
                          <div className="absolute inset-0 pointer-events-none">
                            {Array.from({ length: 24 }).map((_, i) => (
                              <div
                                key={i}
                                className="border-t border-gray-100"
                                style={{ height: `${hourHeight}px` }}
                              />
                            ))}
                          </div>

                          {/* Current time indicator */}
                          {isCurrentDay && (
                            <div
                              className="absolute left-0 right-0 flex items-center z-20 pointer-events-none"
                              style={{ top: `${currentTime.top}px` }}
                            >
                              <div className="w-1.5 h-1.5 rounded-full bg-red-500 -ml-0.75" />
                              <div className="flex-1 h-px bg-red-500" />
                            </div>
                          )}

                          {dayEvents.map((event, index) => (
                            <EventBlock
                              key={event.id}
                              event={event}
                              hourHeight={hourHeight}
                              selectedDate={currentDay}
                              index={index}
                            />
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DragDropContext>
  );
};

export default WeekViewDesktop;
