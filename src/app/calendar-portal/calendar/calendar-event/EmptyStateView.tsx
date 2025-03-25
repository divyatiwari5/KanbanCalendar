import { motion } from "framer-motion";
import { getItemVariants } from "@/app/utils/animationVariants";

interface EmptyStateViewProps {
  slideDirection: "left" | "right" | null;
}

const EmptyStateView = ({ slideDirection }: EmptyStateViewProps) => {
  return (
    <motion.div
      className="flex items-center justify-center text-center text-gray-500 min-h-[calc(100vh-250px)] bg-white rounded-2xl shadow-sm"
      variants={getItemVariants(0, slideDirection)}
    >
      <div className="p-8">
        <div className="text-lg font-medium mb-2">No Events</div>
        <div className="text-sm text-gray-400">
          Swipe left or right to navigate between days
        </div>
      </div>
    </motion.div>
  );
};

export default EmptyStateView; 