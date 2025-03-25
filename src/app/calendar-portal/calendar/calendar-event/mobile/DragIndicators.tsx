import { formatDateForDisplay } from "@/app/utils/dateHelpers";

interface DragIndicatorsProps {
  isDragging: boolean;
  showDropIndicator: boolean;
  selectedDate: Date;
}

const DragIndicators = ({ isDragging, showDropIndicator, selectedDate }: DragIndicatorsProps) => {
  if (!isDragging) return null;

  return (
    <>
      {showDropIndicator && (
        <div className="bg-blue-50 text-blue-700 p-3 mx-4 my-2 rounded-lg text-center text-sm flex-shrink-0">
          <p>Release to drop event on {formatDateForDisplay(selectedDate)}</p>
          <p className="text-xs mt-1">Drag to screen edges to change dates</p>
        </div>
      )}

      {/* Visual edge indicators for dragging to previous/next day */}
      <div className="fixed top-0 left-0 w-16 h-full bg-gradient-to-r from-blue-100/50 to-transparent z-10 pointer-events-none flex items-center justify-center">
        <div className="bg-white/80 p-2 rounded-full shadow-md text-blue-500">
          ← Prev
        </div>
      </div>
      <div className="fixed top-0 right-0 w-16 h-full bg-gradient-to-l from-blue-100/50 to-transparent z-10 pointer-events-none flex items-center justify-center">
        <div className="bg-white/80 p-2 rounded-full shadow-md text-blue-500">
          Next →
        </div>
      </div>
    </>
  );
};

export default DragIndicators; 