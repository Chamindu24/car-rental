"use client";

import React from "react";
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
  const plugin = React.useRef(
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
      review: "The best cab service I’ve used in Sri Lanka.",
    },
    {
      name: "Kasun Rathnayake",
      review: "Professional and on time. Loved the experience!",
    },
  ];

  return (
    <section className="w-full px-4 py-16 md:py-24 bg-gradient-to-br from-neutral-50 to-neutral-200">
      <div className="max-w-7xl mx-auto space-y-8">
        <h2 className="text-3xl md:text-5xl font-bold text-center">
          Our Customers
        </h2>
        <p className="text-center text-lg text-neutral-600">
          We value our customers and their feedback.
        </p>

        {/* Count + Carousel in same row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          {/* CountUp */}
          <div className="text-center">
            
            <p className="text-8xl font-bold text-primary">
              <CountUp from={0} to={100} duration={2} />
              <span className="text-primary"><LineShadowText className="italic" shadowColor={"black"}>+</LineShadowText></span>
            </p>
            
            <p className="text-2xl mt-2 text-neutral-700 tracking-widest">Happy Customers</p>
          </div>

          {/* Carousel */}
          <div className="md:col-span-2">
            <Carousel
              plugins={[plugin.current]}
              className="w-full"
              loop
              onMouseEnter={plugin.current.stop}
              onMouseLeave={plugin.current.reset}
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index}>
                    <div className="mt-2">
                      <Card className="mt-4 px-5 py-2 border border-emerald-400 text-white bg-emerald-500/10 backdrop-blur-sm rounded-3xl text-xl hover:bg-emerald-500/20 transition-all text-center">
                        <CardContent className="p-2 space-y-2 ">
                          <p className="text-base text-neutral-700 italic tracking-widest">
                            “{testimonial.review}”
                          </p>
                          <p className="text-sm font-semibold text-primary ">
                            – {testimonial.name} –
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}
