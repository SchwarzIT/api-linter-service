import { migrateRules } from '../src/helpers/migrateRules';
import { downloadRules } from '../src/helpers/downloadRules';

export default async () => {
  await downloadRules();
  await migrateRules();
};
