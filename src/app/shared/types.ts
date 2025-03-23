export interface CalendarEvent {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
  type?: 'default' | 'meeting' | 'social' | 'review';
  attendees?: string[];
  location?: string;
  color?: string;
}

export interface TimeSlot {
  hour: number;
  minute: number;
  format: '12h' | '24h';
} 