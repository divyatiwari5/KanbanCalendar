import CalendarHeader from '@/app/shared/calendar/CalendarHeader';
import WeekView from '@/app/calendar-portal/WeekView';

export default function Home() {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <CalendarHeader />
      <WeekView 
        events={[]}
        selectedDate={new Date()}
      />
    </div>
  );
}
