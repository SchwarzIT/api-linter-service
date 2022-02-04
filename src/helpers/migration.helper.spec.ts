import { MigrationHelper } from './migration.helper';
import * as fs from 'fs';

const migrationHelper = new MigrationHelper();
const dir = './tmp';

beforeAll(async () => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  await migrationHelper.migrateSpectralFilesToJS('dist', dir);
});

afterAll(() => {
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true });
  }
});

describe('MigrationHelper', () => {
  const expectedFileNames = [
    'spectral-api.js',
    'spectral-bff.js',
    'spectral-legacy.js',
    'spectral.js',
  ];

  it('should be defined', () => {
    expect(migrationHelper).toBeDefined();
  });

  it('should have a public method "migrateSpectralFilesToJS"', () => {
    expect(migrationHelper.migrateSpectralFilesToJS).toBeDefined();
  });

  it('should have migrated given yaml rule definitions into JS modules', () => {
    const convertedFileNames: string[] = fs.readdirSync(dir);
    expect(convertedFileNames).toEqual(expectedFileNames);
  });
});
