"use client";

import { motion } from "motion/react";
import React from "react";
import { ImagesSlider } from "./ui/images-slider";

// Example image imports
import slider1 from "../public/slider1.jpg";
import slider2 from "../public/slider2.jpg";
import slider3 from "../public/slider3.jpg";
import slider4 from "../public/slider4.jpg";
import slider5 from "../public/slider5.jpg";
import slider6 from "../public/slider6.jpg";


export function ImagesSliderDemo() {
  const images = [
    slider1.src,
    slider2.src,
    slider3.src,
    slider4.src,
    slider5.src,
    slider6.src,
  ];

  return (
    <section className="w-full px-4 py-12 md:py-20 bg-gradient-to-br from-neutral-50 to-neutral-200">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left Column: Static + Slider */}
        <div className="col-span-1 space-y-6">
          {/* Static Image */}
          <div className="w-full h-60 md:h-64 overflow-hidden rounded-xl shadow-md relative">
            <img
              src={slider6.src}
              alt="Static Display"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/30" />
          </div>

          {/* Slider */}
          <div className="h-80 md:h-[24rem] rounded-xl overflow-hidden">
            <ImagesSlider className="h-full" images={images}>
              <motion.div
                initial={{ opacity: 0, y: -80 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="z-50 flex flex-col justify-center items-center px-4"
              >
                <h2 className="font-bold text-2xl md:text-4xl text-center bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-300 drop-shadow">
                  Premium Car Rentals
                </h2>
                <button className="mt-4 px-5 py-2 border border-emerald-400 text-white bg-emerald-500/10 backdrop-blur-sm rounded-full text-sm hover:bg-emerald-500/20 transition-all">
                  Book Now →
                </button>
              </motion.div>
            </ImagesSlider>
          </div>
        </div>

        {/* Right Column: Map */}
        <div className="col-span-2 bg-neutral-100 rounded-xl p-6 shadow-md">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-wider text-center text-neutral-800">
            Find CR Cab Service in Ranna
          </h2>
          <p className="text-center text-neutral-600 mb-6 text-sm md:text-base">
            Visit us at our exact location:
             Ranna, Sri Lanka
          </p>

          <div className="w-full h-108 overflow-hidden rounded-xl shadow-lg border border-neutral-300">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6335.245798030769!2d80.8715!3d6.097!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae15dc3faecf507%3A0x0!2zNsKwMDUnNDkuMSJOIDgwwrA1MicyNy41IkU!5e0!3m2!1sen!2slk!4v1719757660311!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}
