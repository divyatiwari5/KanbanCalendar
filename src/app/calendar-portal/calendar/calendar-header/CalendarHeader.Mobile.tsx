import { motion } from "framer-motion";
import { isSameDay, WeekDayData } from "@/app/utils/dateHelpers";

interface MobileCalendarHeaderProps {
  days: WeekDayData[];
  selectedDate: Date;
  onDaySelect?: (date: Date) => void;
}

const CalendarHeaderMobile = ({
  days,
  selectedDate,
  onDaySelect,
}: MobileCalendarHeaderProps) => {
  return (
    <div className="md:hidden grid grid-cols-7 gap-1">
      {days.map((day) => {
        const isSelected = isSameDay(day.fullDate, selectedDate);
        return (
          <motion.button
            key={`${day.date}-${day.day}`}
            onClick={() => onDaySelect?.(day.fullDate)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: isSelected ? 1.05 : 1,
              backgroundColor: isSelected
                ? "rgb(79, 70, 229)"
                : "rgba(255, 255, 255, 0.1)",
            }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className={`p-2 rounded-xl transition-all ${
              isSelected ? "text-white" : "hover:bg-white/20"
            }`}
          >
            <motion.div
              className="text-xs font-medium"
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {day.day}
            </motion.div>
            <motion.div
              className="text-lg font-semibold mt-1"
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
            >
              {day.date}
            </motion.div>
          </motion.button>
        );
      })}
    </div>
  );
};

export default CalendarHeaderMobile;
