import { describe, expect, it } from 'vitest';
import { dateUtil } from '@/utils/date.util';

describe('date util', () => {
  describe('calcMinutesInRange', () => {
    const range = ['00:00', '05:00'];
    it('09:00 ~ 18:00', () => {
      const result = dateUtil.calcMinutesInRange('09:00', '18:00', range);
      expect(result).toBe(0);
    });
    it('05:00 ~ 18:00', () => {
      const result = dateUtil.calcMinutesInRange('05:00', '18:00', range);
      expect(result).toBe(0);
    });
    it('04:59 ~ 18:00', () => {
      const result = dateUtil.calcMinutesInRange('04:59', '18:00', range);
      expect(result).toBe(1);
    });
    it('04:30 ~ 18:00', () => {
      const result = dateUtil.calcMinutesInRange('04:30', '18:00', range);
      expect(result).toBe(30);
    });
    it('00:00 ~ 18:00', () => {
      const result = dateUtil.calcMinutesInRange('00:00', '18:00', range);
      expect(result).toBe(300);
    });
    it('00:00 ~ 05:00', () => {
      const result = dateUtil.calcMinutesInRange('00:00', '05:00', range);
      expect(result).toBe(300);
    });
    it('00:00 ~ 04:59', () => {
      const result = dateUtil.calcMinutesInRange('00:00', '04:59', range);
      expect(result).toBe(299);
    });
  });
});
