"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { ChevronRight, Dot, Sparkles } from "lucide-react";
import { useEffect } from "react";
import { GridBackground } from "./DotBackground";

export default function HeroSection() {
  const controls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    const loop = async () => {
      while (true) {
        await controls.start({ scale: 1.05, transition: { duration: 0.9 } });
        await controls.start({ scale: 1, transition: { duration: 0.3 } });
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    };
    
    const textLoop = async () => {
      const adjectives = ["Dream", "Perfect", "Ideal", "Luxury", "Premium"];
      while (true) {
        for (const word of adjectives) {
          await textControls.start({
            opacity: 0,
            y: 10,
            transition: { duration: 0.3 }
          });
          await textControls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.3 }
          });
          await new Promise(resolve => setTimeout(resolve, 2000));
        }
      }
    };

    loop();
    textLoop();
  }, [controls, textControls]);

  return (
    <GridBackground>
      <section className="relative bg-gradient-to-br from-neutral-50/80 to-neutral-100/80 text-black py-12 md:py-28 sm:px-6 lg:px-8 overflow-hidden">
        {/* Decorative elements with gray/ash accents - reduced for mobile */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-600/5 to-transparent"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 md:w-64 md:h-64 rounded-full bg-gray-500/10 blur-xl md:blur-3xl"></div>
          <div className="absolute top-1/3 -right-10 w-48 h-48 md:w-96 md:h-96 rounded-full bg-gray-300/10 blur-xl md:blur-3xl"></div>
          <div className="absolute bottom-1/4 left-1/4 w-20 h-20 md:w-32 md:h-32 rounded-full bg-gray-100/20 blur-lg md:blur-xl"></div>
        </div>

        <div className="max-w-7xl mx-auto pt-20 grid grid-cols-1 md:grid-cols-2 items-center gap-6 md:gap-12 relative z-10">
          {/* Text section */}
          <motion.div
            className="space-y-3 md:space-y-6 text-center md:text-left"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-snug md:leading-tight">
              <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                Drive Your <motion.span 
                  className="inline-block italic text-gray-600"
                  animate={textControls}
                >
                  Perfect
                </motion.span> Ride
              </span>
            </h1>
            
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-md md:max-w-lg mx-auto md:mx-0">
              <span className="font-semibold text-gray-700">Premium vehicles</span> at your fingertips. 
              Whether you need a driver or want to take the wheel yourself, experience the{" "}
              <span className="relative inline-block">
                <span className="relative z-10">thrill of luxury</span>
                <motion.span 
                  className="absolute bottom-0 left-0 w-full h-1.5 md:h-2 bg-gray-300/40"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 1, delay: 0.5 }}
                />
              </span>{" "}
              with our seamless rental service.
            </p>

            <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-2 sm:gap-3 md:gap-4">
              <Link href="/rent?driver=true" className="w-full sm:w-auto">
                <Button size="lg" className="w-full text-sm sm:text-base bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-700 hover:to-gray-500 text-white shadow-lg transition-all group">
                  <motion.div
                    className="flex items-center gap-1 sm:gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Book with Driver 
                    <motion.span 
                      animate={{ x: [0, 4, 0] }}
                      transition={{ repeat: Infinity, duration: 1.5 }}
                    >
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.span>
                  </motion.div>
                </Button>
              </Link>

              <Link href="/rent?driver=false" className="w-full sm:w-auto">
                <Button size="lg" variant="outline" className="w-full text-sm sm:text-base text-gray-800 border-gray-300 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-400 shadow-sm hover:shadow-md transition-all group">
                  <motion.div
                    className="flex items-center gap-1 sm:gap-2"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Self-Drive
                    <motion.span
                      animate={{ rotate: [0, 15, -15, 0] }}
                      transition={{ repeat: Infinity, duration: 2 }}
                    >
                      <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 text-gray-500" />
                    </motion.span>
                  </motion.div>
                </Button>
              </Link>
            </div>

            <motion.div
              className="flex flex-wrap justify-center md:justify-start items-center gap-2 md:gap-4 pt-1 md:pt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
            >
              <div className="flex items-center gap-1.5 bg-gray-50 px-2 py-1 sm:px-3 sm:py-1.5 rounded-full border border-gray-200">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon key={i} className="w-3 h-3 sm:w-4 sm:h-4 text-gray-400 fill-gray-400" />
                  ))}
                </div>
                <span className="text-xs sm:text-sm font-medium text-gray-700">5.0 (2.4k)</span>
              </div>
            </motion.div>
          </motion.div>

          {/* Car image - adjusted for mobile */}
          <div className="relative w-full h-48 sm:h-72 md:h-80 lg:h-100 md:mt-0">
            <motion.img
              src="/car.png"
              alt="Luxury Car Rental"
              className="w-full h-full object-contain drop-shadow-xl md:drop-shadow-2xl lg:drop-shadow-4xl"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            />
            <motion.img
              src="/car.png"
              alt="Animated Car Pulse"
              className="absolute top-0 left-0 w-full h-full object-contain pointer-events-none"
              animate={controls}
            />

            <motion.div
              className="absolute -bottom-2 -right-2 sm:-bottom-4 sm:-right-4 bg-white px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm sm:shadow-md flex items-center gap-1 sm:gap-2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.6 }}
            >
              <motion.div 
                className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              />
              <span className="text-[0.6rem] sm:text-xs md:text-sm font-medium">24/7</span>
            </motion.div>
          </div>
        </div>
      </section>
    </GridBackground>
  );
}

function StarIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
      />
    </svg>
  );
}