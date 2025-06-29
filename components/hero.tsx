"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion, useAnimation } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { useEffect } from "react";

export default function HeroSection() {
  const controls = useAnimation();

  useEffect(() => {
    const loop = async () => {
      while (true) {
        await controls.start({ scale: 1.1, transition: { duration: 0.9 } });
        await controls.start({ scale: 1, transition: { duration: 0.3 } });
        await new Promise(resolve => setTimeout(resolve, 3000));
      }
    };
    loop();
  }, [controls]);

  return (
    <section className="relative bg-gradient-to-br from-neutral-50 to-neutral-200 text-black py-28 px-6 md:px-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent"></div>
        <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full bg-primary/10 blur-3xl"></div>
        <div className="absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-secondary/10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative z-10">
        {/* Text section */}
        <motion.div
          className="space-y-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold leading-tight bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Rent Your <span className="italic">Perfect</span> Ride
          </h1>
          <p className="text-lg md:text-xl text-neutral-600 max-w-lg">
            Premium car rentals available with or without a driver. Reliable, fast, and affordable — just a click away.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link href="/rent?driver=true">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-white shadow-lg transition-all">
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Rent with Driver <ChevronRight className="w-4 h-4" />
                </motion.div>
              </Button>
            </Link>

            <Link href="/rent?driver=false">
              <Button size="lg" variant="outline" className="text-black border-neutral-300 hover:bg-white hover:text-black hover:border-white shadow-sm hover:shadow-md transition-all">
                <motion.div
                  className="flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Rent without Driver <ChevronRight className="w-4 h-4" />
                </motion.div>
              </Button>
            </Link>
          </div>

          <motion.div
            className="text-sm text-neutral-500 pt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            <p>Trusted by 5000+ customers</p>
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
              ))}
              <span className="ml-1">5.0 (2.4k reviews)</span>
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
            <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse"></div>
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
