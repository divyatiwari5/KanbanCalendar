'use client';

interface TimeGridProps {
  hourHeight: number;
}

const TimeGrid = ({ hourHeight = 60 }: TimeGridProps) => {
  return (
    <div className="h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex">
        {/* Time labels column */}
        <div className="w-16 relative" style={{ height: `${hourHeight * 24}px` }}>
          {Array.from({ length: 24 }, (_, i) => (
            <div 
              key={i}
              className="absolute w-full text-right pr-4"
              style={{ top: `${i * hourHeight}px` }}
            >
              <span className="text-sm text-gray-500">
                {`${i.toString().padStart(2, '0')}:00`}
              </span>
            </div>
          ))}
        </div>

        {/* Grid columns */}
        <div className="flex-1 grid grid-cols-7">
          {Array.from({ length: 7 }, (_, dayIndex) => (
            <div 
              key={dayIndex} 
              className="relative border-l"
              style={{ height: `${hourHeight * 24}px` }}
            >
              {Array.from({ length: 24 }, (_, i) => (
                <div 
                  key={i}
                  className="absolute w-full border-t border-gray-200"
                  style={{ top: `${i * hourHeight}px` }}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default TimeGrid;