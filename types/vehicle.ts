export interface Vehicle {
  _id?: string;
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
  createdAt?: Date;
  updatedAt?: Date;
}