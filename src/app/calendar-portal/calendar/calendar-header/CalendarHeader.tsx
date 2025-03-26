"use client";

import CalendarHeaderMobile from "./CalendarHeader.Mobile";
import CalendarHeaderDesktop from "./CalendarHeader.Desktop";
import { generateWeekDays, getCurrentMonth } from "@/app/utils/dateHelpers";

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevWeek: () => void;
  onNextWeek: () => void;
  onDaySelect?: (date: Date) => void;
  selectedDate: Date;
}

const CalendarHeader = ({
  currentDate,
  onPrevWeek,
  onNextWeek,
  onDaySelect,
  selectedDate,
}: CalendarHeaderProps) => {
  const days = generateWeekDays(currentDate);
  const currentMonth = getCurrentMonth(currentDate);

  return (
    <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-xl">Your Schedule</h2>
          <h3 className="text-sm mt-1 opacity-80">{currentMonth}</h3>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onPrevWeek}
            className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            ←
          </button>
          <button
            onClick={onNextWeek}
            className="w-10 h-10 flex items-center justify-center bg-gradient-to-tr from-indigo-600 to-violet-600 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105 active:scale-95"
          >
            →
          </button>
        </div>
      </div>

      <CalendarHeaderMobile
        days={days}
        selectedDate={selectedDate}
        onDaySelect={onDaySelect}
      />
      <CalendarHeaderDesktop days={days} />
    </div>
  );
};

export default CalendarHeader;
