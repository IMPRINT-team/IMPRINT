import { promises as fs } from "fs";
import path from "path";

const repoRoot = process.cwd();
const sourcePath = path.join(repoRoot, ".env");
const destinationPath = path.join(repoRoot, "backend", ".env");

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
  await fs.writeFile(destinationPath, envContents);
  console.log(`Copied ${sourcePath} to ${destinationPath}.`);
};

syncBackendEnv().catch((error) => {
  console.error("Failed to sync backend env file.", error);
  process.exit(1);
});
