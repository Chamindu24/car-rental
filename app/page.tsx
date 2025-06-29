import Footer from "@/components/footer";
import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";
import { ScrollBasedVelocityDemo } from "@/components/ScrollBasedVelocity";
import { Scroll } from "lucide-react";
import Image from "next/image";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <HeroSection/>
      <ScrollBasedVelocityDemo/>
      <Footer/>
    </main>
      
  );
}
