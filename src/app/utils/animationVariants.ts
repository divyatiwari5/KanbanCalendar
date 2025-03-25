/**
 * Animation variants for item transitions in the calendar
 */
export const getItemVariants = (index: number, slideDirection: "left" | "right" | null) => ({
  hidden: {
    opacity: 0,
    scale: 0.8,
    x: slideDirection === "left" ? 300 : slideDirection === "right" ? -300 : 0,
    rotateX: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    x: 0,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
      mass: 1,
      delay: index * 0.2,
      duration: 0.8,
      ease: "easeInOut",
    },
  },
});

/**
 * Animation variants for dragging events
 */
export const getDragVariants = () => ({
  dragging: {
    scale: 1.05,
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
    zIndex: 50
  },
  hover: {
    scale: 1.02,
    transition: { duration: 0.3, ease: "easeOut" },
  }
});

/**
 * Animation variants for event container
 */
export const getContainerVariants = () => ({
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}); 