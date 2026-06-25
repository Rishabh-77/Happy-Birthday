import { execFileSync } from "node:child_process";
import { extname } from "node:path";

const forbiddenExtensions = new Set([
  ".avif",
  ".gif",
  ".heic",
  ".jpeg",
  ".jpg",
  ".m4a",
  ".mov",
  ".mp3",
  ".mp4",
  ".png",
  ".wav",
  ".webm",
  ".webp",
]);

const repositoryFiles = execFileSync(
  "git",
  ["ls-files", "--cached", "--others", "--exclude-standard"],
  {
  encoding: "utf8",
  },
)
  .split(/\r?\n/)
  .filter(Boolean);

const unexpectedMedia = repositoryFiles.filter((file) =>
  forbiddenExtensions.has(extname(file).toLowerCase()),
);

if (unexpectedMedia.length > 0) {
  console.error("Unexpected tracked media files:");
  unexpectedMedia.forEach((file) => console.error(`- ${file}`));
  process.exit(1);
}

console.log("Public audit passed: no unexpected tracked media files.");
