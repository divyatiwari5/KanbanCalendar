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
        <div className="w-20 sticky left-0 bg-white z-20 -mt-3">
          {Array.from({ length: 24 }, (_, i) => (
            <div 
              key={i}
              className="relative flex items-start justify-end pr-4"
              style={{ height: `${hourHeight}px` }}
            >
              <span className="text-xs font-medium text-gray-400 -translate-y-2">
                {formatHour(i)}
              </span>
              {/* Half hour marker */}
              <div className="absolute top-1/2 right-3 w-1 h-px bg-gray-200" />
            </div>
          ))}
        </div>

        {/* Grid columns */}
        <div className="flex-1">
          <div className="absolute inset-0">
            {/* Hour lines */}
            <div className="relative h-full">
              {Array.from({ length: 24 }, (_, i) => (
                <div 
                  key={i}
                  className="border-t border-gray-100"
                  style={{ height: `${hourHeight}px` }}
                />
              ))}
            </div>

            {/* Half hour lines */}
            <div className="absolute inset-0">
              {Array.from({ length: 48 }, (_, i) => (
                <div 
                  key={i}
                  className={`border-t ${i % 2 === 0 ? 'border-transparent' : 'border-gray-50'}`}
                  style={{ height: `${hourHeight/2}px` }}
                />
              ))}
            </div>

            {/* Current time indicator */}
            <div 
              className="absolute left-0 right-0 flex items-center z-20 pointer-events-none"
              style={{ 
                top: `${(new Date().getHours() * 60 + new Date().getMinutes()) * (hourHeight / 60)}px` 
              }}
            >
              <div className="w-1.5 h-1.5 rounded-full bg-red-500 -ml-0.75" />
              <div className="flex-1 h-px bg-red-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TimeGrid;