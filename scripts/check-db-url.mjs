const url = process.env.DATABASE_URL || "";
if (!url.startsWith("postgresql://") && !url.startsWith("postgres://")) {
  console.error("❌ DATABASE_URL invalid: must start with postgresql:// or postgres://");
  process.exit(1);
}
console.log("✅ DATABASE_URL looks correctly formatted.");
