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
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Chatbot from "@/components/Chatbot";

// Custom Logo Component for CR Cab Service
const CRCabLogo = () => {
  return (
    <Link
      href="/"
      className="relative z-20 mr-4 flex items-center space-x-3 px-3 py-2 text-lg font-normal text-black"
    >
      <Image
        src="/logo3.png"
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
  const handleScroll = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const navItems = [
    {
      name: "Services",
      link: "whychoooseus",
    },
    {
      name: "About",
      link: "customers",
    },
    {
      name: "Vehicles",
      link: "/vehicles",
    },
    {
      name: "Contact",
      link: "contact",
    },
    { name: "Live Chat", link: "" },

  ];

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (!isMobileMenuOpen) return;
      const target = e.target as Node | null;
      if (mobileMenuRef.current && target && !mobileMenuRef.current.contains(target)) {
        setIsMobileMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  

  // Service items for mobile menu
  

  const aboutItems = [
    { name: "About", link: "customers" },
    { name: "Services", link: "whychoooseus" },
    { name: "Vehicles", link: "/vehicles" },
    { name: "Customers", link: "customers" },
  ];

  const contactItems = [
    { name: "📞 071 125 0718", link: "tel:0711250718" },
    { name: "✉️ Email Us", link: "mailto:chamarasampath200@gmail.com" },
    { name: "📍 Ranna, Sri Lanka", link: "/location" },
  ];

  return (
    <div className="relative w-full">
      <Chatbot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
      <Navbar className="fixed top-0 ">
        {/* Desktop Navigation */}
        <NavBody className="py-2 mt-4  ">
          <CRCabLogo />
          <div className="flex gap-8 text-base font-medium text-gray-600 dark:text-gray-300 mr-14">
            {navItems.map((item, idx) => {
              const commonClasses = "relative inline-block cursor-pointer px-2 py-0.5 text-gray-600 dark:text-gray-300 font-medium before:absolute before:bottom-0 before:left-0 before:h-[1px] before:w-0 before:bg-gray-700 dark:before:bg-gray-300 before:transition-all before:duration-300 hover:before:w-full transform transition-transform duration-300 hover:scale-105";
              // Special-case chat-like items to open chatbot modal
              const lower = item.name.toLowerCase();
              if (lower.includes("ask") || lower.includes("chat")) {
                return (
                  <button
                    key={idx}
                    onClick={() => setIsChatOpen(true)}
                    className={`${commonClasses}`}
                  >
                    {item.name}
                  </button>
                );
              }

              return item.link.startsWith("/") ? (
                <Link
                  key={idx}
                  href={item.link}
                  className={`${commonClasses}`}
                >
                  {item.name}
                </Link>
              ) : (
                <span
                  key={idx}
                  onClick={() => handleScroll(item.link)}
                  className={`${commonClasses}`}
                >
                  {item.name}
                </span>
              );
            })}
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
            className="right-0 left-auto w-1/2 min-w-[250px] max-w-xs"
          >
            <div ref={mobileMenuRef}>
            {/* Services Section */}
            <div className="w-full ml-8 ">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white ">
                Services
              </h3>
              
            </div>

            {/* About Section */}
            <div className="w-full ml-8 mb-4 ">
              
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
            <div className="w-full  ml-8">
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
            <div className="flex w-full flex-col gap-3 ml-6 sm:ml-10 pt-4 border-t border-gray-200 dark:border-gray-700 ">
              <NavbarButton
                onClick={() => setIsMobileMenuOpen(false)}
                variant="secondary"
                className="w-full mx-auto"
                href="tel:0711250718"
              >
               Call Now
              </NavbarButton>
              
              <NavbarButton
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsChatOpen(true);
                }}
                variant="dark"
                className="w-full mx-auto"
              >
                Live Chat
              </NavbarButton>
            </div>
            </div>
          </MobileNavMenu>
        </MobileNav>
      </Navbar>
    </div>
  );
}