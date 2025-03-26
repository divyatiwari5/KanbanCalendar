import { format, addDays, subDays, parseISO, isValid, startOfWeek, isToday } from "date-fns";
import { DayHeaderProps } from "@/app/calendar-portal/calendar/calendar-header/DayHeader";

/**
 * Format a date to yyyy-MM-dd format
 */
export const formatDateToString = (date: Date): string => {
  return format(date, "yyyy-MM-dd");
};

/**
 * Format a date to a more user-friendly format (Month day)
 */
export const formatDateForDisplay = (date: Date): string => {
  return format(date, "MMMM d");
};

/**
 * Get the previous day
 */
export const getPreviousDay = (date: Date): Date => {
  return subDays(date, 1);
};

/**
 * Get the next day
 */
export const getNextDay = (date: Date): Date => {
  return addDays(date, 1);
};

/**
 * Parse a date string in yyyy-MM-dd format
 */
export const parseDateString = (dateString: string): Date | null => {
  try {
    const date = parseISO(dateString);
    return isValid(date) ? date : null;
  } catch (error) {
    console.error("Error parsing date:", error);
    return null;
  }
};

/**
 * Compare two date strings to see if they represent the same day
 */
export const isSameDateString = (dateStr1: string, dateStr2: string): boolean => {
  return dateStr1 === dateStr2;
}; 

export const parseDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split('-').map(Number);
  if (!year || !month || !day) {
    throw new Error('Invalid date string');
  }
  return new Date(year, month - 1, day);
};

/**
 * Generate week days for the calendar header
 */
export const generateWeekDays = (startDate: Date): DayHeaderProps[] => {
  const days: DayHeaderProps[] = [];
  const start = startOfWeek(startDate, { weekStartsOn: 0 });

  for (let i = 0; i < 7; i++) {
    const date = addDays(start, i);
    days.push({
      date: parseInt(format(date, "d")),
      day: format(date, "EEE"),
      isToday: isToday(date),
      fullDate: date,
    });
  }
  return days;
};

/**
 * Get the current month and year in a formatted string
 */
export const getCurrentMonth = (date: Date): string => {
  return format(date, "MMMM yyyy");
};