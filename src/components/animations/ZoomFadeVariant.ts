export const ZoomFadeVariants = {
    hidden: { 
      opacity: 0,         // Start invisible
      scale: 0.8,         // Start slightly smaller
      filter: "blur(10px)" // Start with a blur effect
    },
    visible: { 
      opacity: 1,         // Fully visible
      scale: 1,           // Scale to original size
      filter: "blur(0px)", // Remove the blur effect
    },
    transition: { 
      duration: 0.3,      // Duration of the animation
      ease: "easeOut",    // Easing function
    },
  };
  