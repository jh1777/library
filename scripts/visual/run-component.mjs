import { spawnSync } from 'node:child_process';

const args = process.argv.slice(2);
const shouldUpdate = args.includes('--update');
const component = args.find(arg => !arg.startsWith('--'));

if (!component) {
  console.error('Usage: npm run visual:test:component -- <component-key>');
  console.error('   or: npm run visual:update:component -- <component-key>');
  console.error('Example keys: list, button, badge, table, tabs, modal');
  process.exit(1);
}

const playwrightArgs = [
  'playwright',
  'test',
  '-c',
  'playwright.visual.config.ts',
  '--grep',
  `@component:${component}`
];

if (shouldUpdate) {
  playwrightArgs.push('--update-snapshots');
}

const result = spawnSync('npx', playwrightArgs, { stdio: 'inherit', shell: true });
process.exit(result.status ?? 1);
