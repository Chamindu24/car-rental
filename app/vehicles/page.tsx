"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  Check,
  X,
  Pencil,
  Plus,
  Home,
  Car,
  Filter,
  Users,
  AirVent,
  Fuel,
  GitCommit,
  Search,
  SortAsc
} from "lucide-react";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

// --- Types ---
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

type VehicleType = Vehicle['type'] | '';
type FuelType = Vehicle['fuelType'] | '';
type TransmissionType = Vehicle['transmission'] | '';
type SortByType = 'newest' | 'priceAsc' | 'priceDesc';

type Filters = {
  type: VehicleType;
  fuelType: FuelType;
  transmission: TransmissionType;
  hasAC: boolean | null;
};

// --- Dialog Component ---
const Dialog = ({ 
  open, 
  onOpenChange, 
  children 
}: { 
  open: boolean; 
  onOpenChange?: (open: boolean) => void; 
  children?: React.ReactNode;
}) => {
  useEffect(() => {
    if (typeof document === 'undefined') return;
    
    const originalOverflow = document.body.style.overflow;
    if (open) {
      document.body.style.overflow = "hidden";
    }
    
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div 
        className="fixed inset-0 bg-black/50 transition-opacity" 
        onClick={() => onOpenChange?.(false)} 
      />
      <div className="relative z-10 max-h-full overflow-auto">
        {children}
      </div>
    </div>
  );
};

const DialogContent = ({ 
  children, 
  className = "" 
}: { 
  children?: React.ReactNode; 
  className?: string;
}) => (
  <div className={`bg-white rounded-lg shadow-xl w-full max-w-4xl ${className}`}>
    {children}
  </div>
);

// --- Filter Sidebar Component ---
const VehicleFilterSidebar = ({ 
  filters, 
  setFilters, 
  clearFilters,
  activeFilterCount 
}: {
  filters: Filters;
  setFilters: (filters: Filters) => void;
  clearFilters: () => void;
  activeFilterCount: number;
}) => {
  const filterOptions = {
    type: ['economy', 'comfort', 'luxury'] as const,
    fuelType: ['petrol', 'diesel', 'hybrid', 'electric'] as const,
    transmission: ['manual', 'automatic'] as const,
  };

  const updateFilter = <K extends keyof Filters>(key: K, value: Filters[K]) => {
    setFilters({ ...filters, [key]: value });
  };

  const FilterSection = ({ 
    title, 
    icon: Icon, 
    children 
  }: { 
    title: string; 
    icon: React.ComponentType<any>;
    children: React.ReactNode;
  }) => (
    <div className="space-y-3 p-4 border-b last:border-b-0">
      <h4 className="font-semibold text-sm flex items-center gap-2 text-gray-700">
        <Icon className="w-4 h-4" />
        {title}
      </h4>
      {children}
    </div>
  );

  const FilterBadge = ({ 
    active, 
    onClick, 
    children 
  }: { 
    active: boolean; 
    onClick: () => void; 
    children: React.ReactNode;
  }) => (
    <Badge
      variant={active ? "default" : "outline"}
      onClick={onClick}
      className="cursor-pointer transition-all hover:scale-105 capitalize text-xs"
    >
      {children}
    </Badge>
  );

  return (
    <div className="w-full h-full flex flex-col gap-8">
      {/* Header */}
      <div className="p-4 border-b bg-gradient-to-r from-gray-50 to-white">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold flex items-center gap-2 text-gray-900">
            <Filter className="w-5 h-5" />
            Filters
            {activeFilterCount > 0 && (
              <span className="bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {activeFilterCount}
              </span>
            )}
          </h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            disabled={activeFilterCount === 0}
            className="text-xs h-8"
          >
            Clear All
          </Button>
        </div>
      </div>

      {/* Filter Content */}
      <div className="flex-1 overflow-y-auto">
        {/* Vehicle Type */}
        <FilterSection title="Vehicle Type" icon={Car}>
          <div className="flex flex-wrap gap-2">
            <FilterBadge
              active={filters.type === ''}
              onClick={() => updateFilter('type', '')}
            >
              All Types
            </FilterBadge>
            {filterOptions.type.map(type => (
              <FilterBadge
                key={type}
                active={filters.type === type}
                onClick={() => updateFilter('type', type)}
              >
                {type}
              </FilterBadge>
            ))}
          </div>
        </FilterSection>

        {/* Fuel Type */}
        <FilterSection title="Fuel Type" icon={Fuel}>
          <div className="flex flex-wrap gap-2">
            <FilterBadge
              active={filters.fuelType === ''}
              onClick={() => updateFilter('fuelType', '')}
            >
              All Fuels
            </FilterBadge>
            {filterOptions.fuelType.map(fuel => (
              <FilterBadge
                key={fuel}
                active={filters.fuelType === fuel}
                onClick={() => updateFilter('fuelType', fuel)}
              >
                {fuel}
              </FilterBadge>
            ))}
          </div>
        </FilterSection>

        {/* Transmission */}
        <FilterSection title="Transmission" icon={GitCommit}>
          <div className="flex flex-wrap gap-2">
            <FilterBadge
              active={filters.transmission === ''}
              onClick={() => updateFilter('transmission', '')}
            >
              Both
            </FilterBadge>
            {filterOptions.transmission.map(transmission => (
              <FilterBadge
                key={transmission}
                active={filters.transmission === transmission}
                onClick={() => updateFilter('transmission', transmission)}
              >
                {transmission}
              </FilterBadge>
            ))}
          </div>
        </FilterSection>

        {/* Air Conditioning */}
        <FilterSection title="Air Conditioning" icon={AirVent}>
          <div className="flex flex-wrap gap-2">
            <FilterBadge
              active={filters.hasAC === null}
              onClick={() => updateFilter('hasAC', null)}
            >
              Any
            </FilterBadge>
            <FilterBadge
              active={filters.hasAC === true}
              onClick={() => updateFilter('hasAC', true)}
            >
              With AC
            </FilterBadge>
            <FilterBadge
              active={filters.hasAC === false}
              onClick={() => updateFilter('hasAC', false)}
            >
              No AC
            </FilterBadge>
          </div>
        </FilterSection>
      </div>
    </div>
  );
};

// --- Main Component ---
export default function VehiclesPage() {
  const router = useRouter();
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
  const [sortBy, setSortBy] = useState<SortByType>('newest');
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const [filters, setFilters] = useState<Filters>({
    type: '',
    fuelType: '',
    transmission: '',
    hasAC: null,
  });

  // Calculate active filter count
  const activeFilterCount = useMemo(() => {
    return Object.values(filters).filter(value => 
      value !== '' && value !== null
    ).length + (searchTerm ? 1 : 0);
  }, [filters, searchTerm]);

  // --- Data Fetching ---
  useEffect(() => {
    const checkAdmin = () => {
      try {
        const adminStatus = typeof window !== 'undefined' 
          ? localStorage.getItem('isAdmin') === 'true'
          : false;
        setIsAdmin(adminStatus);
      } catch {
        setIsAdmin(false);
      }
    };

    checkAdmin();
  }, []);

  const fetchVehicles = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('/api/vehicles');
      if (!res.ok) throw new Error('Failed to fetch vehicles');
      
      const data = await res.json();
      const mappedVehicles: Vehicle[] = (data || []).map((v: any) => ({
        id: v._id ? String(v._id) : v.id ? String(v.id) : undefined,
        name: v.name || 'Unnamed Vehicle',
        brand: v.brand || 'Unknown Brand',
        seats: v.seats || 4,
        hasAC: Boolean(v.hasAC),
        price: v.price || 'Price not set',
        mainImage: v.mainImage || v.image || (Array.isArray(v.images) && v.images[0]) || '/vehicle-placeholder.jpg',
        images: Array.isArray(v.images) ? v.images : (v.image ? [v.image] : []),
        available: Boolean(v.available),
        type: v.type || 'economy',
        fuelType: v.fuelType || 'petrol',
        transmission: v.transmission || 'manual',
      }));
      
      setVehicles(mappedVehicles);
    } catch (err: any) {
      console.error('Fetch vehicles error:', err);
      setError(err?.message || 'Failed to load vehicles');
      toast.error('Failed to load vehicles');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  // --- Handlers ---
  const handleEditVehicle = (vehicleId?: string) => {
    if (!vehicleId) return;
    router.push(`/add-car?id=${vehicleId}`);
  };

  const openVehicleDetails = (vehicle: Vehicle) => setSelectedVehicle(vehicle);
  const closeVehicleDetails = () => setSelectedVehicle(null);

  const clearAllFilters = () => {
    setFilters({
      type: '',
      fuelType: '',
      transmission: '',
      hasAC: null,
    });
    setSearchTerm("");
    setSortBy('newest');
    toast.info("All filters cleared");
  };

  // --- Filtering and Sorting Logic ---
  const parsePriceValue = (priceStr: string): number => {
    const numericString = priceStr.replace(/[^0-9.]/g, '');
    return Number(numericString) || 0;
  };

  const filteredAndSortedVehicles = useMemo(() => {
    const searchLower = searchTerm.toLowerCase();
    
    // Filter vehicles
    const filtered = vehicles.filter(vehicle => {
      const matchesSearch = searchTerm === '' ||
        vehicle.name.toLowerCase().includes(searchLower) ||
        vehicle.brand.toLowerCase().includes(searchLower) ||
        vehicle.type.toLowerCase().includes(searchLower);

      const matchesType = !filters.type || vehicle.type === filters.type;
      const matchesFuelType = !filters.fuelType || vehicle.fuelType === filters.fuelType;
      const matchesTransmission = !filters.transmission || vehicle.transmission === filters.transmission;
      const matchesAC = filters.hasAC === null || vehicle.hasAC === filters.hasAC;

      return matchesSearch && matchesType && matchesFuelType && matchesTransmission && matchesAC;
    });

    // Sort vehicles
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'priceAsc':
          return parsePriceValue(a.price) - parsePriceValue(b.price);
        case 'priceDesc':
          return parsePriceValue(b.price) - parsePriceValue(a.price);
        case 'newest':
        default:
          // Assuming higher IDs are newer
          const idA = a.id || '0';
          const idB = b.id || '0';
          return idB.localeCompare(idA);
      }
    });
  }, [vehicles, searchTerm, filters, sortBy]);

  // --- Vehicle Card Component ---
  const VehicleCard = ({ vehicle }: { vehicle: Vehicle }) => {
    const isUnavailable = !vehicle.available;
    
    return (
      <motion.div
        layout
        whileHover={{ 
          scale: isUnavailable ? 1 : 1.02,
          y: -4
        }}
        transition={{ type: "spring", stiffness: 300 }}
        className={`h-full  cursor-pointer ${isUnavailable ? 'opacity-60 grayscale' : 'opacity-100'}`}
        onClick={() => !isUnavailable && vehicle.id && router.push(`/vehicles/${vehicle.id}`)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if ((e.key === 'Enter' || e.key === ' ') && !isUnavailable && vehicle.id) {
            e.preventDefault();
            router.push(`/vehicles/${vehicle.id}`);
          }
        }}
      >
        <Card className={`h-full  flex flex-col overflow-hidden border-2 transition-colors ${
          isUnavailable 
            ? 'border-gray-200' 
            : 'border-gray-200 hover:border-primary/30'
        }`}>
          {/* Image Section */}
          <CardHeader className="relative p-0 h-48 overflow-hidden">
            <img
              src={vehicle.mainImage}
              alt={vehicle.name}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Vehicle Name */}
            <div className="absolute bottom-3 left-3 right-3">
              <h3 className="text-lg font-bold text-white line-clamp-1">{vehicle.name}</h3>
            </div>
            
            {/* Status Badge */}
            <div className="absolute top-3 right-3">
              <Badge 
                variant={vehicle.available ? "default" : "destructive"} 
                className="flex items-center gap-1 text-xs font-semibold shadow-lg"
              >
                {vehicle.available ? (
                  <>
                    <Check className="w-3 h-3" />
                    Available
                  </>
                ) : (
                  <>
                    <X className="w-3 h-3" />
                    Unavailable
                  </>
                )}
              </Badge>
            </div>
          </CardHeader>

          {/* Content Section */}
          <CardContent className="flex-1 p-4 space-y-3">
            <div className="flex justify-between items-start">
              <p className="text-gray-600 text-sm font-medium">{vehicle.brand}</p>
              <p className="text-xl font-bold text-primary">{vehicle.price}</p>
            </div>

            {/* Feature Badges */}
            <div className="flex flex-wrap gap-1.5">
              <Badge variant="secondary" className="text-xs capitalize">
                {vehicle.type}
              </Badge>
              <Badge variant="outline" className="text-xs flex items-center gap-1">
                <Users className="w-3 h-3" />
                {vehicle.seats}
              </Badge>
              <Badge variant="outline" className="text-xs capitalize flex items-center gap-1">
                <Fuel className="w-3 h-3" />
                {vehicle.fuelType}
              </Badge>
              {vehicle.hasAC && (
                <Badge variant="secondary" className="text-xs flex items-center gap-1 bg-green-100 text-green-700">
                  <AirVent className="w-3 h-3" />
                  AC
                </Badge>
              )}
            </div>
          </CardContent>

          {/* Actions Section */}
          <CardFooter className="p-4 pt-0 flex gap-2">
            <Button 
              variant="outline" 
              onClick={(e) => { 
                e.stopPropagation(); 
                openVehicleDetails(vehicle); 
              }} 
              className="flex-1"
              disabled={isUnavailable}
            >
              Quick View
            </Button>

            {isAdmin && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => { 
                  e.stopPropagation(); 
                  handleEditVehicle(vehicle.id); 
                }}
                title="Edit Vehicle"
                className="shrink-0"
              >
                <Pencil className="w-4 h-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      </motion.div>
    );
  };

  // --- Loading Skeleton ---
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <Card key={index} className="animate-pulse overflow-hidden">
          <div className="h-48 bg-gray-300" />
          <CardContent className="p-4 space-y-3">
            <div className="h-4 bg-gray-300 rounded w-3/4" />
            <div className="h-4 bg-gray-300 rounded w-1/2" />
            <div className="flex gap-2">
              <div className="h-6 bg-gray-300 rounded w-16" />
              <div className="h-6 bg-gray-300 rounded w-16" />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            {/* Title and Navigation */}
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Our Fleet</h1>
                <p className="text-gray-600 text-sm">
                  {loading ? 'Loading...' : `${filteredAndSortedVehicles.length} vehicles available`}
                </p>
              </div>
            </div>

            {/* Search and Controls */}
            <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
              {/* Search Input */}
              <div className="relative flex-1 lg:w-80">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search vehicles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <SortAsc className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortByType)}
                    className="pl-10 pr-8 py-2 text-sm border rounded-md bg-white focus:ring-primary focus:border-primary w-full appearance-none"
                  >
                    <option value="newest">Newest First</option>
                    <option value="priceAsc">Price: Low to High</option>
                    <option value="priceDesc">Price: High to Low</option>
                  </select>
                </div>

                {/* Mobile Filter Toggle */}
                <Button
                  variant="outline"
                  onClick={() => setIsFilterSidebarOpen(true)}
                  className="lg:hidden relative"
                >
                  <Filter className="w-4 h-4" />
                  {activeFilterCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                      {activeFilterCount}
                    </span>
                  )}
                </Button>
              </div>

              {/* Admin Action */}
              {isAdmin && (
                <Button 
                  onClick={() => router.push("/add-car")} 
                  className="gap-2 shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  Add Vehicle
                </Button>
              )}

              {/* Home Button */}
              <Button 
                variant="ghost" 
                onClick={() => router.push("/")} 
                className="gap-2 shrink-0"
              >
                <Home className="w-4 h-4" />
                <span className="hidden sm:inline">Home</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto p-4">
        <div className="flex gap-6">
          {/* Desktop Filter Sidebar - Fixed to left top */}
          {/* Desktop Filter Sidebar - fixed to left of viewport */}
          <aside className="hidden lg:block w-80 shrink-0 fixed left-3 top-24 h-[calc(90vh-6rem)] z-30">
            <Card className="border-2 shadow-lg h-full overflow-auto">
              <VehicleFilterSidebar
                filters={filters}
                setFilters={setFilters}
                clearFilters={clearAllFilters}
                activeFilterCount={activeFilterCount}
              />
            </Card>
          </aside>

          {/* Vehicle Grid */}
          <main className="flex-1 min-w-0 lg:ml-[20rem]">
            {loading ? (
              <LoadingSkeleton />
            ) : error ? (
              <div className="text-center py-12">
                <div className="bg-destructive/10 border border-destructive/50 rounded-xl p-8 max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-destructive mb-2">
                    Error Loading Vehicles
                  </h3>
                  <p className="text-destructive/80 mb-4">{error}</p>
                  <Button onClick={fetchVehicles} variant="destructive">
                    Try Again
                  </Button>
                </div>
              </div>
            ) : filteredAndSortedVehicles.length === 0 ? (
              <div className="text-center py-16">
                <div className="max-w-sm mx-auto">
                  <Car className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No vehicles found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {activeFilterCount > 0 
                      ? "Try adjusting your filters or search terms."
                      : "No vehicles available at the moment."
                    }
                  </p>
                  {activeFilterCount > 0 && (
                    <Button onClick={clearAllFilters} variant="outline">
                      Clear All Filters
                    </Button>
                  )}
                </div>
              </div>
            ) : (
              <motion.div 
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {filteredAndSortedVehicles.map((vehicle) => (
                  <VehicleCard key={vehicle.id} vehicle={vehicle} />
                ))}
              </motion.div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Dialog */}
      <Dialog open={isFilterSidebarOpen} onOpenChange={setIsFilterSidebarOpen}>
        <DialogContent className="h-[80vh] flex flex-col">
          <VehicleFilterSidebar
            filters={filters}
            setFilters={setFilters}
            clearFilters={() => {
              clearAllFilters();
              setIsFilterSidebarOpen(false);
            }}
            activeFilterCount={activeFilterCount}
          />
        </DialogContent>
      </Dialog>

      {/* Vehicle Details Dialog */}
      <Dialog open={!!selectedVehicle} onOpenChange={closeVehicleDetails}>
        <DialogContent className="max-w-4xl">
          {selectedVehicle && (
            <div className="grid md:grid-cols-2 gap-6 p-6">
              {/* Image */}
              <div className="rounded-lg overflow-hidden">
                <img
                  src={selectedVehicle.mainImage}
                  alt={selectedVehicle.name}
                  className="w-full h-64 md:h-80 object-cover"
                />
              </div>

              {/* Details */}
              <div className="space-y-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">
                    {selectedVehicle.name}
                  </h2>
                  <p className="text-gray-600">{selectedVehicle.brand}</p>
                </div>

                <div className="space-y-3">
                  <p className="text-3xl font-bold text-primary">
                    {selectedVehicle.price}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="font-semibold">Type:</span>
                      <Badge variant="secondary" className="ml-2 capitalize">
                        {selectedVehicle.type}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-semibold">Fuel:</span>
                      <Badge variant="outline" className="ml-2 capitalize">
                        {selectedVehicle.fuelType}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-semibold">Transmission:</span>
                      <Badge variant="outline" className="ml-2 capitalize">
                        {selectedVehicle.transmission}
                      </Badge>
                    </div>
                    <div>
                      <span className="font-semibold">Seats:</span>
                      <Badge variant="outline" className="ml-2">
                        <Users className="w-3 h-3 inline mr-1" />
                        {selectedVehicle.seats}
                      </Badge>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <AirVent className="w-4 h-4" />
                    <span className="font-semibold">AC:</span>
                    <Badge
                      variant={selectedVehicle.hasAC ? "default" : "outline"}
                      className={selectedVehicle.hasAC ? "bg-green-100 text-green-700" : ""}
                    >
                      {selectedVehicle.hasAC ? "Available" : "Not Available"}
                    </Badge>
                  </div>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={() => {
                      closeVehicleDetails();
                      selectedVehicle.id && router.push(`/vehicles/${selectedVehicle.id}`);
                    }}
                    className="flex-1"
                  >
                    View Full Details
                  </Button>
                  
                  {isAdmin && (
                    <Button
                      variant="outline"
                      onClick={() => {
                        handleEditVehicle(selectedVehicle.id);
                        closeVehicleDetails();
                      }}
                    >
                      <Pencil className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}