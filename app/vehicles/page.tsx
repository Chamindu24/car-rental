"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, X, Pencil, Plus, Home, Car, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";
import { motion } from "motion/react";

type Vehicle = {
  id?: string;
  name: string;
  brand: string;
  seats: number;
  hasAC: boolean;
  price: string;
  images: string[];
  mainImage: string;
  available: boolean;
  type: 'economy' | 'comfort' | 'luxury';
  fuelType: 'petrol' | 'diesel' | 'hybrid' | 'electric';
  transmission: 'manual' | 'automatic';
};
// Vehicles data will be fetched inside the client component below

export default function VehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<Vehicle | null>(null);
  const [sortBy, setSortBy] = useState<'newest'|'priceAsc'|'priceDesc'>('newest');

  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/vehicles');
      if (!res.ok) throw new Error('Failed to fetch vehicles');
      const data = await res.json();
      const mapped: Vehicle[] = (data || []).map((v: any) => ({
        id: v._id ? String(v._id) : v.id ? String(v.id) : undefined,
        name: v.name,
        brand: v.brand,
        seats: v.seats,
        hasAC: v.hasAC,
        price: v.price,
        // Normalize images: prefer `mainImage`, then `image`, then first of `images`
        mainImage: v.mainImage ?? v.image ?? (Array.isArray(v.images) && v.images.length ? v.images[0] : undefined) ?? '/placeholder.png',
        images: Array.isArray(v.images) ? v.images : (v.image ? [v.image] : []),
        available: v.available,
        type: v.type,
        fuelType: v.fuelType,
        transmission: v.transmission,
      }));
      setVehicles(mapped);
    } catch (err: any) {
      console.error('Fetch vehicles error:', err);
      setError(err?.message || 'Unknown error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchVehicles();
  }, []);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    type: '',
    fuelType: '',
    transmission: '',
    hasAC: null as boolean | null,
  });

  const handleRent = (vehicleId?: string) => {
    const vehicle = filteredVehicles.find(v => v.id === vehicleId);
    if (vehicle) {
      if (vehicle.available) {
        toast.success(`Added ${vehicle.name} to your cart`, {
          action: {
            label: "View Cart",
            onClick: () => router.push("/cart"),
          },
        });
      } else {
        toast.error(`${vehicle.name} is not available at the moment`);
      }
    }
  };

  const handleEdit = (vehicleId?: string) => {
    if (!vehicleId) return;
    router.push(`/add-car?id=${vehicleId}`);
  };

  const openDetails = (v: Vehicle) => setSelected(v);
  const closeDetails = () => setSelected(null);

  const parsePriceValue = (priceStr: string) => {
    // attempt to extract numeric value from strings like "Rs. 3,500/day"
    const num = priceStr.replace(/[^0-9.]/g, '');
    return Number(num) || 0;
  };

  const sortedVehicles = [...vehicles].sort((a,b) => {
    if (sortBy === 'priceAsc') return parsePriceValue(a.price) - parsePriceValue(b.price);
    if (sortBy === 'priceDesc') return parsePriceValue(b.price) - parsePriceValue(a.price);
    return 0;
  });

  const filteredVehicles = sortedVehicles.filter(vehicle => {
    // Search term filter
    const matchesSearch = 
      vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vehicle.brand.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Type filter
    const matchesType = !filters.type || vehicle.type === filters.type;
    
    // Fuel type filter
    const matchesFuelType = !filters.fuelType || vehicle.fuelType === filters.fuelType;
    
    // Transmission filter
    const matchesTransmission = !filters.transmission || vehicle.transmission === filters.transmission;
    
    // AC filter
    const matchesAC = filters.hasAC === null || vehicle.hasAC === filters.hasAC;
    
    return matchesSearch && matchesType && matchesFuelType && matchesTransmission && matchesAC;
  });

  const clearFilters = () => {
    setFilters({
      type: '',
      fuelType: '',
      transmission: '',
      hasAC: null,
    });
    setSearchTerm("");
  };

  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 md:p-8">
      <div className="max-w-full mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-2">
            <Car className="w-6 h-6 text-primary" />
            <h1 className="text-3xl font-bold text-gray-900">Our Vehicle Fleet</h1>
          </div>
          
          <div className="flex gap-2 w-full md:w-auto">
            <Button variant="outline" onClick={() => router.push("/")} className="gap-2">
              <Home className="w-4 h-4" />
              Home
            </Button>
            <Button onClick={() => router.push("/add-car")} className="gap-2">
              <Plus className="w-4 h-4" />
              Add Vehicle
            </Button>
          </div>

            <select
              value={filters.fuelType}
              onChange={(e) => setFilters({...filters, fuelType: e.target.value as any})}
              className="px-3 py-2 text-sm border rounded-md"
            >
              <option value="">All Fuel Types</option>
              <option value="petrol">Petrol</option>
              <option value="diesel">Diesel</option>
              <option value="hybrid">Hybrid</option>
              <option value="electric">Electric</option>
            </select>

            <select
              value={filters.transmission}
              onChange={(e) => setFilters({...filters, transmission: e.target.value as any})}
              className="px-3 py-2 text-sm border rounded-md"
            >
              <option value="">All Transmissions</option>
              <option value="manual">Manual</option>
              <option value="automatic">Automatic</option>
            </select>

            <select
              value={filters.hasAC === null ? '' : filters.hasAC ? 'true' : 'false'}
              onChange={(e) => setFilters({...filters, hasAC: e.target.value === '' ? null : e.target.value === 'true'})}
              className="px-3 py-2 text-sm border rounded-md"
            >
              <option value="">AC Any</option>
              <option value="true">With AC</option>
              <option value="false">Without AC</option>
            </select>

            <Button variant="outline" onClick={clearFilters} size="sm">
              Clear Filters
            </Button>
            <div className="ml-2 flex items-center">
              <label className="text-sm mr-2 text-gray-600">Sort:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 text-sm border rounded-md"
              >
                <option value="newest">Default</option>
                <option value="priceAsc">Price: Low → High</option>
                <option value="priceDesc">Price: High → Low</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {Array.from({length:8}).map((_,i) => (
              <div key={i} className="animate-pulse bg-white rounded-lg p-4 h-64 shadow-sm" />
            ))}
          </div>
        ) : filteredVehicles.length === 0 ? (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium">No vehicles found</h3>
            <p className="text-gray-500 mt-2">Try adjusting your search or filters</p>
            <Button variant="outline" onClick={clearFilters} className="mt-4">
              Clear all filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVehicles.map((vehicle) => (
              <motion.div key={vehicle.id} whileHover={{ y: -6 }} className="h-full">
                <Card className="hover:shadow-2xl transition-shadow group h-full flex flex-col">
                  <CardHeader className="relative p-0 overflow-hidden rounded-t-lg">
                    <img 
                      src={vehicle.mainImage } 
                      alt={vehicle.name} 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="absolute top-3 right-3 flex gap-2">
                      <Badge variant={vehicle.available ? "default" : "destructive"} className="flex items-center">
                        {vehicle.available ? (
                          <>
                            <Check className="w-3 h-3 mr-1" /> Available
                          </>
                        ) : (
                          <>
                            <X className="w-3 h-3 mr-1" /> Unavailable
                          </>
                        )}
                      </Badge>
                    </div>
                    <div className="absolute left-3 bottom-3">
                      <button onClick={() => openDetails(vehicle)} className="bg-white/90 px-3 py-1 rounded-full text-sm shadow">View</button>
                    </div>
                  </CardHeader>
                  <CardContent className="flex-grow p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold">{vehicle.name}</h3>
                        <p className="text-gray-600 text-sm">{vehicle.brand}</p>
                      </div>
                      <p className="text-lg font-bold text-primary whitespace-nowrap">{vehicle.price}</p>
                    </div>

                    <div className="mt-4 flex flex-wrap gap-2">
                      <Badge variant="secondary" className="capitalize">{vehicle.type}</Badge>
                      <Badge variant="outline" className="capitalize">{vehicle.fuelType}</Badge>
                      <Badge variant="outline" className="capitalize">{vehicle.transmission}</Badge>
                      <div className="ml-auto text-sm text-gray-500">Seats: {vehicle.seats}</div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4 pt-0 flex gap-2">
                    <Button 
                      variant="default"
                      className="w-full"
                      onClick={() => handleRent(vehicle.id)}
                    >
                      Rent
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full"
                      onClick={() => handleEdit(vehicle.id)}
                    >
                      Edit
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    
    {/* Details modal */}
    {selected && (
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60" onClick={closeDetails} />
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="relative w-full max-w-3xl bg-white rounded-lg overflow-hidden shadow-lg">
          <button className="absolute top-3 right-3 z-30 bg-white rounded-full p-2 shadow" onClick={closeDetails}>Close</button>
          <div className="grid grid-cols-1 md:grid-cols-2">
              <div className="h-80 md:h-auto md:min-h-[300px]">
              <img src={selected!.mainImage } className="w-full h-full object-cover" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2">{selected!.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{selected!.brand}</p>
              <p className="mb-4">{selected!.price} • {selected!.type} • {selected!.fuelType}</p>
              <div className="flex gap-2">
                <Button onClick={() => { handleRent(selected!.id); closeDetails(); }} variant="default">Rent</Button>
                <Button onClick={() => { handleEdit(selected!.id); closeDetails(); }} variant="outline">Edit</Button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    )}
    </>
  );
}