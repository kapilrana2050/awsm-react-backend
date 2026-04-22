import mongoose from "mongoose";
import { env } from "./env.js";

export async function connectDatabase(): Promise<void> {
  try {
    console.log("Connecting to MongoDB...", env.mongodbUri);
    await mongoose.connect(env.mongodbUri);
    console.log("Connected to MongoDB successfully");
  } catch (error) {
    console.error("Error connecting to database:", error);
    process.exit(1);
  }

  mongoose.connection.on("error", (err) => {
    console.error("Database connection error:", err);
  });

  mongoose.connection.on("disconnected", () => {
    console.warn("MongoDB disconnected");
  });
}
