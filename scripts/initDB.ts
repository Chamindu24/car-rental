import { getDb } from '@/lib/db';
import { Vehicle } from '@/types/vehicle';

async function initializeDatabase() {
  try {
    const db = await getDb();
    
    // Create vehicles collection if it doesn't exist
    await db.createCollection('vehicles');
    
    // Insert sample vehicles
    const sampleVehicles: Vehicle[] = [
      {
        name: "Suzuki Alto",
        brand: "Suzuki",
        seats: 4,
        hasAC: false,
        price: "Rs. 3,500/day",
        image: "/suzuki-alto.png",
        available: true,
        type: 'economy',
        fuelType: 'petrol',
        transmission: 'manual',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Toyota Prius",
        brand: "Toyota",
        seats: 5,
        hasAC: true,
        price: "Rs. 6,000/day",
        image: "/toyota-prius.png",
        available: true,
        type: 'comfort',
        fuelType: 'hybrid',
        transmission: 'automatic',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: "Honda Vezel",
        brand: "Honda",
        seats: 5,
        hasAC: true,
        price: "Rs. 8,000/day",
        image: "/honda-vezel.png",
        available: false,
        type: 'luxury',
        fuelType: 'hybrid',
        transmission: 'automatic',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Remove _id property if present, so MongoDB can auto-generate it
    const vehiclesToInsert = sampleVehicles.map(({ _id, ...vehicle }) => vehicle);
    await db.collection('vehicles').insertMany(vehiclesToInsert);
    console.log('Database initialized successfully');
  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    process.exit(0);
  }
}

initializeDatabase();