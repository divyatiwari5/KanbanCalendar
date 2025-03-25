import { memo } from 'react';
import { isToday } from 'date-fns';
import { Droppable } from '@hello-pangea/dnd';
import { CalendarEvent } from '@/app/mockData/eventData';
import EventBlock from '../EventBlock';

interface DayColumnProps {
  dateString: string;
  currentDay: Date;
  dayEvents: CalendarEvent[];
  hourHeight: number;
  currentTime: { top: number };
}

const DayColumn = memo(({ dateString, currentDay, dayEvents, hourHeight, currentTime }: DayColumnProps) => {
  const isCurrentDay = isToday(currentDay);

  return (
    <Droppable
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
});

DayColumn.displayName = 'DayColumn';

export default DayColumn; 