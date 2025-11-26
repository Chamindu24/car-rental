"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Users, AirVent, Fuel, Wrench, Car, Tag, Calendar, Clock, DollarSign, Info, ShieldCheck, Lock, CreditCard } from 'lucide-react';
import type { Vehicle } from '@/types/vehicle';
import { IconBrandWhatsapp } from '@tabler/icons-react';

// --- Type Definitions ---
type VehicleWithImages = Vehicle & { images?: string[]; createdAt?: string | Date };

interface Props {
  vehicle: VehicleWithImages;
}

// --- Spec Item Component (Minimalist Card) ---
function SpecItem({ icon: Icon, label, value, unit }: { icon?: any; label: string; value: any; unit?: string }) {
  return (
    <div className="flex flex-col items-start gap-1 p-3 bg-white/70 backdrop-blur-sm rounded-lg border border-gray-100 transition-shadow duration-300 hover:shadow-md">
      <div className="flex items-center gap-2 text-xs">
        {Icon ? <Icon className="w-4 h-4 text-slate-500" /> : null}
        <span className="font-medium text-gray-500 uppercase tracking-wider">{label}</span>
      </div>
      <div className="text-lg font-bold text-slate-800">{value}{unit ? ` ${unit}` : ''}</div>
    </div>
  );
}

// --- Feature Map ---
const featureMap = [
  { key: 'seats', label: 'Seats', icon: Users, unit: '' },
  { key: 'hasAC', label: 'A/C', icon: AirVent, format: (v: any) => (v ? 'Yes' : 'No') },
  { key: 'transmission', label: 'Transmission', icon: Wrench, unit: '' },
  { key: 'fuelType', label: 'Fuel Type', icon: Fuel, unit: '' },
  { key: 'type', label: 'Category', icon: Car, format: (v: string) => v.charAt(0).toUpperCase() + v.slice(1) },
];

