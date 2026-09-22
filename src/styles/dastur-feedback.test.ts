import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import en from '@/i18n/en.json';

const read = (relativePath: string) =>
  readFileSync(new URL(relativePath, import.meta.url), 'utf8');

const hero = read('../components/sections/Hero.astro');
const nav = read('../components/shell/Nav.astro');
const delivery = read('../components/sections/Delivery.astro');
const story = read('../components/sections/Story.astro');
const experience = read('../components/sections/Experience.astro');
const footer = read('../components/shell/Footer.astro');
const typography = read('./brand-typography.css');

describe('Dastur feedback refactor', () => {
  it('uses the approved expanded menu introduction', () => {
    expect(en.menu.intro).toBe(
      'A selection from across our kitchen, from slow-cooked signature rice dishes and Emirati favourites to grilled mains, sharing boxes, sides, desserts, refreshing beverages and traditional Emirati coffee.',
    );
  });

  it('creates a clear site-wide heading and supporting-copy hierarchy', () => {
    expect(typography).toMatch(/--brand-subheading-size:/);
    expect(typography).toMatch(/--brand-supporting-size:/);
    expect(hero).toMatch(
      /\.hero__title\s*{[\s\S]*?font-size:\s*clamp\(2\.25rem,[\s\S]*?white-space:\s*normal;/,
    );
    expect(typography).toMatch(
      /\.menu__title,[\s\S]*?\.why__title\s*{[\s\S]*?font-weight:\s*700/,
    );
  });

  it('places the logo at the start of the navigation header', () => {
    expect(nav).toMatch(/class="nav__brand" href="#home"/);
    expect(nav).toMatch(/src="\/images\/dastur-story-logo\.png"/);
    expect(nav).toMatch(/alt="DASTUR"/);
    expect(nav).toMatch(/\.nav__brand\s*{[\s\S]*?height:\s*76px;/);
    expect(hero).not.toMatch(/hero__logo/);
  });

  it('gives the header order button a white outline and lighter pressed state', () => {
    expect(nav).toMatch(
      /\.nav__order\s*{[\s\S]*?border:\s*1px solid var\(--sand\);/,
    );
    expect(nav).toMatch(
      /\.nav__order:active\s*{[\s\S]*?background:\s*color-mix\(/,
    );
  });

  it('bolds and aligns delivery labels above smaller values', () => {
    expect(delivery).toMatch(
      /\.del__fact\s*{[\s\S]*?align-items:\s*center;/,
    );
    expect(delivery).toMatch(
      /\.del__fact dt\s*{[\s\S]*?font-weight:\s*700;/,
    );
    expect(delivery).toMatch(
      /\.del__fact dd\s*{[\s\S]*?font-size:\s*var\(--brand-supporting-size\);/,
    );
  });

  it('separates the story principles with space and subtle cards, not a rule', () => {
    const symbolsRule = story.match(/\.story__symbols\s*{([\s\S]*?)}/)?.[1] ?? '';
    const symbolRule = story.match(/\.symbol\s*{([\s\S]*?)}/)?.[1] ?? '';
    expect(symbolsRule).toMatch(/margin-top:\s*clamp\(/);
    expect(symbolsRule).not.toMatch(/border-top:/);
    expect(symbolRule).toMatch(/padding:/);
    expect(symbolRule).toMatch(/background:/);
    expect(symbolRule).toMatch(/border:/);
  });

  it('reduces experience subheadings while keeping headings prominent', () => {
    expect(experience).toMatch(
      /\.exp__intro\s*{[\s\S]*?font-size:\s*var\(--brand-subheading-size\);/,
    );
    expect(experience).toMatch(
      /\.exp__stepDesc\s*{[\s\S]*?font-size:\s*var\(--brand-supporting-size\);/,
    );
  });

  it('uses the header green in the footer, removes the logo, and reduces supporting text', () => {
    expect(footer).toContain('class="footer section--palm"');
    expect(footer).not.toContain('class="footer__logo"');
    expect(footer).toMatch(
      /\.footer__statement\s*{[\s\S]*?font-size:\s*var\(--brand-supporting-size\);/,
    );
    expect(footer).toMatch(
      /\.footer__list\s*{[\s\S]*?font-size:\s*var\(--brand-supporting-size\);/,
    );
  });
});
