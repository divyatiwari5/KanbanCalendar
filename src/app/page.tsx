import CalendarHeader from "./shared/calendar/CalendarHeader";

export default function Home() {
  const days = [
    { date: 10, day: 'Sun' },
    { date: 11, day: 'Mon' },
    { date: 12, day: 'Tue' },
    { date: 13, day: 'Wed', isToday: true },
    { date: 14, day: 'Thu' },
    { date: 15, day: 'Fri' },
    { date: 16, day: 'Sat' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4">
      <CalendarHeader days={days} />
    </div>
  );
}
