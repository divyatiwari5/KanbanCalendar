export interface DayHeaderProps {
  date: number;
  day: string;
  isToday: boolean;
  fullDate: Date;
}

const DayHeader = ({ date, day, isToday }: DayHeaderProps) => {
  return (
    <div className={`text-center p-2 ${isToday ? 'bg-white/10 rounded-lg' : ''}`}>
      <div className="text-sm font-medium">{day}</div>
      <div className="text-lg font-semibold mt-1">{date}</div>
    </div>
  );
};

export default DayHeader;