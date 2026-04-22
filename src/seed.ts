import bcrypt from "bcrypt";
import mongoose from "mongoose";
import { connectDatabase } from "./config/database.js";
import { User } from "./models/User.js";

const SEED_EMAIL = "test@example.com";
const SEED_PASSWORD = "Password123!";

async function seed() {
  await connectDatabase();

  const passwordHash = await bcrypt.hash(SEED_PASSWORD, 10);

  const user = await User.findOneAndUpdate(
    { email: SEED_EMAIL },
    {
      $set: {
        name: "Test User",
        email: SEED_EMAIL,
        passwordHash,
        emailConfirmed: true,
        isAdmin: true,
        languageId: "EN",
      },
    },
    { upsert: true, new: true, setDefaultsOnInsert: true }
  );

  console.log("Seeded user:", {
    id: user._id.toString(),
    email: user.email,
    password: SEED_PASSWORD,
  });

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
