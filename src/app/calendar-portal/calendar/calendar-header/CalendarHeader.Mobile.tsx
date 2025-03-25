import { format } from "date-fns";
import { DayHeaderProps } from "./DayHeader";
import { motion } from "framer-motion";

interface MobileCalendarHeaderProps {
  days: DayHeaderProps[];
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
      {days.map((day) => (
        <motion.button
          key={`${day.date}-${day.day}`}
          onClick={() => onDaySelect?.(day.fullDate)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            scale:
              format(day.fullDate, "yyyy-MM-dd") ===
              format(selectedDate, "yyyy-MM-dd")
                ? 1.05
                : 1,
            backgroundColor:
              format(day.fullDate, "yyyy-MM-dd") ===
              format(selectedDate, "yyyy-MM-dd")
                ? "rgb(79, 70, 229)"
                : "rgba(255, 255, 255, 0.1)",
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className={`p-2 rounded-xl transition-all ${
            format(day.fullDate, "yyyy-MM-dd") ===
            format(selectedDate, "yyyy-MM-dd")
              ? "text-white"
              : "hover:bg-white/20"
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
      ))}
    </div>
  );
};

export default CalendarHeaderMobile;
