import mongoose, { ConnectOptions } from "mongoose";

const MONGODB_URI: string | undefined = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.warn(
    "MONGODB_URI environment variable is not defined. Database connection may fail.",
  );
}

interface Cached {
  conn: mongoose.Mongoose | null;
  promise: Promise<mongoose.Mongoose> | null;
}

declare global {
  let mongooseCache: Cached;
}

const globalCache = global as typeof global & { mongooseCache?: Cached };

globalCache.mongooseCache = globalCache.mongooseCache || {
  conn: null,
  promise: null,
};
const cached = globalCache.mongooseCache;

export async function connectToDatabase(): Promise<mongoose.Mongoose | null> {
  if (cached.conn) {
    return cached.conn;
  }

  if (!MONGODB_URI) {
    return null;
  }

  if (!cached.promise) {
    const options: ConnectOptions = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, options).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error("MongoDB connection error:", error);
    cached.promise = null;
    return null;
  }

  return cached.conn;
}
