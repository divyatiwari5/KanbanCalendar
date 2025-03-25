import { format, addDays, subDays, parseISO, isValid } from "date-fns";

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