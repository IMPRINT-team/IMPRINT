const fs = require("fs").promises;
const path = require("path");

const repoRoot = process.cwd();
const sourcePath = path.join(repoRoot, ".env");
const backendEnvPath = path.join(repoRoot, "backend", ".env");
const prismaEnvPath = path.join(repoRoot, "backend", "prisma", ".env");

const syncBackendEnv = async () => {
  try {
    await fs.access(sourcePath);
  } catch (error) {
    if (error.code === "ENOENT") {
      console.warn(`No .env found at ${sourcePath}; skipping backend env sync.`);
      return;
    }
    throw error;
  }

  const envContents = await fs.readFile(sourcePath);
  await fs.writeFile(backendEnvPath, envContents);
  await fs.writeFile(prismaEnvPath, envContents);
  console.log(
    `Copied ${sourcePath} to ${backendEnvPath} and ${prismaEnvPath}.`
  );
};

syncBackendEnv().catch((error) => {
  console.error("Failed to sync backend env file.", error);
  process.exit(1);
});
