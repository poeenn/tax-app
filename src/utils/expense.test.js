import { describe, it, expect } from 'vitest';
import { getYearFromDate, getMonthFromDate, formatDate, summarizeExpenses } from './expense';

describe('expense.js', () => {
  describe('getYearFromDate', () => {
    it('should extract correct year from valid date string', () => {
      expect(getYearFromDate('2026-08-05')).toBe(2026);
    });
    
    it('should correctly handle and sanitize AI-mangled date like 202608-06-05', () => {
      expect(getYearFromDate('202608-06-05')).toBe(2026);
    });

    it('should fallback to current year for invalid inputs', () => {
      const currentYear = new Date().getFullYear();
      expect(getYearFromDate('')).toBe(currentYear);
      expect(getYearFromDate(null)).toBe(currentYear);
    });
  });

  describe('getMonthFromDate', () => {
    it('should extract correct month from valid date string', () => {
      expect(getMonthFromDate('2026-08-05')).toBe(8);
    });

    it('should handle AI-mangled date by fallback or extracting safely', () => {
      // 202608-06-05 splits to ["202608", "06", "05"], so month should be 6
      expect(getMonthFromDate('202608-06-05')).toBe(6);
    });
  });

  describe('formatDate', () => {
    it('should format valid date correctly', () => {
      expect(formatDate('2026-08-05')).toBe('2026年8月5日');
    });

    it('should sanitize AI-mangled date', () => {
      expect(formatDate('202608-06-05')).toBe('2026年6月5日');
    });
  });

  describe('summarizeExpenses', () => {
    it('should correctly summarize expenses for a given year', () => {
      const expenses = [
        { id: '1', date: '2026-08-01', amount: 1000, businessRatio: 50, status: 'categorized', categoryId: 'food' },
        { id: '2', date: '2026-08-05', amount: 2000, businessRatio: 100, status: 'categorized', categoryId: 'supplies' },
        { id: '3', date: '2026-08-10', amount: 500, businessRatio: 100, status: 'inbox', categoryId: null },
        { id: '4', date: '2025-12-01', amount: 3000, businessRatio: 100, status: 'categorized', categoryId: 'food' },
      ];

      const summary = summarizeExpenses(expenses, 2026);
      
      // Expected total deductible: 1000 * 0.5 + 2000 * 1.0 = 500 + 2000 = 2500
      expect(summary.totalDeductible).toBe(2500);
      expect(summary.inboxCount).toBe(1);
      expect(summary.categorizedCount).toBe(2);
      expect(summary.byCategory.food).toBe(500);
      expect(summary.byCategory.supplies).toBe(2000);
    });
  });
});
