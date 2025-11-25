"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Check, X, Pencil, Plus, Home, Car, Filter } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useState, useEffect } from "react";

type Vehicle = {
  id?: string;
  name: string;
  brand: string;
  seats: number;
  hasAC: boolean;
  price: string;
  image: string;
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
        image: v.image,
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

  const filteredVehicles = vehicles.filter(vehicle => {
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
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Input
              placeholder="Search vehicles by name or brand..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value as any})}
              className="px-3 py-2 text-sm border rounded-md"
            >
              <option value="">All Types</option>
              <option value="economy">Economy</option>
              <option value="comfort">Comfort</option>
              <option value="luxury">Luxury</option>
            </select>

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
          </div>
        </div>

        {filteredVehicles.length === 0 ? (
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
              <Card key={vehicle.id} className="hover:shadow-xl transition-shadow group h-full flex flex-col">
                <CardHeader className="relative p-0">
                  <img 
                    src={vehicle.image} 
                    alt={vehicle.name} 
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-2 right-2 flex gap-2">
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
                    <button 
                      onClick={() => handleEdit(vehicle.id)}
                      className="bg-blue-500 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-blue-600"
                    >
                      <Pencil className="w-3 h-3" />
                    </button>
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

                  <div className="mt-4 space-y-2 text-sm">
                    <div className="flex items-center">
                      <span className="font-medium w-24">Seats:</span>
                      <span>{vehicle.seats}</span>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-24">AC:</span>
                      {vehicle.hasAC ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <X className="w-4 h-4 text-red-500" />
                      )}
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-24">Type:</span>
                      <Badge variant="secondary" className="capitalize">
                        {vehicle.type}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-24">Fuel:</span>
                      <Badge variant="outline" className="capitalize">
                        {vehicle.fuelType}
                      </Badge>
                    </div>
                    <div className="flex items-center">
                      <span className="font-medium w-24">Transmission:</span>
                      <Badge variant="outline" className="capitalize">
                        {vehicle.transmission}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="p-4 pt-0 flex gap-2">
                  <Button 
                    variant="outline"
                    className="w-full" 
                    onClick={() => handleEdit(vehicle.id)}
                  >
                    Edit
                  </Button>
                  
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}