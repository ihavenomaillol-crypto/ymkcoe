import "dotenv/config";
import { db, facultyTable } from "@workspace/db";
import { eq } from "drizzle-orm";

async function main() {
  await db.update(facultyTable).set({ photoUrl: "/vice_principal.png" }).where(eq(facultyTable.name, "Dr. Amruta Vijay Surana"));
  console.log("Photo updated for Dr. Amruta Vijay Surana!");
}

main();
