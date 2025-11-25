import { getDb } from '@/lib/db';
import { ObjectId } from 'mongodb';
import { notFound } from 'next/navigation';
import VehicleDetail from '@/components/VehicleDetail';
import type { Vehicle } from '@/types/vehicle';

type Props = {
  params: { id: string };
};

export default async function VehiclePage({ params }: Props) {
  const { id } = params;

  let vehicleDoc: any = null;
  try {
    const db = await getDb();
    vehicleDoc = await db.collection('vehicles').findOne({ _id: new ObjectId(id) });
  } catch (err) {
    console.error('Error fetching vehicle', err);
    return notFound();
  }

  if (!vehicleDoc) return notFound();

  const vehicle: Vehicle & { _id?: string; images?: string[] } = {
    _id: vehicleDoc._id ? String(vehicleDoc._id) : undefined,
    name: vehicleDoc.name,
    brand: vehicleDoc.brand,
    seats: vehicleDoc.seats,
    hasAC: vehicleDoc.hasAC ?? vehicleDoc.ac ?? false,
    price: vehicleDoc.price ?? 'N/A',
    image: vehicleDoc.image ?? vehicleDoc.mainImage ?? (Array.isArray(vehicleDoc.images) ? vehicleDoc.images[0] : undefined) ?? '/placeholder.png',
    images: Array.isArray(vehicleDoc.images) ? vehicleDoc.images : vehicleDoc.image ? [vehicleDoc.image] : [],
    available: vehicleDoc.available ?? false,
    type: vehicleDoc.type ?? 'economy',
    fuelType: vehicleDoc.fuelType ?? 'petrol',
    transmission: vehicleDoc.transmission ?? 'manual',
  } as any;

  return <VehicleDetail vehicle={vehicle} />;
}
