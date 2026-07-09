import "dotenv/config";
import { db, adminsTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { hashPassword } from "./src/routes/admin.js";

async function run() {
  const admins = await db.select().from(adminsTable);
  console.log("Current admins in DB:", admins);

  if (admins.length === 0) {
    console.log("No admins found, creating default admin (admin/admin)");
    await db.insert(adminsTable).values({
      username: "admin",
      passwordHash: hashPassword("admin"),
      isAdmin: true,
    });
    console.log("Admin created.");
  } else {
    // Let's reset the password of 'admin' just to be sure it's 'admin'
    const adminUser = admins.find(a => a.username === "admin");
    if (adminUser) {
      console.log("Resetting password for 'admin' to 'admin'...");
      await db.update(adminsTable).set({ passwordHash: hashPassword("admin") }).where(eq(adminsTable.username, "admin"));
      console.log("Password reset.");
    }
  }
  process.exit(0);
}

run().catch(console.error);
