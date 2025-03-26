interface CalendarNavigationProps {
  onPrevWeek: () => void;
  onNextWeek: () => void;
}

const CalendarNavigation = ({ onPrevWeek, onNextWeek }: CalendarNavigationProps) => {
  return (
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
  );
};

export default CalendarNavigation; 