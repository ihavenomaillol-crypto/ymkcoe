import "dotenv/config";
import app from "./app";
import { logger } from "./lib/logger";
import { db } from "@workspace/db";
import { sql } from "drizzle-orm";
import { createHash } from "crypto";

const rawPort = process.env["PORT"];

if (!rawPort) {
  throw new Error(
    "PORT environment variable is required but was not provided.",
  );
}

const port = Number(rawPort);

if (Number.isNaN(port) || port <= 0) {
  throw new Error(`Invalid PORT value: "${rawPort}"`);
}

app.listen(port, (err) => {
  if (err) {
    logger.error({ err }, "Error listening on port");
    process.exit(1);
  }

  logger.info({ port }, "Server listening");

  // One-time migration to fix relative image URLs stored in the remote DB
  db.execute(sql`UPDATE media SET url = CONCAT('https://ymkcoe.onrender.com', url) WHERE url LIKE '/api/uploads/%'`)
    .then(() => logger.info("Migrated relative media URLs successfully"))
    .catch((err) => logger.error({ err }, "Error migrating media URLs"));

  // Align remote DB admin hash with the server's current secret fallback
  const secret = process.env.SESSION_SECRET || "ymkcoe-secret-key";
  const newHash = createHash("sha256").update("admin123" + secret).digest("hex");
  db.execute(sql`UPDATE admins SET password_hash = ${newHash} WHERE username = 'admin'`)
    .then(() => logger.info("Aligned admin user password hash in DB successfully"))
    .catch((err) => logger.error({ err }, "Error aligning admin password hash"));
});
