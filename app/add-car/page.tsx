"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { UploadCloud, X, Loader2 } from "lucide-react";

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

export default function AddCarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const isEditMode = !!id;
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<Omit<Vehicle, 'id'>>({
    name: '',
    brand: '',
    seats: 4,
    hasAC: false,
    price: '',
    image: '',
    available: true,
    type: 'economy',
    fuelType: 'petrol',
    transmission: 'manual'
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isEditMode && id) {
      const fetchVehicle = async () => {
        try {
          const response = await fetch(`/api/vehicles/${id}`);
          if (!response.ok) {
            throw new Error('Failed to fetch vehicle');
          }
          const vehicle: Vehicle = await response.json();
          
          setFormData({
            name: vehicle.name,
            brand: vehicle.brand,
            seats: vehicle.seats,
            hasAC: vehicle.hasAC,
            price: vehicle.price.replace('Rs. ', '').replace('/day', ''),
            image: vehicle.image,
            available: vehicle.available,
            type: vehicle.type,
            fuelType: vehicle.fuelType,
            transmission: vehicle.transmission
          });
          setPreviewImage(vehicle.image);
        } catch (error) {
          toast.error('Failed to load vehicle data');
          console.error(error);
        }
      };
      fetchVehicle();
    }
  }, [id, isEditMode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File size should be less than 5MB');
      return;
    }

    // Create preview URL
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);

    // Upload to backend
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const { url } = await response.json();
      setFormData(prev => ({
        ...prev,
        image: url,
      }));
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
      setPreviewImage(null);
    } finally {
      setIsUploading(false);
    }
  };

  const removeImage = () => {
    setPreviewImage(null);
    setFormData(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Validate required fields
    if (!formData.name || !formData.brand || !formData.price) {
      toast.error('Please fill in all required fields');
      setIsSubmitting(false);
      return;
    }

    if (!formData.image) {
      toast.error('Please upload an image of the vehicle');
      setIsSubmitting(false);
      return;
    }

    try {
      // Format price for display
      const formattedData = {
        ...formData,
        price: `Rs. ${formData.price}/day`
      };

      const url = isEditMode ? `/api/vehicles/${id}` : '/api/vehicles';
      const method = isEditMode ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formattedData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Request failed');
      }

      toast.success(`Vehicle ${isEditMode ? 'updated' : 'added'} successfully`);
      router.push('/vehicles');
    } catch (error) {
      console.error(error);
      toast.error(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 p-4 md:p-8">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">
            {isEditMode ? 'Edit Vehicle' : 'Add New Vehicle'}
          </h1>
          <Button 
            variant="outline" 
            onClick={() => router.push('/vehicles')}
            disabled={isSubmitting}
          >
            Back to Vehicles
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Vehicle Name*</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Suzuki Alto"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand">Brand*</Label>
              <Input
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Suzuki"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seats">Number of Seats</Label>
              <Input
                id="seats"
                name="seats"
                type="number"
                min="1"
                max="10"
                value={formData.seats}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price">Price per Day (Rs.)*</Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 3500"
                required
                disabled={isSubmitting}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">Vehicle Type</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleSelectChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
              >
                <option value="economy">Economy</option>
                <option value="comfort">Comfort</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelType">Fuel Type</Label>
              <select
                id="fuelType"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleSelectChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
              >
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transmission">Transmission</Label>
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleSelectChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
              >
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
              </select>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-2">
            <Label>Vehicle Image*</Label>
            <div className="flex items-center justify-center w-full">
              <label
                htmlFor="image-upload"
                className={`flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer 
                  ${previewImage ? 'border-transparent' : 'border-gray-300 hover:border-gray-400'}
                  ${isUploading || isSubmitting ? 'opacity-50' : ''}`}
              >
                {previewImage ? (
                  <div className="relative w-full h-full">
                    <img
                      src={previewImage}
                      alt="Vehicle preview"
                      className="w-full h-full object-contain rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage();
                      }}
                      className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                      disabled={isUploading || isSubmitting}
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {isUploading ? (
                      <Loader2 className="w-8 h-8 mb-3 text-gray-400 animate-spin" />
                    ) : (
                      <UploadCloud className="w-8 h-8 mb-3 text-gray-400" />
                    )}
                    <p className="mb-2 text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">
                      PNG, JPG (MAX. 5MB)
                    </p>
                  </div>
                )}
                <input
                  id="image-upload"
                  ref={fileInputRef}
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageChange}
                  disabled={isUploading || isSubmitting}
                />
              </label>
            </div>
          </div>

          <div className="flex items-center space-x-4 pt-2">
            <div className="flex items-center space-x-2">
              <Switch
                id="hasAC"
                name="hasAC"
                checked={formData.hasAC}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, hasAC: checked }))
                }
                disabled={isSubmitting}
              />
              <Label htmlFor="hasAC">Air Conditioning</Label>
            </div>

            <div className="flex items-center space-x-2">
              <Switch
                id="available"
                name="available"
                checked={formData.available}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, available: checked }))
                }
                disabled={isSubmitting}
              />
              <Label htmlFor="available">Available for Rent</Label>
            </div>
          </div>

          <div className="pt-4">
            <Button 
              type="submit" 
              className="w-full" 
              disabled={isUploading || isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditMode ? 'Updating...' : 'Adding...'}
                </>
              ) : isEditMode ? 'Update Vehicle' : 'Add Vehicle'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}