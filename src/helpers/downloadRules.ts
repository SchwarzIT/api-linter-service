import * as https from 'https';
import * as fs from 'fs';
import * as path from 'path';

const download = async (filename: string, url: string): Promise<void> => {
  const file = fs.createWriteStream(filename);
  return new Promise((resolve) => {
    https.get(url, (response) => {
      response.pipe(file);
      resolve();
    });
  });
};

const defaultDir = path.join(process.cwd(), 'spectral-rules');
const defaultSpectralFiles = [
  'spectral.yml',
  'spectral-api.yml',
  'spectral-bff.yml',
  'spectral-legacy.yml',
];

export const downloadRules = async (
  dir = defaultDir,
  spectralFiles = defaultSpectralFiles,
) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  await Promise.all(
    spectralFiles.map((file) =>
      download(
        path.join(dir, file),
        `https://raw.githubusercontent.com/SchwarzIT/api-linter-rules/main/${file}`,
      ),
    ),
  );
};
