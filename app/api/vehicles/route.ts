import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: Request) {
  console.log("📥 GET /api/vehicles called");

  try {
    const db = await getDb();
    console.log("✅ Connected to DB");

    const { searchParams } = new URL(request.url);

    const query: any = {};
    const searchTerm = searchParams.get('search');
    const type = searchParams.get('type');
    const fuelType = searchParams.get('fuelType');
    const transmission = searchParams.get('transmission');
    const hasAC = searchParams.get('hasAC');
    const available = searchParams.get('available');

    console.log("🔍 Query Params:", {
      searchTerm,
      type,
      fuelType,
      transmission,
      hasAC,
      available
    });

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

    console.log("🧩 Final MongoDB Query:", query);

    const vehicles = await db.collection('vehicles').find(query).toArray();

    console.log("🚗 Vehicles found:", vehicles.length);

    return NextResponse.json(vehicles);

  } catch (error) {
    console.error("❌ GET /api/vehicles error:", error);
    return NextResponse.json(
      { error: 'Failed to fetch vehicles' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  console.log("📥 POST /api/vehicles called");

  try {
    const db = await getDb();
    console.log("✅ Connected to DB");

    const vehicleData = await request.json();

    console.log("📦 Received Vehicle Data:", vehicleData);

    // Validate required fields
    if (!vehicleData.name || !vehicleData.brand || !vehicleData.price) {
      console.warn("⚠ Missing required fields:", vehicleData);
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const result = await db.collection('vehicles').insertOne(vehicleData);

    console.log("✅ Insert Success:", result);

    return NextResponse.json(result, { status: 201 });

  } catch (error) {
    console.error("❌ POST /api/vehicles error:", error);
    return NextResponse.json(
      { error: 'Failed to create vehicle' },
      { status: 500 }
    );
  }
}
