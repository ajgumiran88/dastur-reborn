import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const emblem = readFileSync(new URL('./Emblem.astro', import.meta.url), 'utf8');

describe('DASTUR emblem identity', () => {
  it('uses the DASTUR tagline rather than another brand’s line', () => {
    expect(emblem).not.toMatch(/MUGHAL/i);
    expect(emblem).toMatch(/site\.brand\.tagline/);
  });
});
