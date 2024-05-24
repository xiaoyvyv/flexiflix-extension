const fs = require('fs');
const path = require('path');

const rootDir = '.';
const outputFilePath = path.join(rootDir, 'index.json');
let mergedData = [];

function readJsonFiles(dir) {
  const files = fs.readdirSync(dir);

  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      readJsonFiles(filePath);
    } else if (file === 'mainfest.json') {
      const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
      mergedData.push(data);
    }
  });
}

readJsonFiles(rootDir);

fs.writeFileSync(outputFilePath, JSON.stringify(mergedData, null, 2));
console.log(`Merged ${mergedData.length} mainfest.json files into ${outputFilePath}`);
