import { motion, PanInfo } from "framer-motion";
import Image from "next/image";
import { CalendarEvent } from "@/app/mockData/eventData";
import { getItemVariants } from "@/app/utils/animationVariants";

interface EventCardProps {
  event: CalendarEvent;
  currentDateStr: string;
  index: number;
  slideDirection: "left" | "right" | null;
  isDragging: boolean;
  draggingEventId: string | null;
  containerRef: React.RefObject<HTMLDivElement | null>;
  onDragStart: (eventId: string) => void;
  onDrag: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void;
  onDragEnd: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo, eventId: string) => void;
  onEventClick: (event: CalendarEvent) => void;
}

const EventCard = ({
  event,
  currentDateStr,
  index,
  slideDirection,
  isDragging,
  draggingEventId,
  containerRef,
  onDragStart,
  onDrag,
  onDragEnd,
  onEventClick,
}: EventCardProps) => {
  return (
    <motion.div
      key={`${currentDateStr}-${event.id}`}
      layoutId={`event-${currentDateStr}-${event.id}`}
      drag="x"
      dragDirectionLock
      dragConstraints={containerRef}
      dragElastic={0.5}
      onDragStart={() => onDragStart(event.id)}
      onDrag={onDrag}
      onDragEnd={(e, info) => onDragEnd(e, info, event.id)}
      variants={getItemVariants(index, slideDirection)}
      whileDrag={{
        scale: 1.05,
        boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
        zIndex: 50,
      }}
      onClick={() => {
        if (!isDragging) {
          onEventClick(event);
        }
      }}
      whileHover={
        !isDragging
          ? {
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" },
            }
          : {}
      }
      className={`bg-white rounded-2xl shadow-sm overflow-hidden cursor-grab active:cursor-grabbing ${
        draggingEventId === event.id ? "ring-2 ring-blue-500" : ""
      }`}
    >
      <div className="relative w-full h-32">
        <Image
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
          fill
        />
        <motion.div 
          layoutId={`time-${currentDateStr}-${event.id}`}
          className="absolute top-4 right-4 bg-indigo-600 text-white px-3 py-1 rounded-full text-sm"
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
          layoutId={`content-${currentDateStr}-${event.id}`}
          className="mt-1 text-gray-600 line-clamp-2"
        >
          {event.description}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default EventCard; 