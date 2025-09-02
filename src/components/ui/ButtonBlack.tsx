import React from 'react';

const ButtonBlack = ({ text }: { text: string }) => {
  return (
    <button className="px-6 md:px-8 py-2 md:py-3 rounded-lg relative bg-[#19191980] active:scale-75 backdrop-blur-xl text-white text-text16 hover:shadow-2xl hover:shadow-white/[0.1] transition duration-300 border border-slate-600 font-montserrat whitespace-nowrap">
      <div className="absolute inset-x-0 h-px w-1/2 mx-auto -top-px shadow-2xl  bg-gradient-to-r from-transparent via-teal-500 to-transparent" />
      <span className="relative z-20">{text}</span>
    </button>
  );
};

export default ButtonBlack;

// import React from 'react';

// const ButtonBlack = ({ text }: { text: string }) => {
//   return (
//     <button className="relative group px-6 md:px-8 py-2 md:py-3 rounded-lg backdrop-blur-xl text-white text-text16 transition duration-300 font-montserrat whitespace-nowrap overflow-hidden">
//       {/* Rotating Gradient Border */}
//       <span className="absolute inset-0 w-[150%] h-[150%] rounded-lg bg-conic-gradient from-teal-500 to-teal-500 animate-border-rotate"></span>

//       <span className="absolute left-[1px] top-[1px] h-[calc(100%-2px)] w-[calc(100%-2px)] rounded-lg bg-black"></span>
//       {/* Button Text */}
//       <span className="relative z-10">{text}</span>
//     </button>
//   );
// };

// export default ButtonBlack;
