import { getCategoryById } from '../data/categories';
import { getDeductibleAmount } from './expense';

function escapeCsv(value) {
  const text = String(value ?? '');
  if (text.includes(',') || text.includes('"') || text.includes('\n')) {
    return `"${text.replace(/"/g, '""')}"`;
  }
  return text;
}

export function exportExpensesToCsv(expenses) {
  const headers = [
    '日付',
    '内容',
    '金額',
    'カテゴリ',
    '仕訳候補',
    '事業割合(%)',
    '経費計上額',
    'ステータス',
  ];

  const rows = expenses
    .filter((expense) => expense.status !== 'excluded')
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((expense) => {
      const category = getCategoryById(expense.categoryId);
      return [
        expense.date,
        expense.name,
        expense.amount,
        category?.label ?? '',
        category?.accountHint ?? '',
        expense.businessRatio,
        getDeductibleAmount(expense),
        expense.status,
      ];
    });

  const csv = [headers, ...rows]
    .map((row) => row.map(escapeCsv).join(','))
    .join('\n');

  const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  const today = new Date();
  const dateStr = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(2, '0')}${String(today.getDate()).padStart(2, '0')}`;
  link.download = `kantan_keihi_export_${dateStr}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
