import "dotenv/config"; // 👈 loads .env.local or .env
import { createClient } from "@supabase/supabase-js";
// 👇 import your data (use relative path, don’t use "@/")
import { products } from "../src/app/data/data";

// Use service role key for seeding
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

async function seed() {
  console.log("🌱 Seeding database...");

  const { error } = await supabase.from("products").insert(products);

  if (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }

  console.log("✅ Seeding complete!");
}

seed();
