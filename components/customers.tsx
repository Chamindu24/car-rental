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
    <section className="w-full px-4 py-12 md:py-24 bg-gradient-to-br from-neutral-50 to-neutral-100">
      <div className="max-w-7xl mx-auto space-y-8 md:space-y-12">
        <h2 className="text-2xl md:text-5xl font-bold text-center">
          Our Customers
        </h2>
        <p className="text-center text-base md:text-lg text-neutral-600 max-w-md mx-auto px-4">
          We value our customers and their feedback.
        </p>

        {/* Statistics Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 px-4">
          {/* Number of Vehicles */}
          <div className="text-center">
            <p className="text-5xl md:text-8xl font-bold text-primary">
              <CountUp from={0} to={20} duration={2} />
              <span className="text-primary">
                <LineShadowText className="italic" shadowColor={"black"}>+</LineShadowText>
              </span>
            </p>
            <p className="text-lg md:text-2xl mt-1 md:mt-2 text-neutral-700 tracking-widest">
              Vehicles Available
            </p>
          </div>

          {/* Happy Customers */}
          <div className="text-center">
            <p className="text-5xl md:text-8xl font-bold text-primary">
              <CountUp from={0} to={1000} duration={1} />
              <span className="text-primary">
                <LineShadowText className="italic" shadowColor={"black"}>+</LineShadowText>
              </span>
            </p>
            <p className="text-lg md:text-2xl mt-1 md:mt-2 text-neutral-700 tracking-widest">
              Happy Customers
            </p>
          </div>

          {/* Years of Experience */}
          <div className="text-center">
            <p className="text-5xl md:text-8xl font-bold text-primary">
              <CountUp from={0} to={8} duration={2} />
              <span className="text-primary">
                <LineShadowText className="italic" shadowColor={"black"}>+</LineShadowText>
              </span>
            </p>
            <p className="text-lg md:text-2xl mt-1 md:mt-2 text-neutral-700 tracking-widest">
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
                    <Card className="mt-4 px-4 py-2 md:px-5 md:py-2 border border-emerald-400 text-white bg-emerald-500/10 backdrop-blur-sm rounded-3xl text-base md:text-xl hover:bg-emerald-500/20 transition-all text-center">
                      <CardContent className="p-2 space-y-1 md:space-y-2">
                        <p className="text-sm md:text-base text-neutral-700 italic">
                          "{testimonial.review}"
                        </p>
                        <p className="text-xs md:text-sm font-semibold text-primary">
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
  );
}