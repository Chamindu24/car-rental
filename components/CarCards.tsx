"use client";
import React, { useState, useEffect } from "react";
import Link from 'next/link';
import type { Vehicle } from "@/types/vehicle";
import { AirVent, Fuel, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

// Enhanced HoverEffect component with black & ash styling
type HoverEffectItem = {
  key?: string | number;
  content: React.ReactNode;
};

interface HoverEffectProps {
  items: HoverEffectItem[];
  className?: string;
}

const HoverEffect: React.FC<HoverEffectProps> = ({ items, className = "" }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [visibleItems, setVisibleItems] = useState<number>(0);

  useEffect(() => {
    // Reset animation when items change
    setVisibleItems(0);
    
    // Animate items appearing one by one
    const timer = setInterval(() => {
      setVisibleItems(prev => {
        if (prev >= items.length) {
          clearInterval(timer);
          return prev;
        }
        return prev + 1;
      });
    }, 150); // 150ms delay between each card

    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-6 sm:py-8 ${className}`}
    >
      {items.map((item, idx) => (
        <div
          key={item.key || idx}
          className={`relative group block h-full w-full transform transition-all duration-700 touch-manipulation ${
            idx < visibleItems 
              ? 'opacity-100 translate-y-0 scale-100' 
              : 'opacity-0 translate-y-8 scale-95'
          }`}
          style={{ transitionDelay: `${idx * 100}ms` }}
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
          onClick={() => setHoveredIndex((prev) => (prev === idx ? null : idx))}
          onTouchStart={() => setHoveredIndex(idx)}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br from-gray-800/20 to-gray-200/30 rounded-3xl transition-all duration-700 transform ${
              hoveredIndex === idx ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
          />

          <div
            className={`absolute inset-0 bg-gradient-to-br from-gray-200 to-white rounded-3xl transition-all duration-500 ${
              hoveredIndex === idx ? "opacity-20" : "opacity-0"
            }`}
            style={{ padding: "2px" }}
          >
            <div className="w-full h-full bg-gray-200 rounded-3xl" />
          </div>

          <div className="relative z-10">{item.content}</div>
        </div>
      ))}
    </div>
  );
};

interface CardProps {
  className?: string;
  children: React.ReactNode;
  available?: boolean;
}

const Card: React.FC<CardProps> = ({ className = "", children, available = true }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-3xl h-full w-full bg-gradient-to-br from-white to-gray-100 border-2 transition-all duration-500 ease-out shadow-lg hover:shadow-2xl ${
        available ? "border-gray-200 hover:border-gray-100" : "border-gray-300 opacity-70"
      } ${className}`}
    >
      <div className="relative z-10 p-4 h-full flex flex-col">{children}</div>
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = "" }) => (
  <div className={`mb-1 ${className}`}>{children}</div>
);

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className = "" }) => (
  <h3
    className={`text-2xl font-bold text-black mb-1 transition-colors duration-300 group-hover:text-gray-800 ${className}`}
  >
    {children}
  </h3>
);

interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

const CardDescription: React.FC<CardDescriptionProps> = ({ children, className = "" }) => (
  <p className={`text-gray-700 font-semibold text-lg ${className}`}>{children}</p>
);

interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

const CardContent: React.FC<CardContentProps> = ({ children, className = "" }) => (
  <div className={`flex-grow space-y-1 ${className}`}>{children}</div>
);

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className = "" }) => (
  <div className={`mt-6 ${className}`}>{children}</div>
);

// Vehicles are fetched from the server. Static sample data removed.

