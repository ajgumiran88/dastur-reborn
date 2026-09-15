import { t, type Locale } from '@/lib/i18n';

export function isUnconfirmed(value: string): boolean {
  const normalized = value.trim().toLowerCase();
  if (!normalized) return true;
  return (
    normalized.includes('to be confirmed') ||
    normalized.includes('placeholder') ||
    normalized.includes('example') ||
    /000\s*0000/.test(normalized) ||
    normalized.includes('يُؤكَّد') ||
    normalized.includes('يؤكد')
  );
}

export function unconfirmedLabel(locale: Locale): string {
  return t(locale, 'placeholders.unconfirmed');
}

export function displayOrUnconfirmed(locale: Locale, value: string): string {
  return isUnconfirmed(value) ? unconfirmedLabel(locale) : value;
}

export function displayAreas(locale: Locale, areas: string[]): string {
  const confirmed = areas.filter((area) => !isUnconfirmed(area));
  return confirmed.length ? confirmed.join(' · ') : unconfirmedLabel(locale);
}
