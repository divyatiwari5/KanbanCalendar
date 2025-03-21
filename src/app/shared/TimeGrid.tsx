'use client';

interface TimeGridProps {
  hourHeight: number;
}

const TimeGrid = ({ hourHeight = 60 }: TimeGridProps) => {
  const formatHour = (hour: number) => {
    if (hour === 0) return '12 AM';
    if (hour === 12) return '12 PM';
    return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
  };

  return (
    <div className="absolute inset-0">
      <div className="flex relative">
        {/* Time labels column */}
        <div className="w-16 sticky left-0 bg-white z-20">
          {Array.from({ length: 24 }, (_, i) => (
            <div 
              key={i}
              className="h-[60px] flex items-center justify-end pr-4"
              style={{ height: `${hourHeight}px` }}
            >
              <span className="text-sm text-gray-500">
                {formatHour(i)}
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
            >
              {Array.from({ length: 24 }, (_, i) => (
                <div 
                  key={i}
                  className="border-t border-gray-200"
                  style={{ height: `${hourHeight}px` }}
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