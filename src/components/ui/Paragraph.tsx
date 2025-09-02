"use client";
import React, { ReactNode } from "react";
import { motion } from "framer-motion";

const Paragraph = ({
  children,
  className = "",
  delay = 2,
  variants,
  isInView = true,
  duration = 0.5,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  variants?: any;
  isInView?: boolean;
  duration?: number;
}) => {
  return (
    <motion.p
      transition={{ duration: duration, delay: delay }}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className={`${className} lg:text-text16  leading-[30px] font-poppins`}
    >
      {children}
    </motion.p>
  );
};

export default Paragraph;
