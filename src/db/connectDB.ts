import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable in .env.local",
  );
}

// Define the global type for caching the connection
declare global {
  const mongoose: {
    conn: Connection | null;
    promise: Promise<typeof mongoose> | null;
  };
}

// Use a global variable to store the connection
// @ts-expect-error Property 'mongoose' does not exist on type 'typeof globalThis'
let cached = global.mongoose;

if (!cached) {
  // @ts-expect-error Property 'mongoose' does not exist on type 'typeof globalThis'
  cached = global.mongoose = { conn: null, promise: null };
}

export default async function connectDB(): Promise<typeof mongoose> {
  if (cached.conn) {
    // Use the cached connection if it exists
    return cached.conn;
  }

  if (!cached.promise) {
    const options = {
      bufferCommands: false,
    };

    // Create a new connection promise
    cached.promise = mongoose
      .connect(MONGODB_URI, options)
      .then((mongooseInstance) => {
        return mongooseInstance;
      });
  }

  // Await the promise and cache the connection
  cached.conn = await cached.promise;
  return cached.conn;
}
