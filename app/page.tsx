import CarCards from "@/components/CarCards";
import { ImagesSliderDemo } from "@/components/contact";
import Customers from "@/components/customers";
import Footer from "@/components/footer";
import HeroSection from "@/components/hero";
import Navbar from "@/components/navbar";
import { ScrollBasedVelocityDemo } from "@/components/ScrollBasedVelocity";
import WhyChooseUs from "@/components/WhyChooseUs";



export default async function Home() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return (
    
    <main>
      <Navbar/>
      <HeroSection/>
      <ScrollBasedVelocityDemo/>
      <CarCards/>
      <WhyChooseUs />
      <Customers/>
      <ImagesSliderDemo/>
      <Footer/>
    </main>
      
  );
}
