import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const db = await getDb();
    const { searchParams } = new URL(request.url);
    
    const query: any = {};
    const searchTerm = searchParams.get('search');
    const type = searchParams.get('type');
    const fuelType = searchParams.get('fuelType');
    const transmission = searchParams.get('transmission');
    const hasAC = searchParams.get('hasAC');
    const available = searchParams.get('available');

    if (searchTerm) {
      query.$or = [
        { name: { $regex: searchTerm, $options: 'i' } },
        { brand: { $regex: searchTerm, $options: 'i' } }
      ];
    }
    if (type) query.type = type;
    if (fuelType) query.fuelType = fuelType;
    if (transmission) query.transmission = transmission;
    if (hasAC) query.hasAC = hasAC === 'true';
    if (available) query.available = available === 'true';

    const vehicles = await db.collection('vehicles').find(query).toArray();
    return NextResponse.json(vehicles);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const db = await getDb();
    const vehicleData = await request.json();

    // Validate required fields
    if (!vehicleData.name || !vehicleData.brand || !vehicleData.price) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await db.collection('vehicles').insertOne(vehicleData);
    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create vehicle' },
      { status: 500 }
    );
  }
}