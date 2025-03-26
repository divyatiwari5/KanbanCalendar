"use client";

import CalendarHeaderMobile from "./CalendarHeader.Mobile";
import CalendarHeaderDesktop from "./CalendarHeader.Desktop";
import CalendarNavigation from "./CalendarNavigation";
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
        <CalendarNavigation onPrevWeek={onPrevWeek} onNextWeek={onNextWeek} />
      </div>

      <CalendarHeaderMobile
        days={days}
        selectedDate={selectedDate}
        onDaySelect={onDaySelect}
      />
      <CalendarHeaderDesktop days={days} selectedDate={selectedDate} />
    </div>
  );
};

export default CalendarHeader;
