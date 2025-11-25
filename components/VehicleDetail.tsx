"use client";
import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X, Users, AirVent, Fuel, Wrench, Car, Tag, Calendar, Clock, DollarSign, Info } from 'lucide-react';
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

  const mainImage = images[selected] ?? vehicle.image ?? '/placeholder.png';
  const priceDisplay = vehicle.price ? `${vehicle.price}` : 'P.O.A'; 
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
    
    const msg = `Hello, I'm interested in renting the *${brand} ${name}*.\n\nKey Details:\n- Price: ${price}\n- Pickup Date/Time: ${date} at ${time}\n- Transmission: ${transmission}\n\nPlease let me know the full process to confirm the booking. Thank you.`;
    
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
        <div className={`fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md shadow-lg transition-transform duration-300 ${isHeaderSticky ? 'translate-y-0' : '-translate-y-full'}`}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <div className="flex  items-center gap-6">
              <h2 className="text-2xl font-bold tracking-widest">{vehicle.brand} {vehicle.name}</h2>
              
            </div>
            <Button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white transition duration-300"
                onClick={handleRentNow}
                disabled={!available}
            >
                <Calendar className="w-4 h-4 mr-2" /> Quick Reserve
            </Button>
          </div>
        </div>
        

        {/* --- Main Grid Layout --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mt-8">
          
          {/* Main Content (Image & Descriptions) - Takes 8/12 columns on large screens */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Image Gallery */}
            <div className="rounded-2xl overflow-hidden shadow-2xl shadow-emerald-100 bg-gray-50">
              <div className="relative">
                <img
                  src={mainImage}
                  alt={vehicle.name}
                  className="w-full h-[580px] object-cover transition-transform duration-700 ease-in-out"
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
                    className={`flex-shrink-0 w-28 h-20 rounded-xl overflow-hidden border-2 ${i === selected ? 'border-emerald-500 shadow-md' : 'border-gray-200'} transform transition-all duration-200 hover:opacity-80`}
                    aria-label={`Show image ${i + 1}`}
                  >
                    <img src={src || '/placeholder.png'} alt={`${vehicle.name} view ${i + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}

            {/* Overview Specs Strip */}
            <div className="flex justify-around items-center py-4 px-6 bg-emerald-50/70 rounded-xl border border-emerald-100">
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

          {/* Booking/Call-to-Action Panel - Takes 4/12 columns on large screens */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="sticky top-20 bg-white p-8 rounded-2xl shadow-xl border border-gray-100">
              
              {/* Pricing Block */}
              <div className="mb-6 pb-4 border-b border-gray-200">
                <p className="text-lg font-semibold text-slate-500 mb-1">Daily Rental Rate</p>
                <div className="flex items-baseline">
                    <DollarSign className="w-8 h-8 text-emerald-600 mr-2" />
                    <span className="text-4xl font-extrabold text-slate-900">{priceDisplay}</span>
                    <span className="text-xl text-gray-500 ml-2"></span>
                </div>
              </div>

              {/* Availability Status (Mobile/Aside visibility) */}
              <div className="mb-6">
                <div className="flex items-center gap-3">
                    <Badge variant={available ? 'default' : 'destructive'} className={`text-base font-mono px-4 py-1 ${available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {available ? (<><Check className="w-4 h-4 mr-2"/> Ready to Book</>) : (<><X className="w-4 h-4 mr-2"/> Fully Booked</>) }
                    </Badge>
                </div>
              </div>
              
              {/* Pickup Selection */}
              <h3 className="text-md font-semibold text-slate-800 mb-4 flex items-center gap-2">
                <Calendar className="w-5 h-5 text-emerald-600" /> Secure Your Dates
              </h3>
              
              <div className="space-y-3 mb-6">
                <input
                    type="date"
                    value={rentalDate}
                    onChange={(e) => setRentalDate(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl w-4/5 text-md focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                    aria-label="Rental pickup date"
                />
                <input
                    type="time"
                    value={rentalTime}
                    onChange={(e) => setRentalTime(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl w-4/5 text-md focus:ring-emerald-500 focus:border-emerald-500 transition duration-150"
                    aria-label="Rental pickup time"
                />
              </div>

              {/* Action Button */}
              <Button 
                className="w-full text-lg py-6 bg-emerald-600 hover:bg-emerald-700 shadow-lg shadow-emerald-200 hover:shadow-xl transition duration-300" 
                onClick={handleRentNow}
                disabled={!available}
              >
                <IconBrandWhatsapp className="w-5 h-5 mr-3" /> 
                {available ? 'Rent Via WhatsApp' : 'Notify Me When Available'}
              </Button>
              <p className="text-center text-xs text-gray-500 mt-3">Guaranteed response within 1 hour via WhatsApp.</p>
            </div>

            

          </aside>
        </div>
      </div>
    </div>
  );
}