import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { HoveredLink, Menu, MenuItem, ProductItem } from "./ui/navbar-menu";

function Navbar({ className }: { className?: string }) {
  const [active, setActive] = useState<string | null>(null);

  return (
    <div className={cn("fixed top-10 inset-x-0 max-w-4xl mx-auto z-50", className)}>
      <Menu setActive={setActive}>
        {/* Logo and menu items container with even distribution */}
        <div className="flex items-center justify-between w-full">
          {/* Logo */}
          <Link href="/" className="flex items-center justify-start flex-shrink-0">
            <Image
              src="/vehicle.png"
              alt="CR Cab Service Logo"
              width={40}
              height={40}
              className="mr-2"
            />
            <span className="text-xl font-bold text-gray-800 dark:text-white whitespace-nowrap">
              CR Cab Service
            </span>
          </Link>

          {/* Menu Items with equal spacing */}
          <div className="flex items-center justify-end flex-grow space-x-16 px-4">
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
        </div>
      </Menu>
    </div>
  );
}

export default Navbar;
