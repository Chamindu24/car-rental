import {
  Mail,
  MapPin,
  Phone,
  Car,
  Clock,
  Shield,
  Star,
  Facebook,
  Instagram,
  Twitter,
} from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white">
      {/* Main Footer Content */}
      <div className="py-10 px-6 sm:px-8 md:px-12">
        <div className="max-w-7xl mx-auto space-y-12">
          {/* Top Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {/* Brand Section */}
            <div className="sm:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 p-2 rounded-lg">
                  <Car className="w-6 h-6 text-black" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-yellow-300 to-yellow-200 bg-clip-text text-transparent">
                  C R CAB SERVICE
                </h2>
              </div>
              <p className="text-lg sm:text-xl text-neutral-300 mb-2">
                Rent A Car & Premium Transportation
              </p>
                <p className="text-neutral-400 mb-6 leading-relaxed text-sm sm:text-base max-w-2/3">
                Professional car rental services with or without driver. Experience comfort, reliability, and excellent service for all your transportation needs in Sri Lanka.
                </p>

              {/* Status Badge */}
              <div className="flex flex-wrap gap-3 mb-6">
                <span className="inline-flex items-center gap-2 bg-yellow-300 text-black text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                  <Clock className="w-4 h-4" />
                  24/7 Available
                </span>
                <span className="inline-flex items-center gap-2 bg-yellow-800 text-white text-sm font-semibold px-4 py-2 rounded-full shadow-lg">
                  <Shield className="w-4 h-4" />
                  Fully Insured
                </span>
              </div>

              {/* Social Media */}
              <div className="flex gap-4">
                <a
                  href="#"
                  className="bg-neutral-700 hover:bg-yellow-300 hover:text-black p-3 rounded-full transition-colors duration-300"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-neutral-700 hover:bg-yellow-300 hover:text-black p-3 rounded-full transition-colors duration-300"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="bg-neutral-700 hover:bg-yellow-300 hover:text-black p-3 rounded-full transition-colors duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Services Section */}
            <div>
              <h3 className="text-lg font-bold mb-6">Our Services</h3>
              <ul className="space-y-3 text-sm">
                {[
                  "Car Rental with Driver",
                  "Self-Drive Car Rental",
                  "Airport Transfers",
                  "City Tours",
                  "Long Distance Travel",
                  "Wedding Transfers",
                ].map((service, index) => (
                  <li key={index}>
                    <Link
                      href="#"
                      className="text-neutral-300 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <Star className="w-4 h-4 text-yellow-500 transition-transform duration-200 group-hover:scale-125" />
                      {service}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-lg font-bold mb-6">Get In Touch</h3>
              <ul className="space-y-4 text-sm">
                <li>
                  <a
                    href="tel:0711250718"
                    className="flex items-start gap-3 text-neutral-300 hover:text-white transition-colors duration-300 group"
                  >
                    <div className="bg-neutral-700 group-hover:bg-yellow-400 p-2 rounded-lg hover:text-black">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Call Us</p>
                      <p>071 125 0718</p>
                    </div>
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:chamarasampath200@gmail.com"
                    className="flex items-start gap-3 text-neutral-300 hover:text-white transition-colors duration-300 group"
                  >
                    <div className="bg-neutral-700 group-hover:bg-yellow-400 p-2 rounded-lg hover:text-black">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-medium">Email Us</p>
                      <p>chamarasampath200@gmail.com</p>
                    </div>
                  </a>
                </li>
                <li className="flex items-start gap-3 text-neutral-300">
                  <div className="bg-neutral-700 p-2 rounded-lg">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="font-medium">Location</p>
                    <p>Ranna, Sri Lanka</p>
                  </div>
                </li>
              </ul>

              <Link
                href="https://g.co/kgs/rUDYV6f"
                target="_blank"
                className="block mt-4 text-yellow-200 hover:text-yellow-400 transition-colors duration-300 text-sm font-medium"
              >
                <span className="inline-flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  View on Google Maps
                </span>
              </Link>

              <Link
                href="/SignUp"
                className="block mt-2 text-yellow-200 hover:text-yellow-400 transition-colors duration-300 text-sm font-medium"
              >
                <span className="inline-flex items-center gap-2">
                  <Shield className="w-4 h-4" />
                  Admin Login
                </span>
              </Link>
            </div>

            
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-neutral-950 py-6 px-6 md:px-12">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-6 text-center sm:text-left">
          <div className="text-neutral-400 text-sm">
            © {new Date().getFullYear()} CR Cab Service & Rent Car. All rights reserved.
          </div>
          <div className="flex flex-wrap justify-center sm:justify-end gap-4 text-sm">
            <Link href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">
              Terms of Service
            </Link>
            <Link href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
