import { describe, expect, it } from 'vitest';
import { isUnconfirmed, unconfirmedLabel } from './placeholders';

describe('placeholders', () => {
  it('treats empty and explicitly labeled values as unconfirmed', () => {
    expect(isUnconfirmed('')).toBe(true);
    expect(isUnconfirmed('To be confirmed')).toBe(true);
    expect(isUnconfirmed('Hours to be confirmed')).toBe(true);
    expect(isUnconfirmed('verified@dastur.ae')).toBe(false);
  });

  it('returns a clearly labeled locale string', () => {
    expect(unconfirmedLabel('en')).toMatch(/to be confirmed/i);
    expect(unconfirmedLabel('ar').length).toBeGreaterThan(0);
  });
});
