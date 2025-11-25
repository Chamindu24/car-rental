"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Check, X } from 'lucide-react';
import type { Vehicle } from '@/types/vehicle';

interface Props {
  vehicle: any;
}

export default function VehicleDetail({ vehicle }: Props) {
  const images: string[] = vehicle.images && vehicle.images.length ? vehicle.images : vehicle.image ? [vehicle.image] : [];
  const [selected, setSelected] = useState<number>(0);

  const main = images[selected] ?? vehicle.image ?? '/placeholder.png';

  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
          <div className="md:col-span-2">
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <div className="relative bg-gray-100">
                <img
                  src={main}
                  alt={vehicle.name}
                  className="w-full h-[520px] object-cover transition-transform duration-500 ease-out hover:scale-105"
                />
                <div className="absolute left-4 top-4 bg-white/80 rounded-full px-3 py-1 shadow">
                  <span className="text-sm font-medium">{vehicle.brand}</span>
                </div>
                <div className="absolute right-4 bottom-4 hidden md:block">
                  <div className="bg-white/80 rounded-lg p-2 shadow flex gap-2 items-center">
                    <div className="text-sm font-semibold">{vehicle.price}</div>
                    <div className="text-xs text-gray-600">/ day</div>
                  </div>
                </div>
              </div>
            </div>

            {images.length > 0 && (
              <div className="mt-4 flex gap-3 overflow-x-auto pb-2">
                {images.map((src, i) => (
                  <button
                    key={i}
                    onClick={() => setSelected(i)}
                    className={`flex-shrink-0 w-28 h-20 rounded-lg overflow-hidden border-2 ${i === selected ? 'border-primary-500 shadow-lg scale-105' : 'border-transparent'} transform transition-all duration-200`}
                    aria-label={`Show image ${i + 1}`}
                  >
                    <img src={src || '/placeholder.png'} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <aside className="space-y-4">
            <div className="bg-white rounded-xl p-6 shadow">
              <h2 className="text-2xl font-bold mb-1">{vehicle.name}</h2>
              <p className="text-gray-600 mb-4">{vehicle.brand}</p>

              <div className="flex items-center gap-3 mb-4">
                <Badge variant={vehicle.available ? 'default' : 'destructive'} className="flex items-center gap-2">
                  {vehicle.available ? (<><Check className="w-4 h-4"/> Available</>) : (<><X className="w-4 h-4"/> Unavailable</>)}
                </Badge>
                <div className="ml-auto text-lg font-semibold">{vehicle.price}</div>
              </div>

              <div className="grid grid-cols-2 gap-2 text-sm text-gray-700 mb-4">
                <div><strong>Seats:</strong> {vehicle.seats}</div>
                <div><strong>AC:</strong> {vehicle.hasAC ? 'Yes' : 'No'}</div>
                <div><strong>Transmission:</strong> {vehicle.transmission}</div>
                <div><strong>Fuel:</strong> {vehicle.fuelType}</div>
              </div>

              <div className="space-y-2 text-sm text-gray-600 mb-4">
                <p>Type: <span className="capitalize">{vehicle.type}</span></p>
                <p>Added on: {vehicle.createdAt ? new Date(vehicle.createdAt).toLocaleDateString() : '—'}</p>
              </div>

              <div className="flex gap-3">
                <Button className="flex-1">Rent Now</Button>
                <Button variant="outline" className="flex-1">Message Owner</Button>
              </div>
            </div>

            <div className="bg-white rounded-xl p-4 shadow space-y-2">
              <h3 className="text-sm font-semibold">Highlights</h3>
              <ul className="text-sm text-gray-700 list-disc list-inside">
                <li>{vehicle.brand} — {vehicle.type}</li>
                <li>{vehicle.seats} seats • {vehicle.transmission}</li>
                <li>{vehicle.fuelType} • {vehicle.hasAC ? 'AC' : 'No AC'}</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
