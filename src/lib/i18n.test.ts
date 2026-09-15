import { describe, it, expect } from 'vitest';
import en from '@/i18n/en.json';
import { t, tList, dir, localizedPath, otherLocale, LOCALES } from './i18n';
import { ARABIC_SCRIPT } from './typography';

function collectArabic(value: unknown, path: string, hits: string[]): void {
  if (typeof value === 'string') {
    if (ARABIC_SCRIPT.test(value)) hits.push(path);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, index) => collectArabic(item, `${path}[${index}]`, hits));
    return;
  }
  if (value && typeof value === 'object') {
    Object.entries(value).forEach(([key, nested]) => {
      collectArabic(nested, path ? `${path}.${key}` : key, hits);
    });
  }
}

describe('i18n', () => {
  it('resolves a nested EN key', () => {
    expect(t('en', 'nav.menu')).toBe('Menu');
  });

  it('resolves the AR counterpart to a real value', () => {
    expect(t('ar', 'nav.menu')).not.toBe('nav.menu');
    expect(t('ar', 'nav.menu').length).toBeGreaterThan(0);
  });

  it('returns the key when missing (visible gap, no throw)', () => {
    expect(t('en', 'does.not.exist')).toBe('does.not.exist');
  });

  it('resolves array content', () => {
    const steps = tList<{ title: string }>('en', 'experience.steps');
    expect(steps.length).toBe(4);
    expect(steps[0].title).toBe('Select your favorites');
  });

  it('returns [] for a missing list', () => {
    expect(tList('en', 'nope.here')).toEqual([]);
  });

  it('maps direction', () => {
    expect(dir('en')).toBe('ltr');
    expect(dir('ar')).toBe('rtl');
  });

  it('builds localized paths', () => {
    expect(localizedPath('en')).toBe('/');
    expect(localizedPath('ar')).toBe('/ar/');
    expect(localizedPath('ar', 'menu')).toBe('/ar/#menu');
  });

  it('finds the alternate locale', () => {
    expect(otherLocale('en')).toBe('ar');
    expect(otherLocale('ar')).toBe('en');
  });

  it('exposes both locales', () => {
    expect(LOCALES).toEqual(['en', 'ar']);
  });

  it('keeps the English dictionary free of Arabic script', () => {
    const hits: string[] = [];
    collectArabic(en, '', hits);
    expect(hits).toEqual([]);
  });

  it('labels unconfirmed operational copy clearly', () => {
    expect(t('en', 'placeholders.unconfirmed')).toMatch(/to be confirmed/i);
    expect(t('en', 'menu.priceTbc')).toMatch(/price to be confirmed/i);
  });
});
