"use client";
import React, { useState } from "react";

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

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-10 ${className}`}
    >
      {items.map((item, idx) => (
        <div
          key={item.key || idx}
          className="relative group block h-full w-full transform transition-all duration-500 hover:scale-105"
          onMouseEnter={() => setHoveredIndex(idx)}
          onMouseLeave={() => setHoveredIndex(null)}
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
      <div className="relative z-10 p-6 h-full flex flex-col">{children}</div>
    </div>
  );
};

interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

const CardHeader: React.FC<CardHeaderProps> = ({ children, className = "" }) => (
  <div className={`mb-4 ${className}`}>{children}</div>
);

interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

const CardTitle: React.FC<CardTitleProps> = ({ children, className = "" }) => (
  <h3
    className={`text-2xl font-bold text-black mb-2 transition-colors duration-300 group-hover:text-gray-800 ${className}`}
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
  <div className={`flex-grow space-y-3 ${className}`}>{children}</div>
);

interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

const CardFooter: React.FC<CardFooterProps> = ({ children, className = "" }) => (
  <div className={`mt-6 ${className}`}>{children}</div>
);

const cars = [
  {
    id: 1,
    name: "Toyota Prius",
    brand: "Toyota",
    image: "/axio.jpg",
    seats: 5,
    ac: true,
    driver: true,
    price: "Rs. 8,000/day",
    available: true,
  },
  {
    id: 2,
    name: "Suzuki Alto",
    brand: "Suzuki",
    image:
      "https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?w=400&h=300&fit=crop",
    seats: 4,
    ac: false,
    driver: false,
    price: "Rs. 3,500/day",
    available: true,
  },
  {
    id: 3,
    name: "Honda Grace",
    brand: "Honda",
    image:
      "https://images.unsplash.com/photo-1550355291-bbee04a92027?w=400&h=300&fit=crop",
    seats: 5,
    ac: true,
    driver: true,
    price: "Rs. 7,500/day",
    available: false,
  },
  {
    id: 4,
    name: "Nissan Caravan",
    brand: "Nissan",
    image:
      "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=400&h=300&fit=crop",
    seats: 10,
    ac: true,
    driver: true,
    price: "Rs. 15,000/day",
    available: true,
  },
  {
    id: 5,
    name: "Toyota Axio",
    brand: "Toyota",
    image:
      "https://images.unsplash.com/photo-1502877338535-766e1452684a?w=400&h=300&fit=crop",
    seats: 5,
    ac: true,
    driver: false,
    price: "Rs. 6,500/day",
    available: true,
  },
  {
    id: 6,
    name: "Tuk Tuk",
    brand: "Bajaj",
    image:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=300&fit=crop",
    seats: 3,
    ac: false,
    driver: true,
    price: "Rs. 2,000/day",
    available: true,
  },
];

export default function EnhancedCarCards() {
  const [filter, setFilter] = useState("all");

  const filteredCars = cars.filter((car) => {
    if (filter === "available") return car.available;
    if (filter === "unavailable") return !car.available;
    return true;
  });

  return (
    <section className="min-h-screen bg-gradient-to-br from-white via-gray-100 to-gray-200 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gray-800/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gray-700/10 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-gray-800 to-gray-500 bg-clip-text text-transparent">
            Premium Car Rentals
          </h1>
          <p className="text-xl text-gray-500 max-w-2xl mx-auto">
            Choose from our fleet of well-maintained vehicles for your perfect journey
          </p>
        </div>

        <div className="flex justify-center mb-8">
          <div className="bg-gray-200 rounded-2xl p-2 shadow-lg border border-gray-200/50">
            {["all", "available", "unavailable"].map((filterType) => (
              <button
                key={filterType}
                onClick={() => setFilter(filterType)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 mr-2 last:mr-0 ${
                  filter === filterType
                    ? "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-lg transform scale-105"
                    : "text-gray-600 hover:text-white hover:bg-gray-600"
                }`}
              >
                {filterType.charAt(0).toUpperCase() + filterType.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <HoverEffect
          items={filteredCars.map((car) => ({
            key: car.id.toString(),
            content: (
              <Card available={car.available} className="group">
                <CardHeader>
                  <div className="relative w-full h-48 mb-6 overflow-hidden rounded-2xl">
                    <img
                      src={car.image}
                      alt={car.name}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div
                      className={`absolute top-4 right-4 px-3 py-1 rounded-full text-sm font-semibold transition-all duration-300 ${
                        car.available ? "bg-green-500 text-white" : "bg-red-500 text-white"
                      }`}
                    >
                      {car.available ? "Available" : "Not Available"}
                    </div>
                  </div>
                  <CardTitle>{car.name}</CardTitle>
                  <CardDescription>{car.brand}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="space-y-4 text-gray-800">
                    <div>{car.seats} Seats</div>
                    <div>{car.ac ? "Air Conditioned" : "No AC"}</div>
                    <div>{car.driver ? "With Driver" : "Self Drive"}</div>
                    <div className="text-black font-bold text-lg">{car.price}</div>
                  </div>
                </CardContent>
              </Card>
            ),
          }))}
        />

        {filteredCars.length === 0 && (
          <div className="text-center py-16 text-white">
            <div className="text-6xl mb-4">🚗</div>
            <h3 className="text-2xl font-bold mb-2">No cars found</h3>
            <p className="text-gray-400">Try adjusting your filter criteria</p>
          </div>
        )}
      </div>
    </section>
  );
}
