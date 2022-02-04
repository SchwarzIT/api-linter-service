const https = require('https');
const fs = require('fs');

function download(filename, url) {
  const file = fs.createWriteStream(filename);
  https.get(url, function(response) {
    response.pipe(file);
  });
}

const dir = './src/spectral-rulesets';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir, { recursive: true });
}

const spectralFiles = new Set(['spectral.yml', 'spectral-api.yml', 'spectral-bff.yml', 'spectral-legacy.yml']);

spectralFiles.forEach((spectralFile) => {
  download(`${process.cwd()}/src/spectral-rulesets/${spectralFile}`, `https://raw.githubusercontent.com/SchwarzIT/api-linter-rules/main/${spectralFile}`);
});
