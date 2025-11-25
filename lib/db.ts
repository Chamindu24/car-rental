import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  console.error("❌ MONGODB_URI is missing");
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const uri = process.env.MONGODB_URI;
console.log("🔌 MongoDB URI loaded");

const options = {};

let client;
let clientPromise: Promise<MongoClient>;

// Extend NodeJS.Global to include _mongoClientPromise
declare global {
  // eslint-disable-next-line no-var
  var _mongoClientPromise: Promise<MongoClient> | undefined;
}

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    console.log("🚀 Creating NEW MongoClient (dev mode)");
    client = new MongoClient(uri, options);

    global._mongoClientPromise = client
      .connect()
      .then((c) => {
        console.log("✅ MongoDB Connected (dev)");
        return c;
      })
      .catch((err) => {
        console.error("❌ MongoDB Connection Failed (dev):", err);
        throw err;
      });
  } else {
    console.log("♻️ Reusing existing MongoClient (dev)");
  }

  clientPromise = global._mongoClientPromise!;
} else {
  console.log("🚀 Creating NEW MongoClient (production)");
  client = new MongoClient(uri, options);

  clientPromise = client
    .connect()
    .then((c) => {
      console.log("✅ MongoDB Connected (prod)");
      return c;
    })
    .catch((err) => {
      console.error("❌ MongoDB Connection Failed (prod):", err);
      throw err;
    });
}

export async function getDb() {
  console.log("📥 getDb() called");

  try {
    const client = await clientPromise;
    console.log("📦 getDb(): returning database");
    return client.db();
  } catch (error) {
    console.error("❌ getDb(): Error connecting to DB", error);
    throw error;
  }
}

export default clientPromise;
