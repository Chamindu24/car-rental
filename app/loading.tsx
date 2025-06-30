"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

function Loading() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-black text-white px-4 text-center">
      {/* Logo with animated dim/pulse effect */}
      <motion.div
        initial={{ opacity: 0.6, scale: 1 }}
        animate={{ 
          opacity: [0.1, 1, 0.8, 0.1],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 2, 
          repeat: Infinity, 
          ease: "easeInOut",
          times: [0, 0.5, 1]
        }}
        className="flex flex-col sm:flex-row items-center justify-center gap-3"
      >
        <Image
          src="/vehicle.png"
          alt="CR Cab Service Logo"
          width={120}
          height={120}
          className="bg-neutral-200 rounded-xl p-1 shadow-lg sm:w-20 sm:h-20"
        />
        <h1 className="text-5xl sm:text-5xl font-bold tracking-tight mt-8 sm:mt-0">
          C R Cab Service
        </h1>
      </motion.div>

      {/* Subtext with fade animation */}
      <motion.p 
        className="mt-4 text-sm sm:text-base text-gray-400"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Finding you the best ride...
      </motion.p>
    </div>
  );
}

export default Loading;
