const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Function to clean unnecessary files
function cleanUnnecessaryFiles() {
  const dirsToClean = [
    'node_modules/.cache',
    '.expo',
    'android/app/build',
    'ios/build'
  ];

  dirsToClean.forEach(dir => {
    if (fs.existsSync(dir)) {
      console.log(`Cleaning ${dir}...`);
      fs.rmSync(dir, { recursive: true, force: true });
    }
  });
}

// Function to optimize images
function optimizeImages() {
  const assetsDir = path.join(__dirname, '../assets');
  if (fs.existsSync(assetsDir)) {
    console.log('Optimizing images...');
    execSync('npx sharp-cli --input "assets/**/*.{png,jpg,jpeg}" --output "assets/" --quality 80');
  }
}

// Main optimization process
async function optimize() {
  console.log('Starting app optimization...');
  
  // Clean unnecessary files
  cleanUnnecessaryFiles();
  
  // Optimize images
  optimizeImages();
  
  console.log('Optimization complete!');
}

optimize().catch(console.error); 