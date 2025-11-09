import { formatPrice, calculateDiscount, slugify, generateOrderNumber } from '@/lib/utils';

describe('Utils', () => {
  describe('formatPrice', () => {
    it('should format price correctly', () => {
      expect(formatPrice(100)).toBe('$100.00');
      expect(formatPrice(1234.56)).toBe('$1,234.56');
    });
  });

  describe('calculateDiscount', () => {
    it('should calculate discount percentage', () => {
      expect(calculateDiscount(100, 80)).toBe(20);
      expect(calculateDiscount(500, 400)).toBe(20);
      expect(calculateDiscount(250, 200)).toBe(20);
    });
  });

  describe('slugify', () => {
    it('should create valid slugs', () => {
      expect(slugify('Hello World')).toBe('hello-world');
      expect(slugify('Solar Panel 400W')).toBe('solar-panel-400w');
      expect(slugify('Test  Multiple   Spaces')).toBe('test-multiple-spaces');
    });
  });

  describe('generateOrderNumber', () => {
    it('should generate order number with correct format', () => {
      const orderNumber = generateOrderNumber();
      expect(orderNumber).toMatch(/^ORD-[A-Z0-9]+-[A-Z0-9]+$/);
    });

    it('should generate unique order numbers', () => {
      const order1 = generateOrderNumber();
      const order2 = generateOrderNumber();
      expect(order1).not.toBe(order2);
    });
  });
});
