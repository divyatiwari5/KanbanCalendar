import { isSameDay } from "@/app/utils/dateHelpers";

export interface DayHeaderProps {
  date: number;
  day: string;
  isToday: boolean;
  fullDate: Date;
  selectedDate: Date;
}

const DayHeader = ({ date, day, fullDate, selectedDate }: DayHeaderProps) => {
  const isSelected = isSameDay(fullDate, selectedDate);

  return (
    <div className={`text-center p-2 ${isSelected ? 'bg-white/10 rounded-lg' : ''}`}>
      <div className="text-sm font-medium">{day}</div>
      <div className="text-lg font-semibold mt-1">{date}</div>
    </div>
  );
};

export default DayHeader;