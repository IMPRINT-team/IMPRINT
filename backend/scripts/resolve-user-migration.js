import { PrismaClient } from "@prisma/client";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const prisma = new PrismaClient();
const migrationName = "20260126180000_add_user_table";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prismaBinary = path.resolve(__dirname, "..", "node_modules", ".bin", "prisma");

async function run() {
  const failedMigrations = await prisma.$queryRaw`
    SELECT migration_name
    FROM "_prisma_migrations"
    WHERE migration_name = ${migrationName}
      AND finished_at IS NULL
  `;

  if (!Array.isArray(failedMigrations) || failedMigrations.length === 0) {
    return;
  }

  const tableCheck = await prisma.$queryRaw`
    SELECT to_regclass('"User"') AS table_name
  `;
  const tableName = Array.isArray(tableCheck) ? tableCheck[0]?.table_name : null;

  if (!tableName) {
    console.error(
      `Migration ${migrationName} failed and the User table is missing. Resolve manually before continuing.`
    );
    process.exitCode = 1;
    return;
  }

  const result = spawnSync(prismaBinary, ["migrate", "resolve", "--applied", migrationName], {
    stdio: "inherit",
  });

  if (result.status !== 0) {
    process.exitCode = result.status ?? 1;
  }
}

run()
  .catch((error) => {
    console.error("Failed to resolve migration state:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
