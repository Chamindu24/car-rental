"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { Phone, Mail, MapPin, Car } from "lucide-react";
import { motion } from "framer-motion";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);

  // Add scroll effect
  if (typeof window !== "undefined") {
    window.addEventListener("scroll", () => {
      setIsScrolled(window.scrollY > 10);
    });
  }

  return (
    <div className={cn(
      "fixed top-0 inset-x-0 max-w-6xl mx-auto z-50 transition-all duration-300",
      isScrolled ? "py-2" : "py-4",
      className
    )}>
      <Menu setActive={setActive}>
        <div className="flex items-center justify-between w-full px-4 md:px-6">
          {/* Logo with hover effect */}
          <Link 
            href="/" 
            className="flex items-center justify-start flex-shrink-0 group"
          >
            <div className="relative">
              <Image
                src="/vehicle.png"
                alt="CR Cab Service Logo"
                width={isScrolled ? 36 : 40}
                height={isScrolled ? 36 : 40}
                className="mr-2 transition-all duration-300 group-hover:rotate-[-10deg]"
              />
              <motion.span
                className="absolute -top-1 -right-1 bg-yellow-400 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ repeat: Infinity, duration: 2 }}
              >
                {isScrolled ? "🚕" : "🚗"}
              </motion.span>
            </div>
            <span className={cn(
              "text-2xl font-bold whitespace-nowrap transition-all duration-300",
              isScrolled ? "text-gray-800 text-lg" : "text-gray-800",
              "group-hover:text-yellow-800"
            )}>
              CR <span className="text-yellow-900">Cab</span> Service
            </span>
          </Link>

          {/* Menu Items */}
          <div className="flex items-center justify-end flex-grow space-x-6 lg:space-x-10 px-4">
            <MenuItem setActive={setActive} active={active} item="Services">
              <div className="grid grid-cols-2 gap-4 p-4 text-sm min-w-[400px]">
                <HoveredLink 
                  href="/rent-with-driver" 
                  className="hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 pl-3 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Car className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Car Rental with Driver</h3>
                      <p className="text-xs text-gray-500">Professional chauffeur service</p>
                    </div>
                  </div>
                </HoveredLink>
                
                <HoveredLink 
                  href="/self-drive" 
                  className="hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 pl-3 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Car className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Self-Drive Rental</h3>
                      <p className="text-xs text-gray-500">Freedom to explore</p>
                    </div>
                  </div>
                </HoveredLink>
                
                <HoveredLink 
                  href="/airport-transfers" 
                  className="hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 pl-3 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Car className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Airport Transfers</h3>
                      <p className="text-xs text-gray-500">On-time pickups</p>
                    </div>
                  </div>
                </HoveredLink>
                
                <HoveredLink 
                  href="/city-tours" 
                  className="hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 pl-3 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Car className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">City Tours</h3>
                      <p className="text-xs text-gray-500">Guided experiences</p>
                    </div>
                  </div>
                </HoveredLink>
                
                <HoveredLink 
                  href="/long-distance" 
                  className="hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 pl-3 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Car className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Long Distance</h3>
                      <p className="text-xs text-gray-500">Comfortable journeys</p>
                    </div>
                  </div>
                </HoveredLink>
                
                <HoveredLink 
                  href="/wedding-transfers" 
                  className="hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 pl-3 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Car className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Wedding Transfers</h3>
                      <p className="text-xs text-gray-500">Luxury for your special day</p>
                    </div>
                  </div>
                </HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="About">
              <div className="flex flex-col space-y-4 p-4 text-sm min-w-[250px]">
                <HoveredLink 
                  href="/about" 
                  className="hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 pl-3 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <span className="text-yellow-600">📖</span>
                    </div>
                    <h3 className="font-medium">Our Story</h3>
                  </div>
                </HoveredLink>
                
                <HoveredLink 
                  href="/testimonials" 
                  className="hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 pl-3 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <span className="text-yellow-600">🌟</span>
                    </div>
                    <h3 className="font-medium">Testimonials</h3>
                  </div>
                </HoveredLink>
                
                <HoveredLink 
                  href="/why-choose-us" 
                  className="hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 pl-3 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <span className="text-yellow-600">✅</span>
                    </div>
                    <h3 className="font-medium">Why Choose Us</h3>
                  </div>
                </HoveredLink>
              </div>
            </MenuItem>

            <MenuItem setActive={setActive} active={active} item="Contact">
              <div className="flex flex-col space-y-4 p-4 text-sm min-w-[250px]">
                <HoveredLink 
                  href="tel:0711250718" 
                  className="hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 pl-3 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Phone className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">071 125 0718</h3>
                      <p className="text-xs text-gray-500">24/7 Available</p>
                    </div>
                  </div>
                </HoveredLink>
                
                <HoveredLink 
                  href="mailto:chamarasampath200@gmail.com" 
                  className="hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 pl-3 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <Mail className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Email Us</h3>
                      <p className="text-xs text-gray-500">Quick response</p>
                    </div>
                  </div>
                </HoveredLink>
                
                <HoveredLink 
                  href="/location" 
                  className="hover:bg-yellow-50 hover:border-l-4 hover:border-yellow-400 pl-3 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-100 rounded-full">
                      <MapPin className="w-4 h-4 text-yellow-600" />
                    </div>
                    <div>
                      <h3 className="font-medium">Ranna, Sri Lanka</h3>
                      <p className="text-xs text-gray-500">Our location</p>
                    </div>
                  </div>
                </HoveredLink>
                
                <HoveredLink 
                  href="/book-now" 
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium rounded-md p-3 transition-all flex items-center justify-center gap-2 mt-2"
                >
                  <Car className="w-4 h-4" />
                  <span>Book Now</span>
                </HoveredLink>
              </div>
            </MenuItem>
          </div>
        </div>
      </Menu>
    </div>
  );
}

export default Navbar;