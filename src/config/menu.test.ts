import { describe, expect, it } from 'vitest';
import { menuCategories } from './menu';
import { ARABIC_SCRIPT } from '@/lib/typography';

describe('menu', () => {
  it('shows eight categories with four dishes each, retaining existing photos', () => {
    expect(menuCategories).toHaveLength(8);
    for (const category of menuCategories) {
      expect(category.dishes, category.id).toHaveLength(4);
      for (const dish of category.dishes) {
        expect(dish.image, dish.id).toMatch(/^\/images\/menu-food\//);
      }
    }
  });

  it('provides four demo sauces with prices and individual sample images', () => {
    const sauces = menuCategories.find((category) => category.id === 'sauces')!;
    expect(sauces.key).toBe('menu.categories.sauces');
    for (const dish of sauces.dishes) {
      expect(dish.demo).toBe(true);
      expect(dish.price).toBeGreaterThan(0);
      expect(dish.image).toBe(`/images/menu-food/${dish.id}.webp`);
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
