"use client";

import React from "react";
import { CheckCircle, ShieldCheck, Clock, Car } from "lucide-react";
import { HoverEffect } from "./ui/card-hover-effect";

const features = [
  {
    title: "Reliable Vehicles",
    description: "All our vehicles are well-maintained and regularly serviced.",
    icon: <Car className="w-24 h-24 text-green-500 transition-transform duration-600 group-hover:scale-120"  />,
  },
  {
    title: "24/7 Support",
    description: "Our support team is here to help you anytime, anywhere.",
    icon: <Clock className="w-24 h-24 text-blue-500 transition-transform duration-600 group-hover:scale-120" />,
  },
  {
    title: "Affordable Rates",
    description: "Enjoy competitive pricing without compromising on quality.",
    icon: <CheckCircle className="w-24 h-24 text-yellow-500 transition-transform duration-600 group-hover:scale-120" />,
  },
  {
    title: "Secure & Safe",
    description: "We prioritize safety with insured and roadworthy vehicles.",
    icon: <ShieldCheck className="w-24 h-24 text-red-500 transition-transform duration-600 group-hover:scale-120" />,
  },
];

const WhyChooseUs = () => {
  return (
    <section 
    id="whychoooseus"
    className="py-16 bg-white dark:bg-neutral-900">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Why Choose CR Cab Service?
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-12">
          We're dedicated to providing an exceptional car rental experience for every customer.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className=" group dark:bg-neutral-800 p-6 rounded-xl  transition duration-300"
            >
              <div className="flex justify-center mb-4">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
