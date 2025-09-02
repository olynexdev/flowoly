import { Variants } from "framer-motion";

// animations/variants.ts
export const fadeInUp = {
  hidden: {
    opacity: 0,
    y: 20, // Start slightly below
  },
  visible: {
    opacity: 1,
    y: 0, // End at normal position
    transition: {
      duration: 0.5,
      ease: "easeOut", // Smooth transition
    },
  },
};

export const sidebarVariants: Variants = {
  open: {
    x: 0, // Fully visible (from the left)
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
  closed: {
    x: "-100%", // Hidden (off the left side of the screen)
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
    },
  },
};
