/** Arabic Unicode block used to keep English pages free of Arabic script. */
export const ARABIC_SCRIPT = /[\u0600-\u06FF]/;

/**
 * Keep the last two words of a phrase together so body copy and headings
 * cannot orphan a single word on the final line.
 */
export function preventWidows(text: string): string {
  if (!text) return text;
  const words = text.trim().split(/\s+/);
  if (words.length < 3) return text;
  return text.replace(/(\s+)(\S+)\s*$/, '\u00A0$2');
}
