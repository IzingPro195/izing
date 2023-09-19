const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { rollup } = require('rollup');

const encryptFile = (filePath, algorithm, key, iv) => {
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(fileContents, 'utf8', 'hex');
  encrypted += cipher.final('hex');
  fs.writeFileSync(filePath, encrypted, 'utf8');
};

const inputOptions = {
  input: 'dist/server.js', // Path to your project's entry file
};

const outputOptions = {
  file: 'dist/bundle.js', // Output bundled file
  format: 'iife', // Bundle format (e.g., IIFE for browser usage)
};

async function build() {
  // Encrypt files in the "dist" directory
  const distFiles = fs.readdirSync('dist');
  const algorithm = 'aes-256-cbc'; // Encryption algorithm
  const key = crypto.randomBytes(32); // Random encryption key
  const iv = crypto.randomBytes(16); // Random initialization vector

  distFiles.forEach((file) => {
    const filePath = path.join('dist', file);
    const stats = fs.statSync(filePath);
    if (stats.isFile()) {
      encryptFile(filePath, algorithm, key, iv);
    }
  });

  // Bundle the encrypted files using Rollup
  const bundle = await rollup(inputOptions);
  await bundle.write(outputOptions);
}

build();


