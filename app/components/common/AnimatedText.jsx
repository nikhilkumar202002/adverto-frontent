"use client";

import { motion } from "framer-motion";

export default function AnimatedText({
  text,
  className = "",
}) {
  return (
    <span className={`overflow-hidden inline-block ${className}`}>
      <motion.span
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        transition={{
          duration: 0.8,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="inline-block"
      >
        {text}
      </motion.span>
    </span>
  );
}