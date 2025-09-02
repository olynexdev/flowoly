export const animation1 = {
    y: [0, -10, 10, 0], // Circle 1 moves slightly up and down
    x: [0, 10, -10, 0],
    transition: {
      duration: 3, // Duration of the animation
      repeat: Infinity, // Repeat forever
      ease: "easeInOut", // Smooth easing
    },
  };

  export const animation2 = {
    y: [0, 5, -5, 0], // Circle 2 moves slightly up and down differently
    x: [0, -5, 5, 0],
    transition: {
      duration: 2.5,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  export  const animation3 = {
    y: [0, -8, 8, 0], // Circle 3 moves slightly differently
    x: [0, 8, -8, 0],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };