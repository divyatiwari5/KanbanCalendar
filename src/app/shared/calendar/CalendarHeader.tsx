import DayHeader, { DayHeaderProps } from './DayHeader';

export interface CalendarHeaderProps {
  days: DayHeaderProps[];
}

const CalendarHeader = ({ days }: CalendarHeaderProps) => {
  return (
    <div className="bg-blue-500 text-white p-4 rounded-lg">
      <h2 className="text-xl mb-4">Your Schedule</h2>
      <div className="flex justify-between">
        {days.map((day) => (
          <DayHeader 
            key={day.date}
            date={day.date}
            day={day.day}
            isToday={day.isToday}
          />
        ))}
      </div>
    </div>
  );
}

export default CalendarHeader;