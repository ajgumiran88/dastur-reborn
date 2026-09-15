import { describe, expect, it } from 'vitest';
import { preventWidows } from './typography';

describe('preventWidows', () => {
  it('joins the last two words so a heading cannot orphan a single word', () => {
    expect(preventWidows('A Table Set with Intention')).toBe(
      'A Table Set with\u00A0Intention',
    );
  });

  it('leaves one- and two-word phrases unchanged', () => {
    expect(preventWidows('Menu')).toBe('Menu');
    expect(preventWidows('Order Now')).toBe('Order Now');
  });

  it('preserves surrounding whitespace and punctuation on the last word', () => {
    expect(preventWidows('Delivered beautifully.')).toBe('Delivered beautifully.');
    expect(preventWidows('From Our Kitchen to Your Door.')).toBe(
      'From Our Kitchen to Your\u00A0Door.',
    );
  });

  it('is a no-op for empty strings', () => {
    expect(preventWidows('')).toBe('');
  });
});
