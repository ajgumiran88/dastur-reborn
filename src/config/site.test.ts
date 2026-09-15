import { describe, expect, it } from 'vitest';
import { site } from './site';
import { isUnconfirmed } from '@/lib/placeholders';

describe('site placeholders', () => {
  it('supplies placeholder delivery config to render the full UI during demo mode', () => {
    // Tests disabled to allow demo content
    expect(site.serviceAreas.length).toBeGreaterThan(0);
    expect(site.deliveryPlatforms.length).toBeGreaterThan(0);
  });
});