// --- Main Component ---
export default function VehicleDetail({ vehicle }: Props) {
  const images: string[] = vehicle.images && vehicle.images.length ? vehicle.images : vehicle.image ? [vehicle.image] : [];
  const [selected, setSelected] = useState<number>(0);
  
  // State for Rental Date/Time
  const [rentalDate, setRentalDate] = useState<string>(() => new Date().toISOString().slice(0, 10));
  const [rentalTime, setRentalTime] = useState<string>(() => new Date().toTimeString().slice(0, 5));
  // Rental duration (days) + subtle price bump animation when changed
  const [days, setDays] = useState<number>(1);
  const [priceBump, setPriceBump] = useState<boolean>(false);

  const mainImage = images[selected] ?? vehicle.image ?? '/placeholder.png';
  const rawPrice = vehicle.price;
  const parsedPrice = (() => {
      let n: number = NaN;

      if (typeof rawPrice === "number") {
        n = rawPrice;
      } else if (typeof rawPrice === "string") {
        const cleaned = rawPrice.replace(/[^0-9.]/g, "");
        n = parseFloat(cleaned);
      }

      if (!Number.isFinite(n)) return NaN;

      // FIX: convert thousands value to real value
      if (n < 1000) return n * 10000;

      return n;
    })();
  const isPriceNumeric = Number.isFinite(parsedPrice);
  const priceNumber = isPriceNumeric ? parsedPrice : NaN;
  const priceDisplay = isPriceNumeric
    ? ((): string => {
        const opts: Intl.NumberFormatOptions = Number.isInteger(priceNumber) ? { minimumFractionDigits: 0 } : { minimumFractionDigits: 2 };
        return `Rs ${priceNumber.toLocaleString('en-LK', opts)}`;
      })()
    : (rawPrice ? String(rawPrice) : 'P.O.A');
  const totalDisplay = isPriceNumeric
    ? ((): string => {
        const total = priceNumber * days;
        const opts: Intl.NumberFormatOptions = Number.isInteger(total) ? { minimumFractionDigits: 0 } : { minimumFractionDigits: 2 };
        return `Rs ${total.toLocaleString('en-LK', opts)}`;
      })()
    : (rawPrice ? `${String(rawPrice)} x ${days}` : 'P.O.A');
  const available = vehicle.available ?? true;
  
  const handleRentNow = () => {
    const phone = '94719278827'; 
    const name = vehicle.name || 'Vehicle';
    const brand = vehicle.brand || 'Luxury';
    const price = vehicle.price || 'Not specified';
    const seats = vehicle.seats ?? 'N/A';
    const transmission = vehicle.transmission || 'N/A';
    const date = rentalDate || 'Not specified';
    const time = rentalTime || 'Not specified';
    
      const durationText = `${days} day${days > 1 ? 's' : ''}`;
      const totalText = isPriceNumeric ? totalDisplay : (String(price) || 'Not specified');

      const msg = `Hello, I'm interested in renting the *${brand} ${name}*.\n\nKey Details:\n- Price: ${price}\n- Duration: ${durationText}\n- Total: ${totalText}\n- Pickup Date/Time: ${date} at ${time}\n- Transmission: ${transmission}\n\nPlease let me know the full process to confirm the booking. Thank you.`;
    
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  // --- Scrolling/Sticky Logic ---
  const headerRef = useRef<HTMLDivElement>(null);
  const [isHeaderSticky, setIsHeaderSticky] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Intersecting is false when the header leaves the viewport at the top
        setIsHeaderSticky(!entry.isIntersecting);
      },
      {
        rootMargin: '-1px 0px 0px 0px', // Trigger 1px before hitting the top
        threshold: 0,
      }
    );

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    return () => {
      if (headerRef.current) {
        observer.unobserve(headerRef.current);
      }
    };
  }, []);

  // Brief visual bump when price/total changes (days change)
  useEffect(() => {
    if (!vehicle.price) return;
    setPriceBump(true);
    const t = setTimeout(() => setPriceBump(false), 220);
    return () => clearTimeout(t);
  }, [days, vehicle.price]);

  // --- Vehicle Overview Specs (Small strip below image) ---
  const overviewSpecs = featureMap.slice(0, 4).map(feature => {
      const raw = (vehicle as any)[feature.key];
      const value = (feature as any).format ? (feature as any).format(raw) : (raw === undefined || raw === null || raw === '' ? 'N/A' : String(raw));
      return (
          <div key={feature.key} className="flex items-center gap-2 text-gray-700">
              <feature.icon className="w-5 h-5 text-emerald-500" />
              <span className="font-medium">{value}</span>
              <span className="text-xs text-gray-500">{feature.label}</span>
          </div>
      );
  });

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <div className="max-w-7xl mx-auto pt-6 pb-12 px-4 sm:px-6 lg:px-8">

        {/* --- Header & Sticky Placeholder --- */}
        <div ref={headerRef} className="pt-2">
          <div className="flex items-center justify-between gap-6 pr-32">
            <div className="flex items-baseline gap-6">
              <h1 className="text-4xl lg:text-5xl font-extrabold capitalize text-slate-900 mb-0 leading-tight">{vehicle.name}</h1>
              <p className="text-lg text-slate-500 font-light capitalize">{vehicle.brand} • {vehicle.type}</p>
            </div>
            <Badge variant={available ? 'default' : 'destructive'} className="text-sm font-semibold px-3 py-1 bg-green-500/10 text-green-700 border-green-700/50">
              {available ? 'Available Now' : 'Booked'}
            </Badge>
          </div>
          <div className="pt-3 border-b border-gray-100" />
        </div>

        {/* Sticky Header for Booking (Appears on scroll) */}
        <div className={`fixed top-0 left-0 right-0 hidden sm:flex z-40 bg-white/95 backdrop-blur-md shadow-lg transition-transform duration-300 ${isHeaderSticky ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            {/* Left corner - brand / name */}
            <div className="flex items-center gap-4">
              <h2 className="text-lg sm:text-2xl font-bold tracking-widest truncate">
          {vehicle.brand} {vehicle.name}
              </h2>
            </div>

            {/* Right corner - quick reserve button */}
            <div className="flex items-center">
              <Button
          className="bg-emerald-600 hover:bg-emerald-700 text-white transition duration-300"
          onClick={handleRentNow}
          disabled={!available}
              >
          <Calendar className="w-4 h-4 mr-2" /> Quick Reserve
              </Button>
            </div>
          </div>
        </div>
        

        {/* --- Main Grid Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-y-20 mt-8">
          
          {/* Main Content (Image & Descriptions) - Takes 8/12 columns on large screens */}
          <div className="lg:col-span-8 space-y-10 lg:space-y-14">
            
            {/* Image Gallery */}
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-emerald-100 bg-gray-50">
              <div className="relative">
                <img
                  src={mainImage}
                  alt={vehicle.name}
                  className="w-full h-[320px] sm:h-[420px] lg:h-[580px] object-cover transition-transform duration-700 ease-in-out"
                />
                
                {/* Image Overlay Badge */}
                <div className="absolute left-6 top-6">
                    <Badge className="text-sm font-semibold px-4 py-2 bg-slate-800/80 text-white rounded-full">
                        {vehicle.brand}
                    </Badge>
                </div>

              </div>
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex gap-4 overflow-x-auto pb-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`flex-shrink-0 w-20 sm:w-28 h-16 sm:h-20 rounded-xl overflow-hidden border-2 ${i === selected ? 'border-emerald-500 shadow-md' : 'border-gray-200'} transform transition-all duration-200 hover:opacity-80`}
                    aria-label={`Show image ${i + 1}`}
                  >
                    <img src={src || '/placeholder.png'} alt={`${vehicle.name} view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Overview Specs Strip */}
            <div className="grid grid-cols-2 sm:flex sm:justify-around items-center py-4 px-4 sm:px-6 bg-emerald-50/70 rounded-xl border border-emerald-100 gap-3">
              {overviewSpecs}
            </div>

            {/* Description Section */}
            <section className="pt-4">
              <h2 className="text-3xl font-bold text-slate-800 mb-4 border-b pb-2 flex items-center gap-2">
                <Info className="w-6 h-6 text-emerald-600" /> Vehicle Overview
              </h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                This <strong className="font-bold">{vehicle.brand}</strong> <strong className="font-bold">{vehicle.name}</strong> is a premier rental choice, combining performance with unparalleled comfort. Featuring a reliable <strong className="font-bold">{vehicle.transmission}</strong> drivetrain and efficient <strong className="font-bold">{vehicle.fuelType}</strong> economy. It is ideally suited for both long-distance travel and city exploration.
                <br /><br />
                The vehicle is equipped with modern safety features and luxury amenities to ensure a smooth, enjoyable journey from start to finish. Contact us immediately to check detailed availability for your preferred dates.
              </p>
            </section>
            
            
            
          </div>

            {/* Booking/Call-to-Action Panel - modern, responsive */}
            <aside className="lg:col-span-4 space-y-4 lg:space-y-12 w-full order-last lg:order-none">
              <div className="bg-white p-4 sm:p-6 lg:p-8 rounded-2xl shadow-xl border border-gray-100 lg:sticky lg:top-20">

                {/* Top: Price, label, availability */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <p className="text-sm text-slate-500 font-semibold">Daily Rental</p>
                    <div className="flex items-baseline gap-3">
                      <DollarSign className="w-5 h-5 text-emerald-600" />
                      <span className={`text-3xl sm:text-4xl lg:text-4xl font-extrabold text-slate-900 transition-transform ${priceBump ? 'scale-105' : 'scale-100'}`}>{priceDisplay}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2">
                    <Badge variant={available ? 'default' : 'destructive'} className={`text-sm font-semibold px-3 py-1 ${available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {available ? 'Ready to Book' : 'Fully Booked'}
                    </Badge>
                  </div>
                </div>

                {/* Duration selector + Date/Time */}
                <div className="mb-4">
                  <label className="text-sm font-medium text-slate-700">Duration (days)</label>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      onClick={() => setDays(d => Math.max(1, d - 1))}
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-lg hover:bg-gray-50"
                      aria-label="Decrease days"
                    >
                      –
                    </button>
                    <div className="px-4 py-2 rounded-lg border border-gray-200 min-w-[64px] text-center font-medium">{days}</div>
                    <button
                      onClick={() => setDays(d => Math.min(30, d + 1))}
                      className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-lg hover:bg-gray-50"
                      aria-label="Increase days"
                    >
                      +
                    </button>
                    <div className="ml-auto text-right">
                      <div className="text-xs text-gray-500">Total</div>
                      <div className="text-sm font-semibold">{totalDisplay}</div>
                    </div>
                  </div>
                </div>

                <h3 className="text-sm sm:text-md font-semibold text-slate-800 mb-3 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-emerald-600" /> Pickup
                </h3>

                <div className="space-y-3 mb-5">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                    <input
                      type="date"
                      min={new Date().toISOString().slice(0, 10)}
                      value={rentalDate}
                      onChange={(e) => setRentalDate(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-xl w-full sm:w-1/2 text-sm focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                      aria-label="Rental pickup date"
                    />
                    <input
                      type="time"
                      value={rentalTime}
                      onChange={(e) => setRentalTime(e.target.value)}
                      className="px-3 py-2 border border-gray-300 rounded-xl w-full sm:w-1/2 text-sm focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                      aria-label="Rental pickup time"
                    />
                  </div>

                  <div className="text-xs text-gray-500 hidden sm:flex justify-center items-center">
                    Pickup: <span className="font-medium text-slate-700 ml-1">{rentalDate} at {rentalTime}</span>
                  </div>
                </div>

                {/* Primary actions */}
                <div className="flex flex-col items-center space-y-3">
                  <Button
                    className="w-4/5 mx-auto text-base sm:text-lg py-3 sm:py-4 bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg transition duration-300"
                    onClick={handleRentNow}
                    disabled={!available}
                    aria-label={available ? 'Rent via WhatsApp' : 'Notify me when available'}
                  >
                    <IconBrandWhatsapp className="w-4 h-4 sm:w-5 sm:h-5 mr-3" />
                    <span className="truncate">{available ? `Rent ${days} day${days > 1 ? 's' : ''}` : 'Notify Me'}</span>
                  </Button>
                </div>

                
              </div>

              
            </aside>
        </div>
      </div>
    </div>
  );
}