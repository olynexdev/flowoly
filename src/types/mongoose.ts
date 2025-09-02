// src/types/mongoose.ts

import { Connection } from "mongoose";

export interface MongooseCache {
  conn: Connection | null;
  promise: Promise<Connection> | null;
}

// Extend NodeJS global type to include mongoose cache
declare global {
  var mongooseCache: MongooseCache;
}
