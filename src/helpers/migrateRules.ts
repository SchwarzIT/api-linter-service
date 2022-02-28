import * as path from 'path';
import { MigrationHelper } from './migration.helper';

const migrationHelper = new MigrationHelper();
const defaultDir = path.join(process.cwd(), 'spectral-rules');

export const migrateRules = async (rulesPath = defaultDir) => {
  if (process.env.NODE_ENV !== 'production') {
    await migrationHelper.migrateSpectralFilesToJS(
      rulesPath,
      `${process.cwd()}/src`,
    );
  } else {
    await migrationHelper.migrateSpectralFilesToJS(
      rulesPath,
      `${process.cwd()}/dist`,
    );
  }
};
