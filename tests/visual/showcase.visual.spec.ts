import { expect, test } from '@playwright/test';

const showcaseSections = [
  { label: 'Badge', sectionId: 'basics', key: 'badge' },
  { label: 'Button', sectionId: 'buttons', key: 'button' },
  { label: 'Switch & Toggle', sectionId: 'toggles', key: 'switch-toggle' },
  { label: 'Input', sectionId: 'input', key: 'input' },
  { label: 'Cards', sectionId: 'cards', key: 'cards' },
  { label: 'Entry Tiles', sectionId: 'tiles', key: 'entry-tiles' },
  { label: 'Key-Value & Metrics', sectionId: 'metrics', key: 'metrics' },
  { label: 'Value Tile', sectionId: 'valuetile', key: 'value-tile' },
  { label: 'Table', sectionId: 'table', key: 'table' },
  { label: 'List', sectionId: 'list', key: 'list' },
  { label: 'Toolbar', sectionId: 'toolbar', key: 'toolbar' },
  { label: 'Bar Chart', sectionId: 'bar-chart', key: 'bar-chart' },
  { label: 'Tabs', sectionId: 'tabs', key: 'tabs' },
  { label: 'Accordion', sectionId: 'accordion', key: 'accordion' },
  { label: 'Grid Layout', sectionId: 'grid', key: 'grid' },
  { label: 'Drawer', sectionId: 'drawer', key: 'drawer' },
  { label: 'Modal', sectionId: 'modal', key: 'modal' },
  { label: 'Signpost', sectionId: 'signpost', key: 'signpost' },
  { label: 'Banner', sectionId: 'banner', key: 'banner' }
] as const;

test.describe('Showcase Visual Regression', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.addStyleTag({
      content: `
        *, *::before, *::after {
          animation: none !important;
          transition: none !important;
          caret-color: transparent !important;
        }
      `
    });
  });

  test('landing showcase layout is stable', async ({ page }) => {
    await expect(page.locator('.showcase')).toBeVisible();
    await expect(page).toHaveScreenshot('showcase-landing.png', { fullPage: true });
  });

  for (const section of showcaseSections) {
    test(`${section.key} section visual is stable @component:${section.key}`, async ({ page }) => {
      await page.locator('.showcase-nav').getByText(section.label, { exact: true }).first().click();
      await expect(page.locator(`section#${section.sectionId}`)).toBeVisible();
      await expect(page).toHaveScreenshot(`showcase-${section.key}-section.png`, { fullPage: true });
    });
  }
});
