import { format, addDays, subDays, parseISO, isValid, startOfWeek, isToday } from "date-fns";
import { CalendarEvent } from "@/app/mockData/eventData";

export interface WeekDayData {
  date: number;
  day: string;
  isToday: boolean;
  fullDate: Date;
}

export interface WeekDayEvents {
  currentDay: Date;
  dateString: string;
  dayEvents: CalendarEvent[];
}

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
export const generateWeekDays = (startDate: Date): WeekDayData[] => {
  const days: WeekDayData[] = [];
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

/**
 * Compare two dates to see if they represent the same day
 */
export const isSameDay = (date1: Date, date2: Date): boolean => {
  return format(date1, "yyyy-MM-dd") === format(date2, "yyyy-MM-dd");
};

/**
 * Generate week days with events
 */
export const generateWeekDaysWithEvents = (
  weekStart: Date,
  getEventsForDay: (date: Date) => CalendarEvent[]
): WeekDayEvents[] => {
  return Array.from({ length: 7 }, (_, dayIndex) => {
    const currentDay = addDays(weekStart, dayIndex);
    const dateString = format(currentDay, "yyyy-MM-dd");
    const dayEvents = getEventsForDay(currentDay);
    
    return {
      currentDay,
      dateString,
      dayEvents,
    };
  });
};

/**
 * Calculate current time position in pixels
 */
export const calculateCurrentTimePosition = (hourHeight: number): number => {
  return (new Date().getHours() * 60 + new Date().getMinutes()) * (hourHeight / 60);
};