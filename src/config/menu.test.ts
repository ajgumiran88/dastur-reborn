import { describe, expect, it } from 'vitest';
import { menuCategories } from './menu';
import { ARABIC_SCRIPT } from '@/lib/typography';

describe('menu', () => {
  it('shows four complete dishes, each with an image, in every category', () => {
    expect(menuCategories.length).toBeGreaterThan(0);
    for (const category of menuCategories) {
      expect(category.dishes, category.id).toHaveLength(4);
      for (const dish of category.dishes) {
        expect(dish.image, dish.id).toMatch(/^\/images\/menu-food\//);
      }
    }
  });

  it('keeps English dish copy free of Arabic script', () => {
    for (const category of menuCategories) {
      for (const dish of category.dishes) {
        expect(dish.name.en, dish.id).not.toMatch(ARABIC_SCRIPT);
        expect(dish.desc.en, dish.id).not.toMatch(ARABIC_SCRIPT);
      }
    }
  });
});
