export interface DayHeaderProps {
  date: number;
  day: string;
  isToday?: boolean;
}

const DayHeader = ({ date, day, isToday = false }: DayHeaderProps) => {
  return (
    <div 
      className={`flex flex-col items-center p-2 rounded-full cursor-pointer transition-colors
      ${isToday ? 'bg-blue-600 text-white' : 'hover:bg-blue-100'}`}
    >
      <span className="text-sm">{day}</span>
      <span className="text-lg font-semibold">{date}</span>
    </div>
  );
}

export default DayHeader;