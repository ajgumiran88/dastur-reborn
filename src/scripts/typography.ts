import { preventWidows } from '@/lib/typography';

const SKIP_WITHIN = 'nav, .btn, .menu__tab, .chip, button, .lang, .dish__tags, .dish__flag, .dish__details, .eyebrow, .nav__link';

function glueText(value: string): string {
  return preventWidows(value);
}

function applyWidows(root: ParentNode): void {
  root.querySelectorAll('p, li, dd, dt, figcaption, blockquote').forEach((node) => {
    const el = node as HTMLElement;
    if (el.closest(SKIP_WITHIN)) return;

    if (el.childElementCount === 0) {
      const current = el.textContent ?? '';
      const next = glueText(current);
      if (next !== current) el.textContent = next;
      return;
    }

    el.childNodes.forEach((child) => {
      if (child.nodeType !== Node.TEXT_NODE || !child.textContent) return;
      const next = glueText(child.textContent);
      if (next !== child.textContent) child.textContent = next;
    });
  });
}

applyWidows(document);
