"use client";

import React, { useRef } from "react";
import CountUp from "./ui/CountUp";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { LineShadowText } from "@/components/magicui/line-shadow-text";
// import { AuroraBackground } from "./aurora-background"; // Removed unused component

export default function Customers() {
  const plugin = useRef(
    Autoplay({ delay: 2500, stopOnInteraction: true })
  );

  // Fake customer reviews
  const testimonials = [
    {
      name: "Chaminda Perera",
      review: "Great service and clean cars. Highly recommended!",
    },
    {
      name: "Nadeesha Silva",
      review: "Fast pickup, friendly driver. Will rent again!",
    },
    {
      name: "Ruwan Fernando",
      review: "Affordable prices and smooth booking process.",
    },
    {
      name: "Dilini Kumari",
      review: "The best cab service I've used in Sri Lanka.",
    },
    {
      name: "Kasun Rathnayake",
      review: "Professional and on time. Loved the experience!",
    },
  ];

  return (

    <div
      className="bg-fixed bg-cover bg-center"
      style={{
        backgroundImage: "url('/stick1.jpg')", // use root-relative path to public/
        backgroundAttachment: 'fixed', // This is the key for the 'sticky' effect
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Fallback and slight overlay for readability
      }}

    >
      <section className="w-full min-h-[94vh] px-4 py-4 md:py-12 relative bg-white/3 backdrop-blur-xs flex items-center">
        <div className="max-w-7xl mx-auto space-y-2 md:space-y-8 ">
          <h2 className="text-3xl md:text-6xl text-neutral-50 font-bold font-mono text-center tracking-widest">
            Our Customers
          </h2>
         

          {/* Statistics Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
            {/* Number of Vehicles */}
            <div className="text-center ">
              <p className="text-5xl md:text-8xl font-bold text-neutral-300 ">
                <CountUp from={0} to={20} duration={2} />
                <span className="text-neutral-300">
                  <LineShadowText className="italic" shadowColor={"white"}>+</LineShadowText>
                </span>
              </p>
              <p className="text-lg md:text-2xl mt-1 md:mt-2 text-neutral-100 tracking-widest">
                Vehicles Available
              </p>
            </div>

            {/* Happy Customers */}
            <div className="text-center">
              <p className="text-5xl md:text-8xl font-bold text-neutral-300">
              <CountUp from={0} to={1000} duration={1} />
              <span className="text-neutral-300">
                <LineShadowText className="italic" shadowColor={"white"}>+</LineShadowText>
              </span>
              </p>
              <p className="text-lg md:text-2xl mt-1 md:mt-2 text-neutral-100 tracking-widest">
              Happy Customers
              </p>
            </div>

            {/* Years of Experience */}
            <div className="text-center">
              <p className="text-5xl md:text-8xl font-bold text-neutral-300">
                <CountUp from={0} to={8} duration={2} />
                <span className="text-neutral-300">
                  <LineShadowText className="italic" shadowColor={"black"}>+</LineShadowText>
                </span>
              </p>
              <p className="text-lg md:text-2xl mt-1 md:mt-2 text-neutral-100 tracking-widest">
                Years of Experience
              </p>
            </div>
          </div>

          {/* Customer Reviews Row */}
          <div className="w-full px-2">
            <Carousel
              plugins={[plugin.current]}
              className="w-full max-w-4xl mx-auto relative"
              loop
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent className="-ml-1">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="pl-1 md:pl-4">
                    <div className="mt-2 p-1">
                      {/* Adjusted Card for better readability against a potentially busy background */}
                      <Card className="mt-4 px-4 py-2 md:px-5 md:py-2 border border-white/90 text-black bg-black/40 shadow-lg backdrop-blur-sm rounded-3xl text-base md:text-xl hover:bg-black/25 transition-all text-center">
                        <CardContent className="p-2 space-y-1 md:space-y-2">
                          <p className="text-sm md:text-base text-neutral-50 italic">
                            "{testimonial.review}"
                          </p>
                          <p className="text-xs md:text-sm font-semibold text-neutral-100">
                            – {testimonial.name} –
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden md:flex absolute left-0 -translate-x-8" />
              <CarouselNext className="hidden md:flex absolute right-0 translate-x-8" />
            </Carousel>
          </div>
        </div>
      </section>
    </div>
  );
}