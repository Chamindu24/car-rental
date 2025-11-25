"use client";
import {
  Navbar,
  NavBody,
  NavItems,
  MobileNav,
  NavbarButton,
  MobileNavHeader,
  MobileNavToggle,
  MobileNavMenu,
} from "@/components/ui/resizable-navbar";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Custom Logo Component for CR Cab Service
const CRCabLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-3 px-3 py-2 text-lg font-normal text-black"
    >
      <Image
        src="/vehicle.png"
        alt="CR Cab Service Logo"
        width={40}
        height={40}
        className="w-10 h-10"
      />
      <span className="font-bold text-black dark:text-white text-xl">
        <span className="hidden sm:inline">CR Cab Service</span>
        <span className="sm:hidden">CR Cab</span>
      </span>
    </Link>
  );
};

export default function CRCabNavbar() {
  const navItems = [
    {
      name: "Services",
      link: "#services",
    },
    {
      name: "About",
      link: "/about",
    },
    {
      name: "Testimonials",
      link: "/testimonials",
    },
    {
      name: "Contact",
      link: "#contact",
    },
  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Service items for mobile menu
  const serviceItems = [
    { name: "🚗 Car Rental with Driver", link: "/rent-with-driver" },
    { name: "🔑 Self-Drive Car Rental", link: "/self-drive" },
    { name: "✈️ Airport Transfers", link: "/airport-transfers" },
    { name: "🏛️ City Tours", link: "/city-tours" },
    { name: "🛣️ Long Distance Travel", link: "/long-distance" },
    { name: "💒 Wedding Transfers", link: "/wedding-transfers" },
  ];

  const aboutItems = [
    { name: "📖 Our Story", link: "/about" },
    { name: "⭐ Testimonials", link: "/testimonials" },
    { name: "✨ Why Choose Us", link: "/why-choose-us" },
  ];

  const contactItems = [
    { name: "📞 071 125 0718", link: "tel:0711250718" },
    { name: "✉️ Email Us", link: "mailto:chamarasampath200@gmail.com" },
    { name: "📍 Ranna, Sri Lanka", link: "/location" },
  ];

  return (
    <div className="relative w-full">
      <Navbar className="fixed top-0">
        {/* Desktop Navigation */}
        <NavBody className="py-2 mt-4">
          <CRCabLogo />
          <NavItems items={navItems} className="text-base font-medium" />
          <div className="flex items-center gap-4">
            <NavbarButton 
              variant="secondary"
              href="tel:0711250718"
              className="px-6 py-3 text-base font-semibold"
            >
              📞 Call Now
            </NavbarButton>
            <NavbarButton 
              variant="gradient"
              href="/book-now"
              className="px-6 py-3 text-base font-semibold"
            >
              🚗 Book Now
            </NavbarButton>
          </div>
        </NavBody>

        {/* Mobile Navigation */}
        <MobileNav>
          <MobileNavHeader>
            <CRCabLogo />
            <MobileNavToggle
              isOpen={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            />
          </MobileNavHeader>

          <MobileNavMenu
            isOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
            className="right-0 left-auto w-1/2 min-w-80"
          >
            {/* Services Section */}
            <div className="w-full ">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Services
              </h3>
              <div className="space-y-2 pr-2">
                {serviceItems.map((item, idx) => (
                  <Link
                    key={`service-${idx}`}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-1 "
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* About Section */}
            <div className="w-full ">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                About
              </h3>
              <div className="space-y-2 pr-2">
                {aboutItems.map((item, idx) => (
                  <Link
                    key={`about-${idx}`}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-1 "
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="w-full ">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                Contact
              </h3>
              <div className="space-y-2 pr-2">
                {contactItems.map((item, idx) => (
                  <a
                    key={`contact-${idx}`}
                    href={item.link}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors py-1 "
                  >
                    {item.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex w-full flex-col gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full"
                href="tel:0711250718"
              >
                📞 Call Now
              </NavbarButton>
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="dark"
                className="w-full"
                href="/book-now"
              >
                🚗 Book Now
              </NavbarButton>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}