export default function EnhancedCarCards() {
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsLoading] = useState(false);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [fetchLoading, setFetchLoading] = useState<boolean>(true);
  const [fetchError, setFetchError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const controller = new AbortController();

    async function loadVehicles() {
      try {
        setFetchLoading(true);
        const res = await fetch('/api/vehicles', { signal: controller.signal });
        if (!res.ok) throw new Error(`Failed to fetch vehicles: ${res.status}`);
        const data: any[] = await res.json();

        // Normalize image fields so the component can always render an image.
        const normalized: Vehicle[] = (data || []).map((v: any) => ({
          ...v,
          image:
            v.image ??
            v.mainImage ??
            (Array.isArray(v.images) && v.images.length ? v.images[0] : undefined) ??
            'https://via.placeholder.com/600x400?text=No+Image',
        }));

        if (mounted) setVehicles(normalized);
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        console.error('Error fetching vehicles', err);
        if (mounted) setFetchError('Failed to load vehicles');
      } finally {
        if (mounted) setFetchLoading(false);
      }
    }

    loadVehicles();

    return () => {
      mounted = false;
      controller.abort();
    };
  }, []);

  const filteredCars = vehicles.filter((car: Vehicle) => {
    if (filter === "available") return car.available;
    if (filter === "unavailable") return !car.available;
    return true;
  });

  // Only display a subset on this listing and show a 'Show more' button
  const DISPLAY_LIMIT = 6;
  const showMoreNeeded = filteredCars.length > DISPLAY_LIMIT;
  const visibleCars = filteredCars.slice(0, DISPLAY_LIMIT);

  const handleFilterChange = (newFilter: string) => {
    if (newFilter !== filter) {
      setIsLoading(true);
      setTimeout(() => {
        setFilter(newFilter);
        setIsLoading(false);
      }, 200);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-800/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-700/10 rounded-full blur-3xl animate-pulse" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-10 sm:mb-12 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent">
            Premium Car Rentals
          </h1>
          <p className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            Choose from our fleet of well-maintained vehicles for your perfect journey
          </p>
        </div>

        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="bg-gray-200 rounded-2xl p-2 shadow-lg border border-gray-200/50">
            {["all", "available", "unavailable"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => handleFilterChange(filterType)}
                className={`px-4 py-2 sm:px-6 sm:py-3 rounded-xl font-semibold transition-all duration-300 mr-2 last:mr-0  transform hover:scale-105 ${
                  filter === filterType
                    ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg scale-105"
                    : "text-gray-600 hover:text-white hover:bg-gray-600"
                }`}
                disabled={isLoading}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {fetchError && (
          <div className="max-w-2xl mx-auto text-center text-red-600 mb-6">
            {fetchError}
          </div>
        )}

        {fetchLoading || isLoading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-800"></div>
          </div>
        ) : (
          <>
            <HoverEffect
              items={visibleCars.map((car, idx) => {
                const vehicleId = String((car as any)._id ?? (car as any).id ?? idx);
                return {
                  key: vehicleId,
                  content: (
                    <Link href={`/vehicles/${vehicleId}`} aria-label={`View ${car.name}`} className="block w-full h-full focus:outline-none">
                      <Card available={car.available} className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-500">
  <CardHeader>
    <div className="relative w-full h-44 sm:h-48 md:h-56 lg:h-60 overflow-hidden rounded-2xl">
      <img
        src={car.image}
        alt={car.name}
        className="w-full h-full object-cover object-center transition-transform duration-700 transform group-hover:scale-105"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-100 transition-opacity duration-500" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      <div
        className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 transform group-hover:scale-110 ${
          car.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
        }`}
      >
        {car.available ? "Available" : "Not Available"}
      </div>

      {/* Price badge placed on the opposite (left) side of the availability badge */}
      <div
        role="status"
        aria-label={`Price ${
          typeof car.price === "number"
            ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(car.price)
            : car.price
        }`}
        className="absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 bg-gradient-to-r from-yellow-300 via-yellow-200 to-amber-300 ring-2 ring-red-400 text-black shadow-sm"
      >
        {typeof car.price === "number"
          ? new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(car.price)
          : car.price}
      </div>
      <div className=" absolute bottom-4 left-4 text-white tracking-wide text-lg sm:text-xl md:text-2xl font-semibold mt-3">
        {car.name}
      </div>
    </div>
 
  </CardHeader>

  <CardContent>
    <div className="flex flex-wrap justify-between items-center text-gray-700 text-sm sm:text-base gap-2 px-4 sm:px-6">
      <div className="flex flex-wrap gap-3 mt-4">
              <Badge variant="secondary" className="text-xs capitalize">
                {car.brand}
              </Badge>
              
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Users className="w-3 h-3" />
                {car.seats}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize flex items-center gap-1">
                <Fuel className="w-3 h-3" />
                {car.fuelType}
              </Badge>
              {car.hasAC && (
                <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-green-100 text-green-700">
                  <AirVent className="w-3 h-3" />
                  AC
                </Badge>
              )}
            </div>
    </div>

    <div className="flex flex-col sm:flex-row  justify-center items-center mt-4 px-4 sm:px-6 gap-3">
      <button
        className="w-full sm:w-auto px-6 sm:px-10   py-1  text-black font-medium ring-2 ring-red-500 rounded-xs shadow-md hover:bg-white "
      >
        Book Now
      </button>
    </div>
  </CardContent>
</Card>

                    </Link>
                  ),
                };
              })}
            />

            {showMoreNeeded && (
                <div className="flex justify-center mt-6 px-4 sm:px-0">
                <div className="w-xs  sm:max-w-xs md:max-w-xs lg:max-w-sm">
                  <Link href="/vehicles" className="block w-full">
                  <button
                    type="button"
                    aria-label="Show more vehicles"
                    className="w-full inline-flex justify-center items-center px-4 py-3 bg-gray-800 text-white rounded-xl font-semibold shadow hover:bg-gray-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-700"
                  >
                    <span className="hidden sm:inline">Show more vehicles</span>
                    <span className="sm:hidden">Show more</span>
                  </button>
                  </Link>
                </div>
                </div>
            )}
          </>
        )}

        {!fetchLoading && !isLoading && filteredCars.length === 0 && (
          <div className="text-center py-16 text-gray-700 animate-fade-in">
            <div className="text-6xl mb-4 animate-bounce">🚗</div>
            <h3 className="text-2xl font-bold mb-2">No cars found</h3>
            <p className="text-gray-500">Try adjusting your filter criteria</p>
          </div>
        )}
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.8s ease-out;
        }
      `}</style>
    </section>
  );
}