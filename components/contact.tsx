"use client";

import { motion } from "motion/react";
import React, { useState, useEffect } from "react";
import { ImagesSlider } from "./ui/images-slider";

// Example image imports
import slider1 from "../public/slider1.jpg";
import slider2 from "../public/slider2.jpg";
import slider3 from "../public/slider3.jpg";
import slider4 from "../public/slider4.jpg";
import slider5 from "../public/slider5.jpg";
import slider6 from "../public/slider6.jpg";


export function ImagesSliderDemo() {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowModal(false); };
    if (showModal) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showModal]);

  const lat = 6.097;
  const lng = 80.8715;
  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  const images = [
    slider1.src,
    slider2.src,
    slider3.src,
    slider4.src,
    slider5.src,
    slider6.src,
  ];

  return (
    <>
    <section className="w-full px-4 py-12 md:py-20 bg-gradient-to-br from-neutral-50 to-neutral-50">
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

            <div className="w-full h-108 overflow-hidden rounded-xl shadow-lg border border-neutral-300 relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6335.245798030769!2d80.8715!3d6.097!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae15dc3faecf507%3A0x0!2zNsKwMDUnNDkuMSJOIDgwwrA1MicyNy41IkU!5e0!3m2!1sen!2slk!4v1719757660311!5m2!1sen!2slk"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            {/* View larger map button */}
              <div className="absolute bottom-3 right-3">
                <button
                  type="button"
                  aria-label="Open larger map"
                  className="px-4 py-2 bg-gradient-to-r from-emerald-400 to-emerald-500 text-white font-stretch-90% rounded-full shadow-xl hover:shadow-2xl hover:scale-105 transform transition duration-200 ease-out ring-4 ring-emerald-300/30"
                  onClick={() => setShowModal(true)}
                >
                  View Larger Map →
                </button>
              </div>
          </div>
        </div>
      </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
            style={{ backdropFilter: "blur(6px)" }}
            onClick={() => setShowModal(false)}
          />
          <div className="relative w-full max-w-5xl h-[85vh] bg-white/90 rounded-lg overflow-hidden shadow-lg">
            <button
              aria-label="Close map"
              className="absolute top-3 right-3 z-30 bg-red-500 text-white rounded-full px-2 py-1shadow"
              onClick={() => setShowModal(false)}
            >
              X
            </button>
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      )}
    </>
  );
}

// Modal state (kept outside of the component return to avoid redeclaring on each render)
function useMapModal() {
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setShowModal(false);
    };
    if (showModal) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [showModal]);
  return { showModal, setShowModal };
}

export default function ContactWithMapModal() {
  // coordinates for the location
  const lat = 6.097;
  const lng = 80.8715;
  const { showModal, setShowModal } = useMapModal();

  const embedUrl = `https://maps.google.com/maps?q=${lat},${lng}&z=15&output=embed`;

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={() => setShowModal(false)} />
      <div className="relative w-full max-w-4xl h-[80vh] bg-white rounded-lg overflow-hidden shadow-lg">
        <button
          aria-label="Close map"
          className="absolute top-3 right-3 z-30 bg-white rounded-full p-2 shadow"
          onClick={() => setShowModal(false)}
        >
          Close
        </button>
        <iframe
          src={embedUrl}
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}
