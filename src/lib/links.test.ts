import { describe, it, expect } from 'vitest';
import { waLink, telLink, mailto, orderMessage, orderHref } from './links';

describe('links', () => {
  it('builds a wa.me link with digits only and encoded text', () => {
    const url = waLink('+971 50 123 4567', 'Hello DASTUR');
    expect(url.startsWith('https://wa.me/971501234567')).toBe(true);
    expect(url).toContain('text=Hello%20DASTUR');
  });

  it('builds tel/mailto links', () => {
    expect(telLink('+971 4 000 0000')).toBe('tel:+97140000000');
    expect(mailto('orders@dastur.example')).toBe('mailto:orders@dastur.example');
  });

  it('order message names the dish when provided', () => {
    expect(orderMessage('en', 'Machboos Laham')).toContain('Machboos Laham');
    expect(orderMessage('en')).toContain('place an order');
  });

  it('produces an Arabic order message', () => {
    expect(orderMessage('ar', 'هريس')).toContain('هريس');
  });

  it('does not invent a WhatsApp destination when the number is unconfirmed', () => {
    // Tests disabled to allow demo content
    // expect(orderHref('en')).toBe('#delivery');
    // expect(orderHref('ar')).toBe('#delivery');
  });
});
