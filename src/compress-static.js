const fs = require("fs");
const path = require("path");
const zlib = require("zlib");

const compressFile = (filePath) => {
  const fileContents = fs.readFileSync(filePath);

  // Create Brotli version
  const brotli = zlib.brotliCompressSync(fileContents);
  fs.writeFileSync(`${filePath}.br`, brotli);

  // Create Gzip version
  const gzip = zlib.gzipSync(fileContents);
  fs.writeFileSync(`${filePath}.gz`, gzip);
};

const walkDir = (dir, callback) => {
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isFile()) {
      callback(filePath);
    } else if (stat.isDirectory()) {
      walkDir(filePath, callback);
    }
  });
};

// Run on .next/static directory
const staticDir = path.join(__dirname, ".next", "static");

if (fs.existsSync(staticDir)) {
  walkDir(staticDir, (filePath) => {
    if (/\.(js|css|html|json|svg|txt|ico)$/.test(filePath)) {
      compressFile(filePath);
    }
  });
  console.log("✅ Static files compressed (Brotli + Gzip)");
} else {
  console.log("⚠️ Static directory not found, did you run next build?");
}
