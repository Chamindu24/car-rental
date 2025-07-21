"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";
import { useEffect } from "react";

export default function HeroSection() {
  const controls = useAnimation();
  const textControls = useAnimation();

  useEffect(() => {
    const loop = async () => {
      while (true) {
        await controls.start({ scale: 1.1, transition: { duration: 0.9 } });
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
    <section className="relative bg-gradient-to-br from-neutral-50 to-neutral-100 text-black py-28 px-6 md:px-12 overflow-hidden">
      {/* Decorative elements with yellow accents */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-yellow-400/10 blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-yellow-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-32 h-32 rounded-full bg-yellow-300/20 blur-xl"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10">
        {/* Text section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent">
              Drive Your <motion.span 
                className="inline-block italic text-yellow-500"
                animate={textControls}
              >
                Dream
              </motion.span> Car
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-neutral-600 max-w-lg">
            <span className="font-semibold text-yellow-600">Premium vehicles</span> at your fingertips. 
            Whether you need a driver or want to take the wheel yourself, experience the{" "}
            <span className="relative inline-block">
              <span className="relative z-10">thrill of luxury</span>
              <motion.span 
                className="absolute bottom-0 left-0 w-full h-2 bg-yellow-300/40"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </span>{" "}
            with our seamless rental service.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/rent?driver=true">
              <Button size="lg" className="bg-gradient-to-r from-primary to-yellow-500 hover:from-primary/90 hover:to-yellow-500/90 text-white shadow-lg transition-all group">
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Book with Driver 
                  <motion.span 
                    animate={{ x: [0, 4, 0] }}
                    transition={{ repeat: Infinity, duration: 1.5 }}
                  >
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.span>
                </motion.div>
              </Button>
            </Link>

            <Link href="/rent?driver=false">
              <Button size="lg" variant="outline" className="text-black border-neutral-300 hover:bg-white hover:text-black hover:border-white shadow-sm hover:shadow-md transition-all group">
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Self-Drive Adventure
                  <motion.span
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    <Sparkles className="w-4 h-4 text-yellow-500" />
                  </motion.span>
                </motion.div>
              </Button>
            </Link>
          </div>

          <motion.div
            className="flex flex-wrap items-center gap-6 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <div className="flex items-center gap-2 bg-yellow-50 px-3 py-1.5 rounded-full border border-yellow-100">
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                ))}
              </div>
              <span className="text-sm font-medium text-yellow-700">5.0 (2.4k reviews)</span>
            </div>
            
           
          </motion.div>
        </motion.div>

        {/* Car image */}
        <div className="relative w-full h-72 md:h-96">
          <motion.img
            src="/car.png"
            alt="Luxury Car Rental"
            className="w-full h-full object-contain drop-shadow-4xl"
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
            className="absolute -bottom-6 -right-6 bg-white px-4 py-2 rounded-full shadow-md flex items-center gap-2"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <motion.div 
              className="w-3 h-3 rounded-full bg-green-500"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <span className="text-sm font-medium">24/7 Available</span>
          </motion.div>

          
        </div>
      </div>
    </section>
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