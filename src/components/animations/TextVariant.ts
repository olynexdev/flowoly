export const TextVariants = {
  hidden: { opacity: 0, y: 50 }, // Start invisible and 50px down
  visible: { opacity: 1, y: 0 }, // Fully visible and at its original position
  transition: {
    // Adding transition properties for smoothness
    duration: 0.5, // Duration of the animation
    ease: 'easeOut', // Easing function
  },
};
