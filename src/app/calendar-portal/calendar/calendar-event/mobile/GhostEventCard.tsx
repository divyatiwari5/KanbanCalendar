import { motion } from "framer-motion";
import Image from "next/image";
import { CalendarEvent } from "@/app/mockData/eventData";

interface GhostEventCardProps {
  event: CalendarEvent;
  currentDateStr: string;
}

const GhostEventCard = ({ event, currentDateStr }: GhostEventCardProps) => {
  return (
    <motion.div
      className="bg-white rounded-2xl shadow-sm overflow-hidden cursor-grabbing ring-2 ring-blue-500 opacity-90"
      animate={{
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        zIndex: 50,
      }}
      layoutId={`event-${currentDateStr}-${event.id}`}
    >
      <div className="relative w-full h-32">
        <Image
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
          fill
        />
        <motion.div
          className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm"
          layoutId={`time-${currentDateStr}-${event.id}`}
        >
          {event.time}
        </motion.div>
      </div>
      <div className="p-4">
        <motion.h3 
          layoutId={`title-${currentDateStr}-${event.id}`}
          className="text-lg font-semibold text-gray-900"
        >
          {event.title}
        </motion.h3>
        <motion.div
          className="mt-1 text-gray-600 line-clamp-2"
          layoutId={`content-${currentDateStr}-${event.id}`}
        >
          {event.description}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GhostEventCard; 