import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";
import { Menu as MenuIcon, X } from "lucide-react";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActive(null); // Close any active desktop menus
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
    setActive(null);
  };

  return (
    <>
      {/* Desktop/Tablet Navbar */}
      <div className={cn("fixed top-2 sm:top-4 md:top-10 inset-x-0 max-w-xs sm:max-w-2xl md:max-w-4xl mx-auto z-50 px-2 sm:px-4", className)}>
        <Menu setActive={setActive}>
          {/* Main container with responsive layout */}
          <div className="flex items-center justify-between w-full">
            {/* Logo - responsive sizing */}
            <Link href="/" className="flex items-center justify-start flex-shrink-0" onClick={closeMobileMenu}>
              <Image
                src="/vehicle.png"
                alt="CR Cab Service Logo"
                width={32}
                height={32}
                className="mr-1 sm:mr-2 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
              />
              <span className="text-sm sm:text-lg md:text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap">
                <span className="hidden sm:inline">CR Cab Service</span>
                <span className="sm:hidden">CR Cab</span>
              </span>
            </Link>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2 text-gray-800 dark:text-white"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={20} /> : <MenuIcon size={20} />}
            </button>

            {/* Desktop Menu Items - hidden on mobile */}
            <div className="hidden md:flex items-center justify-end flex-grow space-x-8 lg:space-x-16 px-4">
              <MenuItem setActive={setActive} active={active} item="Services">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="/rent-with-driver">Car Rental with Driver</HoveredLink>
                  <HoveredLink href="/self-drive">Self-Drive Car Rental</HoveredLink>
                  <HoveredLink href="/airport-transfers">Airport Transfers</HoveredLink>
                  <HoveredLink href="/city-tours">City Tours</HoveredLink>
                  <HoveredLink href="/long-distance">Long Distance Travel</HoveredLink>
                  <HoveredLink href="/wedding-transfers">Wedding Transfers</HoveredLink>
                </div>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="About">
                <div className="flex flex-col space-y-4 text-sm p-4">
                  <HoveredLink href="/about">Our Story</HoveredLink>
                  <HoveredLink href="/testimonials">Testimonials</HoveredLink>
                  <HoveredLink href="/why-choose-us">Why Choose Us</HoveredLink>
                </div>
              </MenuItem>

              <MenuItem setActive={setActive} active={active} item="Contact">
                <div className="flex flex-col space-y-4 text-sm">
                  <HoveredLink href="tel:0711250718">📞 071 125 0718</HoveredLink>
                  <HoveredLink href="mailto:chamarasampath200@gmail.com">✉️ Email Us</HoveredLink>
                  <HoveredLink href="/location">📍 Ranna, Sri Lanka</HoveredLink>
                  <HoveredLink href="/book-now">🚗 Book Now</HoveredLink>
                </div>
              </MenuItem>
            </div>

            {/* Tablet Menu - visible on sm and md screens */}
            <div className="hidden sm:flex md:hidden items-center justify-end flex-grow space-x-4 px-2">
              <MenuItem setActive={setActive} active={active} item="Menu">
                <div className="grid grid-cols-1 gap-4 text-sm p-4 max-w-xs">
                  {/* Services */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Services</h4>
                    <div className="space-y-2">
                      <HoveredLink href="/rent-with-driver" className="text-xs">Car Rental with Driver</HoveredLink>
                      <HoveredLink href="/self-drive" className="text-xs">Self-Drive Rental</HoveredLink>
                      <HoveredLink href="/airport-transfers" className="text-xs">Airport Transfers</HoveredLink>
                    </div>
                  </div>
                  {/* Quick Links */}
                  <div>
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">Quick Links</h4>
                    <div className="space-y-2">
                      <HoveredLink href="/about" className="text-xs">About Us</HoveredLink>
                      <HoveredLink href="tel:0711250718" className="text-xs">📞 Call Now</HoveredLink>
                      <HoveredLink href="/book-now" className="text-xs">🚗 Book Now</HoveredLink>
                    </div>
                  </div>
                </div>
              </MenuItem>
            </div>
          </div>
        </Menu>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Menu Panel */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out md:hidden",
        isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          {/* Mobile Menu Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center">
              <Image
                src="/vehicle.png"
                alt="CR Cab Service Logo"
                width={32}
                height={32}
                className="mr-2"
              />
              <span className="text-lg font-bold text-gray-800 dark:text-white">
                CR Cab Service
              </span>
            </div>
            <button
              onClick={closeMobileMenu}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <X size={20} />
            </button>
          </div>

          {/* Mobile Menu Content */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-6">
              {/* Services Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Services</h3>
                <div className="space-y-3 pl-2">
                  <Link href="/rent-with-driver" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>
                    🚗 Car Rental with Driver
                  </Link>
                  <Link href="/self-drive" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>
                    🔑 Self-Drive Car Rental
                  </Link>
                  <Link href="/airport-transfers" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>
                    ✈️ Airport Transfers
                  </Link>
                  <Link href="/city-tours" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>
                    🏛️ City Tours
                  </Link>
                  <Link href="/long-distance" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>
                    🛣️ Long Distance Travel
                  </Link>
                  <Link href="/wedding-transfers" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>
                    💒 Wedding Transfers
                  </Link>
                </div>
              </div>

              {/* About Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">About</h3>
                <div className="space-y-3 pl-2">
                  <Link href="/about" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>
                    📖 Our Story
                  </Link>
                  <Link href="/testimonials" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>
                    ⭐ Testimonials
                  </Link>
                  <Link href="/why-choose-us" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>
                    ✨ Why Choose Us
                  </Link>
                </div>
              </div>

              {/* Contact Section */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">Contact</h3>
                <div className="space-y-3 pl-2">
                  <a href="tel:0711250718" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>
                    📞 071 125 0718
                  </a>
                  <a href="mailto:chamarasampath200@gmail.com" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>
                    ✉️ Email Us
                  </a>
                  <Link href="/location" className="block text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors" onClick={closeMobileMenu}>
                    📍 Ranna, Sri Lanka
                  </Link>
                </div>
              </div>
            </nav>
          </div>

          {/* Mobile Menu Footer */}
          <div className="p-4 border-t border-gray-200 dark:border-gray-700">
            <Link 
              href="/book-now"
              className="block w-full bg-gradient-to-r from-gray-800 to-gray-600 text-white text-center py-3 px-4 rounded-lg font-medium hover:from-gray-700 hover:to-gray-500 transition-colors"
              onClick={closeMobileMenu}
            >
              🚗 Book Now
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;