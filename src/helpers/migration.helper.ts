import { migrateRuleset } from '@stoplight/spectral-ruleset-migrator';
import * as fs from 'fs';
import * as path from 'path';

export class MigrationHelper {
  private readonly spectralMap: Map<string, string> = new Map([
    ['spectral.yml', 'spectral.js'],
    ['spectral-api.yml', 'spectral-api.js'],
    ['spectral-bff.yml', 'spectral-bff.js'],
    ['spectral-legacy.yml', 'spectral-legacy.js'],
  ]);

  async migrateSpectralFilesToJS(
    readDir: string,
    writeDir?: string,
  ): Promise<string[]> {
    const migratedFiles: string[] = [];
    for (const [key, value] of this.spectralMap) {
      const migratedRule = await migrateRuleset(path.join(readDir, key), {
        fs,
        format: 'commonjs',
      });
      fs.writeFileSync(path.join(writeDir, value), migratedRule);
      migratedFiles.push(key);
    }
    return migratedFiles;
  }
}
