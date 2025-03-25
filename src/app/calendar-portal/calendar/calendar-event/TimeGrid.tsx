"use client";

import React, { useMemo } from 'react';

interface TimeGridProps {
  hourHeight: number;
}

// Static arrays as constants since they never change
const HOURS = Array.from({ length: 24 }, (_, i) => i);
const HALF_HOURS = Array.from({ length: 48 }, (_, i) => i);

const TimeGrid = ({ hourHeight = 60 }: TimeGridProps) => {
  // Memoize the formatHour function since it's a computation
  const formatHour = useMemo(() => {
    return (hour: number) => {
      if (hour === 0) return "12 AM";
      if (hour === 12) return "12 PM";
      return hour < 12 ? `${hour} AM` : `${hour - 12} PM`;
    };
  }, []);

  return (
    <div className="absolute inset-0">
      <div className="flex relative">
        {/* Time labels column */}
        <div className="w-20 sticky left-0 bg-white z-20 -mt-3">
          {HOURS.map((hour) => (
            <div
              key={hour}
              className="relative flex items-start justify-end pr-4"
              style={{ height: `${hourHeight}px` }}
            >
              <span className="text-xs font-medium text-gray-400 -translate-y-2">
                {formatHour(hour)}
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
              {HOURS.map((hour) => (
                <div
                  key={hour}
                  className="border-t border-gray-100"
                  style={{ height: `${hourHeight}px` }}
                />
              ))}
            </div>

            {/* Half hour lines */}
            <div className="absolute inset-0">
              {HALF_HOURS.map((i) => (
                <div
                  key={i}
                  className={`border-t ${
                    i % 2 === 0 ? "border-transparent" : "border-gray-50"
                  }`}
                  style={{ height: `${hourHeight / 2}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(TimeGrid);
