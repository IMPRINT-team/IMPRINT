import { PrismaClient } from "@prisma/client";
import { spawnSync } from "node:child_process";
import path from "node:path";
import { fileURLToPath } from "node:url";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prismaBinary = path.resolve(__dirname, "..", "node_modules", ".bin", "prisma");

async function fetchFailedMigrations() {
  try {
    const results = await prisma.$queryRaw`
      SELECT migration_name
      FROM "_prisma_migrations"
      WHERE finished_at IS NULL
        AND rolled_back_at IS NULL
    `;

    if (!Array.isArray(results)) {
      return [];
    }

    return results
      .map((row) => row?.migration_name)
      .filter((name) => typeof name === "string" && name.length > 0);
  } catch (error) {
    if (error?.code === "42P01" || /_prisma_migrations/.test(error?.message ?? "")) {
      return [];
    }

    throw error;
  }
}

async function run() {
  const failedMigrations = await fetchFailedMigrations();

  if (failedMigrations.length === 0) {
    return;
  }

  for (const migrationName of failedMigrations) {
    console.warn(`Resolving failed migration ${migrationName} as rolled back.`);

    const result = spawnSync(
      prismaBinary,
      ["migrate", "resolve", "--rolled-back", migrationName],
      { stdio: "inherit" }
    );

    if (result.status !== 0) {
      process.exitCode = result.status ?? 1;
      return;
    }
  }
}

run()
  .catch((error) => {
    console.error("Failed to ensure migration state:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
