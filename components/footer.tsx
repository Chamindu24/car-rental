import { Mail, MapPin, Phone } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-neutral-900 text-white py-12 px-6 md:px-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Left: Brand */}
        <div>
          <h2 className="text-2xl font-bold">CR Cab Service & Rent Car</h2>
          <p className="mt-2 text-neutral-400 italic">
            Rent A Car <br />
            With or Without Driver
          </p>
          <span className="mt-4 inline-block bg-green-600 text-white text-xs font-medium px-3 py-1 rounded-full">
            Always Open
          </span>
        </div>

        {/* Middle: Contact */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Contact Us</h3>
          <ul className="space-y-3 text-neutral-300">
            <li className="flex items-center gap-3">
              <Phone className="w-5 h-5 text-primary" />
              <a href="tel:0711250718" className="hover:underline">
                071 125 0718
              </a>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-5 h-5 text-primary" />
              <a
                href="mailto:chamarasampath200@gmail.com"
                className="hover:underline"
              >
                chamarasampath200@gmail.com
              </a>
            </li>
          </ul>
        </div>

        {/* Right: Location */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Location</h3>
          <ul className="space-y-3 text-neutral-300">
            <li className="flex items-center gap-3">
              <MapPin className="w-5 h-5 text-primary" />
              <span>Ranna, Sri Lanka</span>
            </li>
            <li>
              <Link
                href="https://g.co/kgs/rUDYV6f"
                target="_blank"
                className="text-sm underline text-primary hover:text-secondary"
              >
                View on Google Maps
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-10 text-center text-sm text-neutral-500">
        © {new Date().getFullYear()} CR Cab Service. All rights reserved.
      </div>
    </footer>
  );
}
