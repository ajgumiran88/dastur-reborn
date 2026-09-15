import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';

const stylesheet = readFileSync(new URL('./horizontal.css', import.meta.url), 'utf8');

function ruleBody(selector: string): string {
  const selectorStart = stylesheet.indexOf(selector);
  expect(
    selectorStart,
    `Expected stylesheet rule ${selector}`,
  ).toBeGreaterThanOrEqual(0);

  const bodyStart = stylesheet.indexOf('{', selectorStart);
  const bodyEnd = stylesheet.indexOf('}', bodyStart);
  return stylesheet.slice(bodyStart + 1, bodyEnd);
}

describe('vertical section rhythm', () => {
  it('reserves full-viewport height for the opening and closing sections', () => {
    const sharedSectionRule = ruleBody(
      '.vertical-scroll > section,\n.vertical-scroll > footer',
    );
    const framingSectionRule = ruleBody('#home,\n#contact');

    expect(sharedSectionRule).not.toMatch(/min-height:\s*100dvh/);
    expect(framingSectionRule).toMatch(/min-height:\s*100dvh/);
  });

  it('uses solid backgrounds for dark sections instead of transition gradients', () => {
    for (const section of ['delivery', 'packaging', 'contact']) {
      const body = ruleBody(`#${section}`);

      expect(body).not.toMatch(/linear-gradient/);
    }
  });
});
