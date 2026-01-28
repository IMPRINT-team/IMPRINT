import { spawn } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const webDashboardRoot = resolve(__dirname, "..");

const command = process.platform === "win32" ? "npm.cmd" : "npm";
const args = ["run", "build", "--", "--emptyOutDir"];

const child = spawn(command, args, {
  cwd: webDashboardRoot,
  stdio: "inherit",
});

child.on("exit", (code) => {
  process.exit(code ?? 1);
});
