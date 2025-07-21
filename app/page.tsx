"use client";

import { useEffect, useState } from "react";
import CarCards from "@/components/CarCards";
import { ImagesSliderDemo } from "@/components/contact";
import Customers from "@/components/customers";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";
import { ScrollBasedVelocityDemo } from "@/components/ScrollBasedVelocity";
import WhyChooseUs from "@/components/WhyChooseUs";
import LoadingScreen from "./loading";

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <Navbar />
      <HeroSection />
      <ScrollBasedVelocityDemo />
      <CarCards />
      <WhyChooseUs />
      <Customers />
      <ImagesSliderDemo />
      <Footer />
    </main>
  );
}
