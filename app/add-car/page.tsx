"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import { toast } from "sonner";
import { UploadCloud, X, Loader2, Star, StarOff } from "lucide-react"; // Added Star icons

// Updated Vehicle type to support multiple images and a mainImage field
type Vehicle = {
  id?: string;
  name: string;
  brand: string;
  seats: number;
  hasAC: boolean;
  price: string;
  images: string[]; // Changed from 'image' to 'images' (array)
  mainImage: string; // New field to store the URL of the main image
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
    images: [], // Initialize as an empty array
    mainImage: '', // Initialize mainImage
    available: true,
    type: 'economy',
    fuelType: 'petrol',
    transmission: 'manual'
  });
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
          const vehicleData: any = await response.json();

          const imgs: string[] = Array.isArray(vehicleData.images)
            ? vehicleData.images
            : (vehicleData.image ? [vehicleData.image] : []);

          const mainImg: string = vehicleData.mainImage || (imgs.length > 0 ? imgs[0] : '');

          let priceValue = '';
          if (vehicleData.price !== undefined && vehicleData.price !== null) {
            if (typeof vehicleData.price === 'string') {
              priceValue = vehicleData.price.replace('Rs. ', '').replace('/day', '').trim();
            } else if (typeof vehicleData.price === 'number') {
              priceValue = String(vehicleData.price);
            } else {
              priceValue = '';
            }
          }

          setFormData({
            name: vehicleData.name || '',
            brand: vehicleData.brand || '',
            seats: vehicleData.seats ?? 4,
            hasAC: Boolean(vehicleData.hasAC),
            price: priceValue,
            images: imgs,
            mainImage: mainImg,
            available: vehicleData.available ?? true,
            type: vehicleData.type || 'economy',
            fuelType: vehicleData.fuelType || 'petrol',
            transmission: vehicleData.transmission || 'manual'
          });
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

  const handleImageUpload = async (file: File) => {
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

    setIsUploading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const { url } = await response.json();
      setFormData(prev => {
        const newImages = [...prev.images, url];
        // If it's the first image, make it the main image automatically
        const newMainImage = prev.mainImage || url; 
        return {
          ...prev,
          images: newImages,
          mainImage: newMainImage,
        };
      });
      toast.success('Image uploaded successfully');
    } catch (error) {
      toast.error('Failed to upload image');
      console.error(error);
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = ''; // Clear the file input
      }
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        handleImageUpload(files[i]);
      }
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isUploading || isSubmitting) return;

    const files = e.dataTransfer.files;
    if (files) {
      for (let i = 0; i < files.length; i++) {
        handleImageUpload(files[i]);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const removeImage = (imageUrlToRemove: string) => {
    setFormData(prev => {
      const filteredImages = prev.images.filter(img => img !== imageUrlToRemove);
      let newMainImage = prev.mainImage;

      // If the removed image was the main image, set a new main image or clear it
      if (newMainImage === imageUrlToRemove) {
        newMainImage = filteredImages.length > 0 ? filteredImages[0] : '';
      }

      return {
        ...prev,
        images: filteredImages,
        mainImage: newMainImage,
      };
    });
    toast.info('Image removed');
  };

  const setMainImage = (imageUrl: string) => {
    setFormData(prev => ({
      ...prev,
      mainImage: imageUrl,
    }));
    toast.success('Main image updated');
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

    if (formData.images.length === 0) {
      toast.error('Please upload at least one image of the vehicle');
      setIsSubmitting(false);
      return;
    }
    
    if (!formData.mainImage && formData.images.length > 0) {
        toast.error('Please select a main image for the vehicle.');
        setIsSubmitting(false);
        return;
    }


    try {
      // Format price for display (if your API expects it this way)
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-4 md:p-8">
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100">
        <div className="flex justify-between items-center mb-8 pb-4 border-b border-gray-200">
          <h1 className="text-3xl font-extrabold text-gray-800">
            {isEditMode ? 'Edit Vehicle Details' : 'Add New Vehicle'}
          </h1>
          <Button
            variant="outline"
            onClick={() => router.push('/vehicles')}
            disabled={isSubmitting}
            className="hover:bg-gray-50 transition-colors duration-200"
          >
            Back to Vehicles
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium text-gray-700">Vehicle Name<span className="text-red-500">*</span></Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g. Suzuki Alto"
                required
                disabled={isSubmitting}
                className="focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="brand" className="text-sm font-medium text-gray-700">Brand<span className="text-red-500">*</span></Label>
              <Input
                id="brand"
                name="brand"
                value={formData.brand}
                onChange={handleChange}
                placeholder="e.g. Suzuki"
                required
                disabled={isSubmitting}
                className="focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="seats" className="text-sm font-medium text-gray-700">Number of Seats</Label>
              <Input
                id="seats"
                name="seats"
                type="number"
                min="1"
                max="10"
                value={formData.seats}
                onChange={handleChange}
                disabled={isSubmitting}
                className="focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="price" className="text-sm font-medium text-gray-700">Price per Day (Rs.)<span className="text-red-500">*</span></Label>
              <Input
                id="price"
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 3500"
                required
                disabled={isSubmitting}
                className="focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type" className="text-sm font-medium text-gray-700">Vehicle Type</Label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleSelectChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
              >
                <option value="economy">Economy</option>
                <option value="comfort">Comfort</option>
                <option value="luxury">Luxury</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="fuelType" className="text-sm font-medium text-gray-700">Fuel Type</Label>
              <select
                id="fuelType"
                name="fuelType"
                value={formData.fuelType}
                onChange={handleSelectChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
              >
                <option value="petrol">Petrol</option>
                <option value="diesel">Diesel</option>
                <option value="hybrid">Hybrid</option>
                <option value="electric">Electric</option>
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="transmission" className="text-sm font-medium text-gray-700">Transmission</Label>
              <select
                id="transmission"
                name="transmission"
                value={formData.transmission}
                onChange={handleSelectChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                disabled={isSubmitting}
              >
                <option value="manual">Manual</option>
                <option value="automatic">Automatic</option>
              </select>
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4 pt-4">
            <Label className="text-sm font-medium text-gray-700">Vehicle Images<span className="text-red-500">*</span> (Max 4)</Label>
            <div
              className={`flex flex-col items-center justify-center w-full min-h-[150px] border-2 border-dashed rounded-lg p-4 transition-colors duration-200
                ${isUploading ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-emerald-500 hover:bg-gray-50'}
                ${formData.images.length >= 4 ? 'cursor-not-allowed opacity-70' : 'cursor-pointer'}
                ${isSubmitting ? 'opacity-50 pointer-events-none' : ''}`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onClick={() => !isUploading && !isSubmitting && formData.images.length < 4 && fileInputRef.current?.click()}
            >
              <input
                id="image-upload"
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileInputChange}
                multiple // Allow multiple file selection
                disabled={isUploading || isSubmitting || formData.images.length >= 4}
              />
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <Loader2 className="w-8 h-8 mb-3 text-emerald-500 animate-spin" />
                  <p className="text-sm text-emerald-600">Uploading...</p>
                </div>
              ) : formData.images.length === 0 ? (
                <div className="flex flex-col items-center justify-center pt-5 pb-6 text-gray-500">
                  <UploadCloud className="w-8 h-8 mb-3" />
                  <p className="mb-2 text-sm">
                    <span className="font-semibold">Click to upload</span> or drag and drop
                  </p>
                  <p className="text-xs">PNG, JPG (MAX. 5MB per image)</p>
                </div>
              ) : (
                <p className="text-sm text-gray-500">Drag and drop more images, or click to select.</p>
              )}
            </div>

            {/* Image Previews and Main Image Selection */}
            {formData.images.length > 0 && (
              <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                {formData.images.map((imgUrl, index) => (
                  <div key={index} className="relative w-full h-32 rounded-lg overflow-hidden border border-gray-200 shadow-sm group">
                    <img
                      src={imgUrl}
                      alt={`Vehicle image ${index + 1}`}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        onClick={() => removeImage(imgUrl)}
                        className="absolute top-2 right-2 rounded-full h-7 w-7 text-white bg-red-600 hover:bg-red-700 z-10"
                        disabled={isSubmitting}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setMainImage(imgUrl)}
                        className={`absolute top-2 left-2 rounded-full h-7 w-7 z-10 
                          ${formData.mainImage === imgUrl ? 'text-yellow-400 bg-yellow-400/20 hover:bg-yellow-400/30' : 'text-gray-300 hover:text-yellow-300 hover:bg-gray-800/20'}`}
                        disabled={isSubmitting}
                        title={formData.mainImage === imgUrl ? "Main Image" : "Set as Main Image"}
                      >
                        {formData.mainImage === imgUrl ? <Star className="h-4 w-4 fill-current" /> : <StarOff className="h-4 w-4" />}
                      </Button>
                    </div>
                    {formData.mainImage === imgUrl && (
                      <span className="absolute bottom-1 left-1 bg-emerald-500 text-white text-xs px-2 py-0.5 rounded-full z-10">Main</span>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-4 sm:space-y-0 sm:space-x-8 pt-4 border-t border-gray-200 mt-6">
            <div className="flex items-center space-x-2">
              <Switch
                id="hasAC"
                name="hasAC"
                checked={formData.hasAC}
                onCheckedChange={(checked) =>
                  setFormData(prev => ({ ...prev, hasAC: checked }))
                }
                disabled={isSubmitting}
                className="data-[state=checked]:bg-emerald-500"
              />
              <Label htmlFor="hasAC" className="text-gray-700">Air Conditioning</Label>
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
                className="data-[state=checked]:bg-emerald-500"
              />
              <Label htmlFor="available" className="text-gray-700">Available for Rent</Label>
            </div>
          </div>

          <div className="pt-6">
            <Button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-3 text-lg font-semibold rounded-lg shadow-md transition-colors duration-200"
              disabled={isUploading || isSubmitting || formData.images.length === 0 || !formData.mainImage}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  {isEditMode ? 'Updating Vehicle...' : 'Adding Vehicle...'}
                </>
              ) : isEditMode ? 'Update Vehicle' : 'Add Vehicle'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}