import { PrismaClient } from "@prisma/client";
import { spawnSync } from "node:child_process";
import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const prisma = new PrismaClient();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const prismaBinary = path.resolve(__dirname, "..", "node_modules", ".bin", "prisma");
const migrationsDir = path.resolve(__dirname, "..", "prisma", "migrations");
const databaseUrl = process.env.DATABASE_URL;

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

async function fetchMigrationSql(migrationName) {
  const migrationPath = path.join(migrationsDir, migrationName, "migration.sql");

  try {
    return await readFile(migrationPath, "utf-8");
  } catch (error) {
    if (error?.code === "ENOENT") {
      return null;
    }

    throw error;
  }
}

function parseMigrationChecks(sql) {
  const checks = [];

  const createTableMatches = sql.matchAll(/CREATE TABLE\s+"([^"]+)"/gi);
  for (const match of createTableMatches) {
    checks.push({ type: "table", table: match[1] });
  }

  const addColumnMatches = sql.matchAll(/ALTER TABLE\s+"([^"]+)"\s+ADD COLUMN\s+"([^"]+)"/gi);
  for (const match of addColumnMatches) {
    checks.push({ type: "column", table: match[1], column: match[2], exists: true });
  }

  const alterColumnMatches = sql.matchAll(
    /ALTER TABLE\s+"([^"]+)"\s+ALTER COLUMN\s+"([^"]+)"/gi
  );
  for (const match of alterColumnMatches) {
    checks.push({ type: "column", table: match[1], column: match[2], exists: true });
  }

  const dropColumnMatches = sql.matchAll(/ALTER TABLE\s+"([^"]+)"\s+DROP COLUMN\s+"([^"]+)"/gi);
  for (const match of dropColumnMatches) {
    checks.push({ type: "column", table: match[1], column: match[2], exists: false });
  }

  const createIndexMatches = sql.matchAll(/CREATE INDEX\s+"([^"]+)"/gi);
  for (const match of createIndexMatches) {
    checks.push({ type: "index", index: match[1], exists: true });
  }

  const dropIndexMatches = sql.matchAll(/DROP INDEX\s+"([^"]+)"/gi);
  for (const match of dropIndexMatches) {
    checks.push({ type: "index", index: match[1], exists: false });
  }

  return checks;
}

async function isMigrationApplied(migrationName) {
  const sql = await fetchMigrationSql(migrationName);

  if (!sql) {
    return false;
  }

  const checks = parseMigrationChecks(sql);

  if (checks.length === 0) {
    return null;
  }

  for (const check of checks) {
    if (check.type === "table") {
      const result = await prisma.$queryRaw`
        SELECT to_regclass(${`"${check.table}"`}) AS table_name
      `;
      const tableName = Array.isArray(result) ? result[0]?.table_name : null;

      if (!tableName) {
        return false;
      }
    }

    if (check.type === "column") {
      const result = await prisma.$queryRaw`
        SELECT column_name
        FROM information_schema.columns
        WHERE table_name = ${check.table}
          AND column_name = ${check.column}
      `;
      const columnName = Array.isArray(result) ? result[0]?.column_name : null;

      if (check.exists && !columnName) {
        return false;
      }
      if (!check.exists && columnName) {
        return false;
      }
    }

    if (check.type === "index") {
      const result = await prisma.$queryRaw`
        SELECT indexname
        FROM pg_indexes
        WHERE indexname = ${check.index}
      `;
      const indexName = Array.isArray(result) ? result[0]?.indexname : null;

      if (check.exists && !indexName) {
        return false;
      }
      if (!check.exists && indexName) {
        return false;
      }
    }
  }

  return true;
}

async function run() {
  if (!databaseUrl) {
    console.warn("DATABASE_URL is not set; skipping migration resolution.");
    return;
  }

  const failedMigrations = await fetchFailedMigrations();

  if (failedMigrations.length === 0) {
    return;
  }

  for (const migrationName of failedMigrations) {
    const shouldApply = await isMigrationApplied(migrationName);
    if (shouldApply === null) {
      console.warn(
        `Skipping migration ${migrationName}; unable to infer applied state from migration.sql.`
      );
      continue;
    }
    const resolveMode = shouldApply ? "--applied" : "--rolled-back";

    console.warn(`Resolving failed migration ${migrationName} with ${resolveMode}.`);

    const result = spawnSync(
      prismaBinary,
      ["migrate", "resolve", resolveMode, migrationName],
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
