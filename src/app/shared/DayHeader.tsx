export interface DayHeaderProps {
  date: number;
  day: string;
  isToday?: boolean;
}

const DayHeader = ({ date, day, isToday = false }: DayHeaderProps) => {
  return (
    <div 
      className={`flex flex-col items-center p-2 rounded-xl cursor-pointer transition-all duration-200
      ${isToday 
        ? 'bg-gradient-to-tr from-indigo-600 to-violet-600 text-white shadow-md' 
        : 'bg-white/10 hover:bg-white/20'}`}
    >
      <span className="text-sm font-medium">{day}</span>
      <span className="text-xl font-semibold mt-1">{date}</span>
    </div>
  );
}

export default DayHeader;