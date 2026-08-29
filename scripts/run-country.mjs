import { readFile } from "node:fs/promises";
import { spawn } from "node:child_process";
import { parseEnv } from "node:util";

const country = process.argv[2];
const command = process.argv[3] ?? "build";

if (country !== "bw" && country !== "zw") {
  throw new Error('Country must be "bw" or "zw".');
}

if (!new Set(["build", "dev", "preview"]).has(command)) {
  throw new Error('Command must be "build", "dev", or "preview".');
}

const envFile = new URL(`../.env.${country}`, import.meta.url);
const fileEnv = parseEnv(await readFile(envFile, "utf8"));

if (fileEnv.SITE_COUNTRY !== country) {
  throw new Error(`${envFile.pathname} must set SITE_COUNTRY=${country}.`);
}

const env = {
  ...fileEnv,
  ...process.env,
  SITE_COUNTRY: country,
};
const astroCli = new URL("../node_modules/astro/bin/astro.mjs", import.meta.url);
const child = spawn(process.execPath, [astroCli.pathname, command], {
  cwd: new URL("..", import.meta.url),
  env,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exitCode = code ?? 1;
});
